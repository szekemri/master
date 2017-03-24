using com.sun.xml.@internal.txw2;
using de.consist.bmu.rule;
using de.consist.bmu.rule.impl;
using de.itu.bmu.viewer;
using ikvm.runtime;
using java.io;
using java.util;
using java.lang;
using org.apache.log4j;
using SG.Adapter.Modawi;
using SG.IWIS.Adapter.Modawi.BmuViewer;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Web;
using System.Web.Configuration;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
using System.Xml.Linq;
using System.Text;
using SG.IWIS.Adapter.Modawi.BMUViewer;
using java.nio.file;

namespace SG.IWIS.BMU
{
    /// <summary>
    /// 
    /// </summary>
    public partial class BMU_Viewer : System.Web.UI.Page
    {
        //declare public variables
        BMUDokument bmuDocument = null;
        public string _modawiDocumentGUID = null;

        /// <summary>
        /// ASPX Page Loader method
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void Page_Load(object sender, EventArgs e)
        {
            _modawiDocumentGUID = Request.QueryString["docID"];
            BmuDocumentXmlDownloader xmlDownloader = new BmuDocumentXmlDownloader();
            BmuDocumentDC bmuDocumentDC = xmlDownloader.DownloadXmlDocument(_modawiDocumentGUID);

            string pathOfXmlFile = bmuDocumentDC.Path + bmuDocumentDC.FileName;

            File xmlFile = new File(pathOfXmlFile);

            //create and validate a BMU Dokument
            this.InitializeAndConfigureBMUViewerAPIAssembly();

            bmuDocument = createBmuDocument(xmlFile);
            
            SortedMap sortedLayersMap = this.getBmuDocumentLayers(bmuDocument);
            Map layerSignaturesMap = BMUController.checkSignature(xmlFile, bmuDocument, 0);

            //Load aspx page regions content
            this.loadTreeNodesInTreeView(pathOfXmlFile, sortedLayersMap, layerSignaturesMap);
            this.loadHTMLContentInIFrame(bmuDocument, sortedLayersMap, null);
        }

        #region BMU Assembly initialization/configuration methods

        /// <summary>
        /// Configure and initialize BMU-Viewer assembly/classes (from API)
        /// </summary>
        private void InitializeAndConfigureBMUViewerAPIAssembly()
        {
            Startup.addBootClassPathAssembly(Assembly.Load("BMU-Viewer_2"));
            Startup.addBootClassPathAssembly(Assembly.Load("IKVM.OpenJDK.Core"));
            BasicConfigurator.configure();
            BMUController.init();
        }

        #endregion

        #region BMU Dokument methods
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="bmuDocument"></param>
        private SortedMap getBmuDocumentLayers(BMUDokument bmuDocument)
        {
            SortedMap sortedLayeresMap = BMUController.getLayerMap(bmuDocument);
            return sortedLayeresMap;  
        }

        /// <summary>
        /// Validate a Bmu Document
        /// </summary>
        /// <param name="doc"></param>
        /// <returns>Rule Set result</returns>
        private RuleSetResult validateBmuDocument(BMUDokument doc)
        {
            RuleSetResult result = BMUController.validate(doc);
            return result;
        }

        /// <summary>
        /// Creates and return a BMU Document
        /// </summary>
        /// <returns></returns>
        private BMUDokument createBmuDocument(File xmlFile)
        {
            new BMUDokumentImpl();
            RuleSet ruleSet = BMUController.getRuleSet();
            return BMUDokumentImpl.parse(xmlFile, ruleSet);
        }

        #endregion

        #region Tree View/Loader methods

        /// <summary>
        /// Load tree nodes (Root Node = Modawi document GUID, Layers, Signature)
        /// </summary>
        private void loadTreeNodesInTreeView(string xmlFilePath, SortedMap sortedLayers, Map layerSignatureMap)
        {
            //add root nodes from in Tree View
            AddParentNodeInTreeView();

            TreeNode treeRootNode = BMU_TreeView.Nodes[0];
            TreeNode layersRootNode = treeRootNode.ChildNodes[0];

            AddChildNodesInTreeView(layersRootNode, sortedLayers, layerSignatureMap);
        }

        /// <summary>
        /// Load nodes into a System.XML.XMLDocument
        /// </summary>
        private void AddParentNodeInTreeView()
        {
            BMU_TreeView.Nodes.Clear();
            BMU_TreeView.Nodes.Add(new TreeNode(_modawiDocumentGUID));
            BMU_TreeView.Nodes[0].ChildNodes.Add(new TreeNode(BMUViewerXmlTagsForTreeView.rootLayerNodeXmlTag));
        }

        /// <summary>
        /// Add nodes in BMU Tree View (layers, signature, etc.)
        /// </summary>
        /// <param name="inXmlNode"></param>
        /// <param name="inTreeNode"></param>
        private void AddChildNodesInTreeView(TreeNode layersRootNode, SortedMap sortedLayersMap, Map layerSignatureMap)
        {
            //Get layers keys from the sorted Map
            ArrayList sortedLayers = new ArrayList(sortedLayersMap.keySet());

            //Convert Signatures Map to Object Array
            Collection signaturesValues = layerSignatureMap.values();
            object[] signaturesArray = signaturesValues.toArray();

            //Loop through all document layers
            for (int i = 0; i < sortedLayers.size(); i++)
            {
                TreeNode node = new TreeNode(sortedLayers.get(i).ToString());
                TreeNode signatureRootNode = new TreeNode("Signature");

                //Check if signature exists and add signature nodes for each layer
                if (signaturesArray.Length != 0)
                {
                    //add signature root node
                    node.ChildNodes.Add(signatureRootNode);

                    //get index of Signature tag
                    string signatureXmlValue = signaturesArray[i].ToString();
                    int indexOfSignatureXmlTag = signatureXmlValue.LastIndexOf(BMUViewerXmlTagsForTreeView.SignatureXmlTag);

                    //get signature from Xml text
                    signatureXmlValue = signatureXmlValue.Substring(indexOfSignatureXmlTag + BMUViewerXmlTagsForTreeView.SignatureXmlTag.Length);

                    //add node with signature value 
                    signatureRootNode.ChildNodes.Add(new TreeNode(signatureXmlValue));
                }

                //Add child node to layer root node
                layersRootNode.ChildNodes.Add(node);
            }
        }

        /// <summary>
        /// Change HTML Content from Iframe on tree view node click.
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void TreeView_OnSelectNodeHandler(object sender, EventArgs e)
        {
            TreeView selectedNode = (TreeView)sender;

            //check if selected node is root
            if (selectedNode.Parent != null)
            {
                BMU_Viewer_DownloadDetails.Visible = true;
                iframe.Visible = false;
                Label_DocID.InnerText = "DocID: " + _modawiDocumentGUID;
            }

            //if selected node is a layer node 
            else {
                //check if HTML document exists
                if (bmuDocument != null)
                {
                    //TODO add missing parameters to display selected layer
                    this.loadHTMLContentInIFrame(bmuDocument, null, null);
                }
            }
            //TODO: add condition if selected node is signature node
            //show values
        }

        /// <summary>
        /// Download XML file of BMU Viewer document from Modawi.
        /// </summary>
        /// <param name="sender">The sender object.</param>
        /// <param name="e">The event object.</param>
        protected void DownloadBmuViewerXml_OnClickHandler(object sender, EventArgs e)
            {
            BmuDocumentXmlDownloader xmlDocumentDownloader = new BmuDocumentXmlDownloader();
            BmuDocumentDC data = xmlDocumentDownloader.DownloadXmlDocument(_modawiDocumentGUID);
            Response.Redirect("~/DocumentDownloadFromLocal.aspx?Path=" + data.Path + "&Filename=" + data.FileName);
        }

        #endregion

        #region IFrame content loader methods

        /// <summary>
        /// Load HTML content in Iframe based on the selected layer
        /// Load HTML content in Iframe based on the selected layer. 
        /// Based on the input parameter the HTML page content will be different.
        /// </summary>
        /// <param name="pathOfXmlFile"></param>
        private void loadHTMLContentInIFrame(BMUDokument bmuDocument, Map parameters, string range)
        {
            //generate HTML file for document layer view (transform method from BMU Controller should be used)
            File htmlDocument = BMUController.transform(bmuDocument, parameters, range);
            Files.move(htmlDocument.toPath(), Paths.get("").toAbsolutePath());
            string htmlDocumentPath = htmlDocument.getAbsolutePath();
            
            //load html file into page iframe
            iframe.Attributes.Add("src", htmlDocumentPath);
            htmlDocument.deleteOnExit();
        }

        #endregion

        #region Helper Methods

        /// <summary>
        /// 
        /// </summary>
        /// <param name="xmlRootNode"></param>
        /// <returns></returns>
        private XmlNode FilterXMLChildNodes(XmlNode xmlRootNode, XmlDocument xmlDocument)
        {
            XmlNodeList nodeList;
            nodeList = xmlRootNode.SelectNodes("BGSERZLayer");
                
            return xmlRootNode;
        }

        #endregion
    }
}
