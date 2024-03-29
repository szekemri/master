﻿using AdministrationApp_SPP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AdministrationApp_SPP.Controllers
{
    public class ApplicationConfigurationController : ApiController
    {
        private bool? IsAdministrator = false;

        //UserConfiguration class contains all user details (including the menu items user has access to)
        MenuItems menuItems = new MenuItems();
        UserBuildingViewController userBuilduingController = new UserBuildingViewController();
        MenuItemsController menuItemsController = new MenuItemsController();
        UserBuildingView userBuilduingViewDetails = new UserBuildingView();
    }
}
