import leaflet from 'leaflet';

const url = 'https://api.nearmap.com/tiles/v3/{contentType}/{z}/{x}/{y}.img?tertiary=default&apikey=YOUR_API_KEY';
const zoom = 16;
const tileWidth = 256;
const tileHeight = 256;
const lat = -33.862704;
const lng = 151.208508;
const heading = 'HEADING_NORTH';
const center = [lat, lng];
const tileSize = leaflet.point(tileWidth, tileHeight);

export {
  url,
  zoom,
  heading,
  center,
  tileSize
};
