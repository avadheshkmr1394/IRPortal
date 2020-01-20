using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Insight.Portal.App.Models;
using System.Threading.Tasks;
using System.Collections.Concurrent;

namespace Insight.Portal.App.Hubs
{
    [Authorize]
    public class TaskHub : Hub
    {
        public readonly static ConnectionMapping<string> _connections = new ConnectionMapping<string>();       

        public override Task OnConnected()
        {
            string name = Context.User.Identity.Name;
            string userId = ApplicationUserExtension.GetUserId(name);

            _connections.Add(userId, Context.ConnectionId);

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            string name = Context.User.Identity.Name;
            string userId = ApplicationUserExtension.GetUserId(name);

            _connections.Remove(userId, Context.ConnectionId);

            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {
            string name = Context.User.Identity.Name;
            string userId = ApplicationUserExtension.GetUserId(name);

            if (!_connections.GetConnections(userId).Contains(Context.ConnectionId))
            {
                _connections.Add(userId, Context.ConnectionId);
            }

            return base.OnReconnected();
        }
    }
}