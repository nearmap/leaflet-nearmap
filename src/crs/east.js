import {transformation, CRS, extend, Point} from 'leaflet';
import {project, unproject} from './projection';
import {TILESIZE} from '../constants';

const {east: {width, height}, base} = TILESIZE;

const projection = extend({}, CRS, {
  project(latlng) {
    const {x, y} = project(latlng);
    return new Point(y, x);
  },
  unproject({x, y}) {
    return unproject(new Point(y, x));
  }
});

export default extend({}, CRS, {
  code: 'nm:east',
  projection,
  transformation: transformation(
    (width/base),
    (width/base/2),
    -(height/base),
    (height/base/2)
  ),
  infinite: true
});
