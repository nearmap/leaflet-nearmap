import {TileLayer, Point} from 'leaflet';
import {TILESIZE} from '../constants';

const {north: {width, height}} = TILESIZE;


export const North = TileLayer;


export default function north(url) {
  return new North(url, {
    layer: 'North',
    maxZoom: 24,
    tileSize: new Point(width, height)
  });
}
