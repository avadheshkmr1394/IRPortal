using System.Web;
using System.Web.Optimization;

namespace Insight.Portal.App
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"
                        ,"~/Scripts/respond.js"
                        , "~/Scripts/spin.min.js"
                        ,"~/Scripts/moment.min.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/bootstrap-datetimepicker.min.js"));

            //bundles.Add(new ScriptBundle("~/bundles/portal").Include(
            //          "~/Scripts/Portal/Portal.js"
            //          ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                       "~/Content/site.css"
                      ));

            //bundles.Add(new StyleBundle("~/Content/css2").Include(
            //          "~/Content/bootstrap.css",
            //          "~/Content/font-awesome.css",
            //          "~/Content/style.css"));

            bundles.Add(new ScriptBundle("~/bundles/chart").Include(
                        "~/Scripts/ChartNew.js"));

            bundles.Add(new ScriptBundle("~/bundles/fileStyle").Include("~/Scripts/bootstrap-filestyle.min.js"));

            BundleTable.EnableOptimizations = true;

        }
    }
}
