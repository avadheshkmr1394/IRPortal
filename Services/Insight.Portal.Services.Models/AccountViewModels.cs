//using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;

namespace Insight.Portal.Services.Models
{
    public class ManageUserViewModel
    {
        //[Required]
        //[DataType(DataType.Password)]
        //[Display(Name = "Current password")]
        public string OldPassword { get; set; }

        //[Required]
        //[StringLength(100, ErrorMessage =
        //    "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        //[DataType(DataType.Password)]
        //[Display(Name = "New password")]
        public string NewPassword { get; set; }

        //[DataType(DataType.Password)]
        //[Display(Name = "Confirm new password")]
        //[Compare("NewPassword", ErrorMessage =
        //    "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }

    public class LoginViewModel
    {
        //[Required]
        //[Display(Name = "Login Id")]
        public string UserName { get; set; }

        //[Required]
        //[DataType(DataType.Password)]
        //[Display(Name = "Password")]
        public string Password { get; set; }

        //[Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }

    public class RegisterViewModel
    {
        //[Required]
        //[Display(Name = "User name")]
        public string UserName { get; set; }

        //[Required]
        //[StringLength(100, ErrorMessage =
        //    "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        //[DataType(DataType.Password)]
        //[Display(Name = "Password")]
        public string Password { get; set; }

        //[DataType(DataType.Password)]
        //[Display(Name = "Confirm password")]
        //[Compare("Password", ErrorMessage =
        //    "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        // New Fields added to extend Application User class:

        //[Required]
        //[Display(Name = "First Name")]
        public string FirstName { get; set; }

        //[Display(Name = "Last Name")]
        public string LastName { get; set; }

        public string Email { get; set; }

        //[Display(Name = "Telephone")]
        public string PhoneNumber { get; set; }
        public int Status { get; set; } = 0;

        // Return a pre-poulated instance of AppliationUser:
        public ApplicationUser GetUser()
        {
            var user = new ApplicationUser()
            {
                UserName = this.UserName,
                FirstName = this.FirstName,
                LastName = this.LastName,
                Email = this.Email,
                PhoneNumber = this.PhoneNumber,
                Status = this.Status,
            };
            return user;
        }
    }

    public class EditUserViewModel
    {
        public EditUserViewModel() { }

        // Allow Initialization with an instance of ApplicationUser:
        public EditUserViewModel(ApplicationUser user)
        {
            this.UserName = user.UserName;
            this.FirstName = user.FirstName;
            this.LastName = user.LastName;
            this.Email = user.Email;
            this.PhoneNumber = user.PhoneNumber;
            this.Status = user.Status;
        }
        //[Required]
        //[Display(Name = "User Name")]
        public string UserName { get; set; }

        //[Required]
        //[Display(Name = "First Name")]
        public string FirstName { get; set; }

        //[Display(Name = "Last Name")]
        public string LastName { get; set; }

        public string Email { get; set; }

        //[Display(Name = "Telephone")]
        public string PhoneNumber { get; set; }
        //[Display(Name = "Status")]
        public int Status { get; set; }
    }

    public class ResetPasswordViewModel
    {
        //[Required]
        public string UserName { get; set; }

        //[Required]
        //[StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        //[DataType(DataType.Password)]
        //[Display(Name = "New password")]
        public string NewPassword { get; set; }

        //[DataType(DataType.Password)]
        //[Display(Name = "Confirm new password")]
        //[Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
    public class SelectUserRolesViewModel
    {
        public SelectUserRolesViewModel()
        {
            this.Roles = new List<SelectRoleEditorViewModel>();
        }


        // Enable initialization with an instance of ApplicationUser:
        public SelectUserRolesViewModel(ApplicationUser user)
            : this()
        {
            this.UserName = user.UserName;
            this.FirstName = user.FirstName;
            this.LastName = user.LastName;
            this.PhoneNumber = user.PhoneNumber;

            var Db = new ApplicationDbContext();

            // Add all available roles to the list of EditorViewModels:
            var allRoles = Db.Roles;
            foreach (var role in allRoles)
            {
                var rvm = new SelectRoleEditorViewModel();
                rvm.RoleName = role.Name;
                foreach (var userRole in user.Roles)
                {
                    if (userRole.RoleId == role.Id)
                    {
                        rvm.Selected = true;
                    }
                }
                this.Roles.Add(rvm);
            }
        }

        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public List<SelectRoleEditorViewModel> Roles { get; set; }
    }
    public class SelectRoleEditorViewModel
    {
        public SelectRoleEditorViewModel() { }
        public SelectRoleEditorViewModel(IdentityRole role)
        {
            this.RoleName = role.Name;
        }

        public bool Selected { get; set; }

        public string RoleName { get; set; }
    }
}

