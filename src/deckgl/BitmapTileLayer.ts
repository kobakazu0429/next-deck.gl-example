import {
  type TileLayerProps,
  type GeoBoundingBox,
  type _TileLoadProps,
} from "@deck.gl/geo-layers/typed";
import { BitmapLayer } from "@deck.gl/layers/typed";

const isGeoBoundingBox = (
  bbox: _TileLoadProps["bbox"]
): bbox is GeoBoundingBox => {
  if (Object.hasOwn(bbox, "west")) {
    return true;
  }
  return false;
};

export const bitmapTileLayerRenderSubLayers: TileLayerProps["renderSubLayers"] =
  (props) => {
    const { bbox } = props.tile;
    if (!isGeoBoundingBox(bbox)) {
      throw new Error("bbox is NonGeoBoundingBox");
    }

    return new BitmapLayer(props, {
      data: null,
      image: props.data,
      bounds: [bbox.west, bbox.south, bbox.east, bbox.north],
    });
  };
