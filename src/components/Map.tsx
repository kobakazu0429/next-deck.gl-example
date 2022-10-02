import { useState } from "react";
import { MapController } from "@deck.gl/core/typed";
import DeckGL, { type DeckGLProps } from "@deck.gl/react/typed";
import { TileLayer } from "@deck.gl/geo-layers/typed";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { bitmapTileLayerRenderSubLayers } from "../deckgl/BitmapTileLayer";

export const Map = () => {
  const [viewState] = useState<DeckGLProps["initialViewState"]>({
    longitude: 135.0066832,
    latitude: 37.9619195,
    zoom: 4,
    maxZoom: 16,
  });

  const tileLayer = new TileLayer({
    data: "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,
    renderSubLayers: bitmapTileLayerRenderSubLayers,
  });

  const layers = [tileLayer];

  return (
    <DeckGL
      layers={layers}
      controller={{ type: MapController }}
      initialViewState={viewState}
    />
  );
};
