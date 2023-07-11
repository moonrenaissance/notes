using Microsoft.AspNetCore.Mvc;

namespace Web_API.Controllers
{
  public class NotesController : Controller
  {
    public IActionResult Index()
    {
      return View();
    }
  }
}
