import {TileLayer, Point} from 'leaflet';
import {TILESIZE} from '../constants';

const {vert: {width, height}} = TILESIZE;


export const Vert = TileLayer;


export default function vert(url) {
  return new Vert(url, {
    layer: 'Vert',
    tileSize: new Point(width, height)
  });
}
