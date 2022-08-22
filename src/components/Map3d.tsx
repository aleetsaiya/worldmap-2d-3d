import React, { useEffect } from "react";
import {
  initMap,
  getWorldData,
  rotate3DMap,
  zoomIn,
  zoomOut,
} from "../utils/map";
import { Feature } from "../types/map";

const { projection, pathGenerator } = initMap(500, 500, "3D");

const features = getWorldData().features as Array<Feature>;

const pathStyle = {
  fill: "#245e71",
  stroke: "#95b195",
};

const sphereStyle = {
  fill: "#c6d6db",
};

let rotateIntervalID = -1;

export const Map3d = () => {
  useEffect(() => {
    // rotate the 3D Map
    startRotate();
  }, []);

  const renderedSpgere = (
    <path d={pathGenerator({ type: "Sphere" }) || ""} style={sphereStyle} />
  );

  const startRotate = () => {
    if (rotateIntervalID === -1)
      rotateIntervalID = rotate3DMap(
        projection,
        pathGenerator,
        features,
        "#g3d .path-country"
      );
  };

  const stopRotate = () => {
    if (rotateIntervalID !== -1) {
      clearInterval(rotateIntervalID);
      rotateIntervalID = -1;
    }
  };

  const renderedPath = features.map((feature, index) => (
    <path
      d={pathGenerator(feature) || ""}
      key={index}
      style={pathStyle}
      className="path-country"
    />
  ));

  return (
    <section>
      <svg width={500} height={500}>
        <g id="g3d">
          {renderedSpgere}
          {renderedPath}
        </g>
      </svg>
      <div className="controller">
        <button onClick={() => zoomIn("#g3d", 1.5, -50, 0)}>Zoom in 3D</button>
        <button onClick={() => zoomOut("#g3d")}>Zoom out 3D</button>
        <button onClick={() => startRotate()}>Start rotate</button>
        <button onClick={() => stopRotate()}>Stop rotate</button>
      </div>
    </section>
  );
};
