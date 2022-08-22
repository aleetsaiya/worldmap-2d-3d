import React from "react";
import { initMap, getWorldData, zoomIn, zoomOut } from "../utils/map";
import { Feature } from "../types/map";

const { pathGenerator } = initMap(800, 500, "2D");

const features = getWorldData().features as Array<Feature>;

const pathStyle = {
  fill: "#245e71",
  stroke: "#95b195",
};

export const Map2d = () => {
  const renderedPath = features.map((feature, index) => (
    <path d={pathGenerator(feature) || ""} key={index} style={pathStyle} />
  ));

  return (
    <section>
      <svg width={800} height={500}>
        <g id="g2d">{renderedPath}</g>
      </svg>
      <div className="controller">
        <button onClick={() => zoomIn("#g2d", 1.5, -150, 0)}>Zoom in 2D</button>
        <button onClick={() => zoomOut("#g2d")}>Zoom out 2D</button>
      </div>
    </section>
  );
};
