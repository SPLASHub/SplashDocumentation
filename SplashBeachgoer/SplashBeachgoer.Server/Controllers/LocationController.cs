using Microsoft.AspNetCore.Mvc;

namespace SplashBeachgoer.Server.Controllers
{
    [ApiController]
    [Route("location")]
    public class LocationController : ControllerBase
    {
        private LocationInfo current = new LocationInfo { x = 40.642124, y = -8.748868 };

        [HttpGet("Current")]
        public ActionResult<LocationInfo> GetCurrentLocation()
        {
            return current;
        }

        [HttpGet("Markers")]
        public ActionResult<IEnumerable<Marker>> GetMarkers()
        {
            var markers = new List<Marker>
            {
                new Marker { Coordinates = new LocationInfo { x = 40.642225, y = -8.748868 }, Description = "Marker 1", MarkerType = "lifeguardpost" },
                new Marker { Coordinates = new LocationInfo { x = 40.642626, y = -8.748768 }, Description = "Marker 2", MarkerType = "danger"},
                new Marker { Coordinates = new LocationInfo { x = 40.642124, y = -8.749869 }, Description = "Marker 3", MarkerType = "fish"},
                new Marker { Coordinates = new LocationInfo { x = 40.641824, y = -8.749266 }, Description = "Marker 4", MarkerType = "danger"},
            };

            return markers;
        }
    }

    public class LocationInfo
    {
        public double x { get; set; }

        public double y { get; set; }
    }

    public class Marker
    {
        private static int counter = 0;
        public Marker()
        {
            Id = ++counter;
        }
        public int Id { get; private set; }
        public LocationInfo Coordinates { get; set; } = new LocationInfo { x = 0, y = 0 };

        public string? Description { get; set; }

        public string? MarkerType { get; set; }
    }
}


