
import {transformation, CRS, extend} from 'leaflet';
import {project, unproject} from './projection';
import {TILESIZE} from '../constants';

const {south: {width, height}, base} = TILESIZE;

const projection = extend({}, CRS, {
  project,
  unproject
});

export default extend({}, CRS, {
  code: 'nm:south',
  projection,
  transformation: transformation(
    -(width/base),
    (width/base/2),
    -(height/base),
    (height/base/2)
  ),
  infinite: true
});
