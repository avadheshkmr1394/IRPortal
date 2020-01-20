using Insight.Portal.Services.Business;
using Insight.Portal.Services.Models;
//using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;


namespace Insight.Portal.Services.WebApi.Controllers
{
    public class AccountController : ApiController
    {
        public AccountController()
        : this(new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext())))
        {
        }


        public AccountController(UserManager<ApplicationUser> userManager)
        {
            UserManager = userManager;
        }

        public UserManager<ApplicationUser> UserManager { get; private set; }

        protected override void Dispose(bool disposing)
        {
            if (disposing && UserManager != null)
            {
                UserManager.Dispose();
                UserManager = null;
            }
            base.Dispose(disposing);
        }

        [System.Web.Http.Route("Account/getUser")]
        [System.Web.Http.HttpGet]
        public IHttpActionResult getUser()
        {
            var Db = new ApplicationDbContext();
            var users = Db.Users;
            var model = new List<EditUserViewModel>();
            foreach (var user in users)
            {
                var u = new EditUserViewModel(user);
                model.Add(u);
            }
            return Ok(model);
        }
        [System.Web.Http.Route("Account/Register")]
        [System.Web.Http.HttpPost]    
        public async Task<IHttpActionResult> Register(RegisterViewModel model)
        {
            var user = model.GetUser();
            var result = await UserManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                return Ok("success");
            }
            else
            {
                return Ok(result);
            }
        }
        [System.Web.Http.Route("Account/Edit")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult Edit(EditUserViewModel eu)
        {
            var Db = new ApplicationDbContext();
            var user = Db.Users.First(u => u.UserName == eu.UserName);
            var model = new EditUserViewModel(user);
            return Ok(model);
        }
        [System.Web.Http.Route("Account/Update")]
        [System.Web.Http.HttpPost]
        public async Task<IHttpActionResult> Update(EditUserViewModel model)
        {
            var Db = new ApplicationDbContext();
            var user = Db.Users.First(u => u.UserName == model.UserName);
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Email = model.Email;
            user.PhoneNumber = model.PhoneNumber;
            user.Status = model.Status;
            Db.Entry(user).State = System.Data.Entity.EntityState.Modified;
            await Db.SaveChangesAsync();
            return Ok(model);
        }
        [System.Web.Http.Route("Account/ResetPassword")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult ResetPassword(EditUserViewModel eu )
        {
            var model = new ResetPasswordViewModel();
            model.UserName = eu.UserName;
            return Ok(model);
        }
        [System.Web.Http.Route("Account/ResetPasswordConfirmed")]
        [System.Web.Http.HttpPost]
         
        public async Task<IHttpActionResult> ResetPasswordConfirmed(ResetPasswordViewModel model)
        {
            var db = new ApplicationDbContext();
                var user = db.Users.First(u => u.UserName == model.UserName);
            UserManager.RemovePassword(user.Id);
            IdentityResult result = await UserManager.AddPasswordAsync(user.Id, model.NewPassword);
                if (result.Succeeded)
                {
                    return Ok("success");
                }
                else
                {
                    return Ok(result);
                }
        }
        [System.Web.Http.Route("Account/UserRoles")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult UserRoles(SelectUserRolesViewModel eu)
        {
            var Db = new ApplicationDbContext();
            var user = Db.Users.First(u => u.UserName == eu.UserName);
            var model = new SelectUserRolesViewModel(user);
            return Ok(model);
        }
        [System.Web.Http.Route("Account/UserRolesConfirmed")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult UserRolesConfirmed(SelectUserRolesViewModel model)
        {
                var idManager = new IdentityManager();
                var Db = new ApplicationDbContext();
                var user = Db.Users.First(u => u.UserName == model.UserName);
                //idManager.ClearUserRoles(user.Id);
                foreach (var role in model.Roles)
                {
                    if (role.Selected)
                    {
                        idManager.AddUserToRole(user.Id, role.RoleName);
                    }
                    else
                    {
                        idManager.ClearUserRoles(user.Id, role.RoleName);
                    }
                }
            
            return Ok();
        }
        [System.Web.Http.Route("Account/Delete")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult Delete(SelectUserRolesViewModel eu)
        {
            var Db = new ApplicationDbContext();
            var user = Db.Users.First(u => u.UserName == eu.UserName);
            var model = new EditUserViewModel(user);
            if (user == null)
            {
                return Ok("HttpNotFound");
            }
            return Ok(model);
        }
        [System.Web.Http.Route("Account/DeleteConfirmed")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult DeleteConfirmed(SelectUserRolesViewModel eu)
        {
            var Db = new ApplicationDbContext();
            var user = Db.Users.First(u => u.UserName == eu.UserName);
            Db.Users.Remove(user);
            Db.SaveChanges();
            return Ok();
        }
    }
}
