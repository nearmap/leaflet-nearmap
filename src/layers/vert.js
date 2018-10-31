import {TileLayer, Util, Point} from 'leaflet';
import {TILESIZE} from '../constants';

const {vert: {width, height}} = TILESIZE;
/**
  * Wraping TileLayer with custom getTileUrl of vertical heading
  *
  **/
export default function vert(url) {
  const LayerClass = TileLayer.extend({
    getTileUrl: function({x, y, z}) {
      return Util.template(url, {
        contentType: 'Vert',
        x,
        y,
        z
      });
    }
  });

  return (new LayerClass('', {
    tileSize: new Point(width, height)
  }));
}
