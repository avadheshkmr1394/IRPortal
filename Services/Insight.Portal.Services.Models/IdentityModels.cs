using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations.Schema;

namespace Insight.Portal.Services.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int Status { get; set; }
        public string UserName { get; internal set; }
    }

    public class ConnectionMapping<T>
    {
        private readonly Dictionary<T, HashSet<string>> _connections = new Dictionary<T, HashSet<string>>();

        public int Count
        {
            get
            {
                return _connections.Count;
            }
        }

        public void Add(T key, string connectionId)
        {
            lock (_connections)
            {
                HashSet<string> connections;
                if (!_connections.TryGetValue(key, out connections))
                {
                    connections = new HashSet<string>();
                    _connections.Add(key, connections);
                }

                lock (connections)
                {
                    connections.Add(connectionId);
                }
            }
        }

        public IEnumerable<string> GetConnections(T key)
        {
            HashSet<string> connections;
            if (_connections.TryGetValue(key, out connections))
            {
                return connections;
            }

            return Enumerable.Empty<string>();
        }

        public void Remove(T key, string connectionId)
        {
            lock (_connections)
            {
                HashSet<string> connections;
                if (!_connections.TryGetValue(key, out connections))
                {
                    return;
                }

                lock (connections)
                {
                    connections.Remove(connectionId);

                    if (connections.Count == 0)
                    {
                        _connections.Remove(key);
                    }
                }
            }
        }
    }
    [NotMapped]
    public class ApplicationUserExtension : ApplicationUser
    {
        public static string GetUserId(string key)
        {
            if (string.IsNullOrWhiteSpace(key)) return string.Empty;

            var um = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));

            if (key.Contains(' '))
            {
                string[] names = key.Split(' ');
                var identityName = names[0].Substring(0, 1).ToLower() + names[1].ToLower();
                return um.FindByName(identityName).Id;
            }
            return um.FindByName(key).Id;
        }
    }
 

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection")
        {

        }
    }
 
    [NotMapped]
    public class ApplicationRole : IdentityRole
    {
        public ApplicationRole() : base() { }
        public ApplicationRole(string name) : base(name) { }
        public string Description { get; set; }

    }

    [NotMapped]
    public class IdentityManager
    {
        public bool RoleExists(string name)
        {
            var rm = new RoleManager<IdentityRole>(
                new RoleStore<IdentityRole>(new ApplicationDbContext()));
            return rm.RoleExists(name);
        }


        public bool CreateRole(string name)
        {
            var rm = new RoleManager<IdentityRole>(
                new RoleStore<IdentityRole>(new ApplicationDbContext()));
            var idResult = rm.Create(new IdentityRole(name));
            return idResult.Succeeded;
        }


        public bool CreateUser(ApplicationUser user, string password)
        {
            var um = new UserManager<ApplicationUser>(
                new UserStore<ApplicationUser>(new ApplicationDbContext()));
            var idResult = um.Create(user, password);
            return idResult.Succeeded;
        }


        public bool AddUserToRole(string userId, string roleName)
        {
            var um = new UserManager<ApplicationUser>(
                new UserStore<ApplicationUser>(new ApplicationDbContext()));
            var idResult = um.AddToRole(userId, roleName);
            return idResult.Succeeded;
        }


        public bool ClearUserRoles(string userId, string roleName)
        {
            var um = new UserManager<ApplicationUser>(
               new UserStore<ApplicationUser>(new ApplicationDbContext()));
            var idResult = um.RemoveFromRole(userId, roleName);
            return idResult.Succeeded;
        }

    }
}
