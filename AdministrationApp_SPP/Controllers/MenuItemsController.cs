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
        private MenuItemsDBEntities menuItemsDBEntities = new MenuItemsDBEntities();
        private UserBuildingView userBuildingView = new UserBuildingView();

        // GET api/MenuItems
        public IEnumerable<MenuItemsView> GetMenuItems()
        {
            return menuItemsDBEntities.MenuItemsView.AsEnumerable();
        }

        /// <summary>
        /// GET api/MenuItems
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        public MenuItems GetMenuItems(int userID)
        {
            //create instance of user configuration class/object
            MenuItems menuItems = new MenuItems();
            bool userHasAdminRights;

            //get user details
            userBuildingView = this.GetUserInformations(userID);
            userHasAdminRights = this.CheckIfUserHasAdminRights(userBuildingView);

            //filter menuItems based on user rights
            this.FilterMenuItemsBasedOnUserRight(true, ref menuItems);

            //check if menu items are valid, otherwise throw exception
            this.CheckIfMenuItemsAreValid(menuItems);

            //create list of list
            return menuItems;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userBuildingView"></param>
        private bool CheckIfUserHasAdminRights(UserBuildingView userBuildingView)
        {
            if (userBuildingView.IsAdministrator == true)
            {
                return true;
            }
            else return false;
        }

        /// <summary>
        /// Get user information from the database.
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        private UserBuildingView GetUserInformations(int userID) {

            //instantiate UserBuildingController
            UserBuildingViewController userBuildingView = new UserBuildingViewController();
            return userBuildingView.GetUserBuildingView(userID);
        }

        /// <summary>
        /// Filter menu items based on active user right.
        /// </summary>
        /// <returns></returns>
        private MenuItems FilterMenuItemsBasedOnUserRight(bool? IsAdministrator, ref MenuItems menuItems) {

            //initialize menu items and first filter for existing menus (top menu, left menu, etc)
            menuItems.userMenuItems = menuItemsDBEntities.MenuItemsView.ToList().Where(x => x.ApplicationMenuID == 2).ToList();
            menuItems.leftMenuItems = menuItemsDBEntities.MenuItemsView.ToList().Where(x => x.ApplicationMenuID == 3).ToList();

            //check if user has administrator rights
            if (IsAdministrator == false)
            {
                //filter menu items
                menuItems.userMenuItems = menuItems.userMenuItems.Where(x => x.IsForAdminUse == IsAdministrator).ToList();
                menuItems.leftMenuItems = menuItems.leftMenuItems.Where(x => x.IsForAdminUse == IsAdministrator).ToList();
            }

            return menuItems;
        }

        /// <summary>
        /// Check if menu items were found in the database.
        /// </summary>
        private void CheckIfMenuItemsAreValid(MenuItems menuItems)
        {
            //check if records were found
            if (menuItems.userMenuItems.Count == 0 || menuItems.leftMenuItems.Count == 0)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }
        }
    }
}
