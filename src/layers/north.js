import {TileLayer, Point} from 'leaflet';
import {TILESIZE} from '../constants';

const {north: {width, height}} = TILESIZE;


export const North = TileLayer;


export default function north(url) {
  return new North(url, {
    layer: 'North',
    tileSize: new Point(width, height)
  });
}
