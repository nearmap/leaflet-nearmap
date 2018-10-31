import {Point, LatLng} from 'leaflet';

const worldWidth = 1;
const worldHeight = 1;
const origin = new Point(0, 0);
const pixelsPerLonDegree = worldWidth / 360;
const pixelsPerLatRadian = worldHeight / (2 * Math.PI);
const degreesToRadians = (deg)=> deg * (Math.PI / 180);
const radiansToDegrees = (rad)=> rad / (Math.PI / 180);


/* Translate a location given as a LatLng to a point in world coordinates.
*
* The implementation is a simple mercator projection with rectangular
* layout. Lat,lon and the resulting point are rotated depending on the
* heading.
**/
export function project({lat, lng}) {
  const x = origin.x + lng * pixelsPerLonDegree;
  const siny = Math.sin(degreesToRadians(lat));
  const y = origin.y +
    1/2 * Math.log((1 + siny) / (1 - siny)) *
    -pixelsPerLatRadian;
  return new Point(x, y);
}

/**
* Translate a location given as point in world coordinates to lat, lng.
*
* The implementation is a simple mercator projection with rectangular
* layout. The given point and the resulting lat,lon are rotated depending
* on the heading.
**/
export function unproject({x, y}) {
  const lng = (x - origin.x) / pixelsPerLonDegree;
  const latRadians = (y - origin.y) / -pixelsPerLatRadian;
  const lat = radiansToDegrees(
    2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2
  );
  return new LatLng(lat, lng);
}
