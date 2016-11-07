using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using AdministrationApp_SPP.Models;

namespace AdministrationApp_SPP.Controllers
{
    public class UserBuildingViewController : ApiController
    {
        private UserBuildingDBEntities db = new UserBuildingDBEntities();

        // GET api/Default1
        public IEnumerable<UserBuildingView> GetUserBuildingViews()
        {
            return db.UserBuildingView.AsEnumerable();
        }

        // GET api/Default1/5
        public UserBuildingView GetUserBuildingView(int id)
        {
            UserBuildingView userbuildingview = db.UserBuildingView.Find(id);
            if (userbuildingview == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return userbuildingview;
        }

        // PUT api/Default1/5
        public HttpResponseMessage PutUserBuildingView(int id, UserBuildingView userbuildingview)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != userbuildingview.UserID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(userbuildingview).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/Default1
        public HttpResponseMessage PostUserBuildingView(UserBuildingView userbuildingview)
        {
            if (ModelState.IsValid)
            {
                db.UserBuildingView.Add(userbuildingview);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, userbuildingview);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = userbuildingview.UserID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Default1/5
        public HttpResponseMessage DeleteUserBuildingView(int id)
        {
            UserBuildingView userbuildingview = db.UserBuildingView.Find(id);
            if (userbuildingview == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.UserBuildingView.Remove(userbuildingview);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, userbuildingview);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}