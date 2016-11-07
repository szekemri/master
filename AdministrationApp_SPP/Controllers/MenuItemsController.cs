using AdministrationApp_SPP.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AdministrationApp_SPP.Controllers
{
    public class MenuItemsController : ApiController
    {
        private MenuItemsDBEntities db = new MenuItemsDBEntities();

        // GET api/MenuItems
        public IEnumerable<MenuItemsView> GetMenuItems()
        {
            return db.MenuItemsView.AsEnumerable();
        }

        // GET api/MenuItems
        public UserConfiguration GetMenuItems(bool? HasAdministratorRights, UserBuildingView userBuildingView)
        {
            //create instance of user configuration class/object
            UserConfiguration userConfiguration = new UserConfiguration();

            //initialize menuitems
            userConfiguration.userConfigurationMenuItems = db.MenuItemsView.ToList().Where(x => x.ApplicationMenuID == 2).ToList();
            userConfiguration.leftMenuItems = db.MenuItemsView.ToList().Where(x => x.ApplicationMenuID == 3).ToList();
            userConfiguration.userDetails = userBuildingView;

            //check user rights and filter menuItems based on them
            if (HasAdministratorRights == false)
            {
                //filter menu items
                userConfiguration.userConfigurationMenuItems = userConfiguration.userConfigurationMenuItems.Where(x => x.IsForAdminUse == HasAdministratorRights).ToList();
                userConfiguration.leftMenuItems = userConfiguration.leftMenuItems.Where(x => x.IsForAdminUse == HasAdministratorRights).ToList();
            }

            //check if records were found
            if (userConfiguration.userConfigurationMenuItems.Count == 0 || userConfiguration.leftMenuItems.Count == 0)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            //create list of list
            return userConfiguration;
        }
    }
}
