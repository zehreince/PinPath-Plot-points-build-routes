using Microsoft.AspNetCore.Mvc;
using NetTopologySuite.Geometries;

namespace PinPathAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RouteController : ControllerBase
    {
        [HttpPost("calculate")]
        public IActionResult CalculateRoute([FromBody] List<CoordinateDto> points)
        {
            if (points == null || points.Count < 2)
                return BadRequest("Rota çizmek için en az 2 nokta göndermelisiniz.");

           
            var coordinates = points.Select(p => new Coordinate(p.Lng, p.Lat)).ToArray();

           
            var geometryFactory = new GeometryFactory();
            var lineString = geometryFactory.CreateLineString(coordinates);

           
            double totalDistance = 0;
            for (int i = 0; i < points.Count - 1; i++)
            {
                totalDistance += CalculateHaversine(points[i], points[i + 1]);
            }

            return Ok(new
            {
                DistanceKm = Math.Round(totalDistance, 2),
                RouteGeometry = lineString
            });
        }

        private double CalculateHaversine(CoordinateDto p1, CoordinateDto p2)
        {
            var R = 6371d; 
            var dLat = (p2.Lat - p1.Lat) * (Math.PI / 180.0);
            var dLon = (p2.Lng - p1.Lng) * (Math.PI / 180.0);
            var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                    Math.Cos(p1.Lat * (Math.PI / 180.0)) * Math.Cos(p2.Lat * (Math.PI / 180.0)) *
                    Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            return R * c;
        }
    }

    public class CoordinateDto
    {
        public double Lat { get; set; }
        public double Lng { get; set; }
    }
}