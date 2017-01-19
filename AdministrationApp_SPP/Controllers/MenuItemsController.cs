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

        /// <summary>
        /// GET api/MenuItems
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        public MenuItems GetMenuItems(int? userID)
        {
            //create instance of user configuration class/object
            MenuItems menuItems = new MenuItems();

            //initialize menuitems
            menuItems.userMenuItems = db.MenuItemsView.ToList().Where(x => x.ApplicationMenuID == 2).ToList();
            menuItems.leftMenuItems = db.MenuItemsView.ToList().Where(x => x.ApplicationMenuID == 3).ToList();

            //get user and user right from DB

            //check user rights and filter menuItems based on them
            FilterMenuItemsBasedOnUserRight(true, ref menuItems);

            //check if records were found
            if (menuItems.userMenuItems.Count == 0 || menuItems.leftMenuItems.Count == 0)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            //create list of list
            return menuItems;
        }

        /// <summary>
        /// Get user information from the database.
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        private UserBuildingView GetUserInformations(int? userID) {
            UserBuildingView userInformations = new UserBuildingView();
            return userInformations;
        }

        /// <summary>
        /// Filter menu items based on active user right.
        /// </summary>
        /// <returns></returns>
        private MenuItems FilterMenuItemsBasedOnUserRight(bool? IsAdministrator, ref MenuItems menuItems) {

            //check if user has administrator rights
            if (IsAdministrator == false)
            {
                //filter menu items
                menuItems.userMenuItems = menuItems.userMenuItems.Where(x => x.IsForAdminUse == IsAdministrator).ToList();
                menuItems.leftMenuItems = menuItems.leftMenuItems.Where(x => x.IsForAdminUse == IsAdministrator).ToList();
            }

            return menuItems;
        }
    }
}
