import north from '../layers/north';
import south from '../layers/south';
import east from '../layers/east';
import west from '../layers/west';
import vert from '../layers/vert';
import {
  HEADING_VERT,
  HEADING_NORTH,
  HEADING_SOUTH,
  HEADING_EAST,
  HEADING_WEST
} from '../constants';

/**
  * Serving Layer based on heading
  *
  * The purpose of doing this because of hiding users from rewriting
  * leaflet 'getUrlTile' function.
  **/
export function getLayerByHeading(heading, url) {
  switch (heading) {
    case HEADING_EAST:
      return east(url);
    case HEADING_SOUTH:
      return south(url);
    case HEADING_WEST:
      return west(url);
    case HEADING_NORTH:
      return north(url);
    case HEADING_VERT:
    default:
      return vert(url);
  }
}
