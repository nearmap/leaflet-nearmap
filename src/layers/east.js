import {TileLayer, Point} from 'leaflet';
import {TILESIZE} from '../constants';

const {east: {width, height}} = TILESIZE;


export const East = TileLayer.extend({
  getTileUrl({x, y, z}) {
    const numTiles = 1 << z; // 2^zoom
    [x, y] = [numTiles - (y + 1), x];
    // eslint-disable-next-line prefer-reflect
    return TileLayer.prototype.getTileUrl.call(this, {x, y, z});
  }
});


export default function east(url) {
  return new East(url, {
    layer: 'East',
    tileSize: new Point(width, height)
  });
}
