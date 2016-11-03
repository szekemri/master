using AdministrationApp_SPP.Models;
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

        public class UserConfiguration 
        {
            public UserConfiguration() { }

            public List<MenuItemsView> UserConfigurationItems { get; set; }
            public List<MenuItemsView> LeftMenuItems { get; set; }
            public Users UserDetails { get; set; }
        };

        // GET api/MenuItems
        public IEnumerable<MenuItemsView> GetMenuItems()
        {
            return db.MenuItemsView.AsEnumerable();
        }

        // GET api/MenuItems
        public UserConfiguration GetMenuItems(int id)
        {
            //create instance of user configuration class/object
            UserConfiguration userConfiguration = new UserConfiguration();

            //initialize menuitems
            userConfiguration.UserConfigurationItems = db.MenuItemsView.ToList().Where(x => x.ApplicationMenuID == 2).ToList();
            userConfiguration.LeftMenuItems = db.MenuItemsView.ToList().Where(x => x.ApplicationMenuID == 3).ToList();

            //check if records were found
            if (userConfiguration.UserConfigurationItems.Count == 0 || userConfiguration.LeftMenuItems.Count == 0)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            //create list of list
            return userConfiguration;
        }
    }
}
