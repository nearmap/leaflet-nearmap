import leaflet from 'leaflet';
import {transformation} from 'leaflet';
import {project, unproject} from './projection';
import {TILESIZE} from '../constants';

const {vert: {width, height}, base} = TILESIZE;

const projection = leaflet.extend({}, leaflet.CRS, {
  project,
  unproject
});

export default leaflet.extend({}, leaflet.CRS, {
  code: 'nm:vert',
  projection,
  transformation: transformation(
    (width/base),
    (width/base/2),
    (height/base),
    (height/base/2)
  ),
  infinite: true
});
