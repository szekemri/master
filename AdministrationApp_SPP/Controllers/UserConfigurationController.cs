using AdministrationApp_SPP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AdministrationApp_SPP.Controllers
{
    public class UserConfigurationController : ApiController
    {
        private bool? IsAdministrator = false;

        //UserConfiguration class contains all user details (including the menu items user has access to)
        UserConfiguration userConfiguration = new UserConfiguration();
        UserBuildingViewController userBuilduingController = new UserBuildingViewController();
        MenuItemsController menuItemsController = new MenuItemsController();
        UserBuildingView userBuilduingViewDetails = new UserBuildingView();

        // GET api/userconfiguration/5
        public UserConfiguration GetUserConfiguration(int id)
        {
            //Get User details (including user corresponding building)
            userBuilduingViewDetails = userBuilduingController.GetUserBuildingView(id);
            IsAdministrator = userBuilduingViewDetails.IsAdministrator;
            //Get Menu Items return an UserConfiguration object
            userConfiguration = menuItemsController.GetMenuItems(IsAdministrator, userBuilduingViewDetails);
                
            return userConfiguration;
        }

    }
}
