using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdministrationApp_SPP.Models
{
    [JsonObject(Title = "results")]
    public class MenuItems
    {
        public MenuItems() { }

        public List<MenuItemsView> userMenuItems { get; set; }
        public List<MenuItemsView> leftMenuItems { get; set; }
        //public UserBuildingView userDetails { get; set; }
    };
}