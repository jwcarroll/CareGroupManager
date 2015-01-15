using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace CareGroupManager.Controllers
{
    public class ViewsController : Controller
    {
        // GET: Views
        public ActionResult Index(String viewPath)
        {
           return PartialView(viewPath);
        }
    }
}