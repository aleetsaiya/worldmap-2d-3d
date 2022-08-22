import {
  geoPath,
  geoNaturalEarth1,
  geoOrthographic,
  selectAll,
  easeCircleInOut,
} from "d3";
import { WorldData, Projection, Feature } from "../types/map";
import worldData from "../assets/world.json";

const data = worldData as WorldData;
let currentDegree = 0;

/**
 *
 * @param width : world map width
 * @param height : world map height
 * @param type : want 2D or 3D
 * @returns pathGenerator for creating <path/> and the projection that we used
 */
export const initMap = (width: number, height: number, type: "2D" | "3D") => {
  const mapSize = [width, height] as [number, number];

  let projection;
  if (type === "2D") projection = geoNaturalEarth1().fitSize(mapSize, data);
  else projection = geoOrthographic().fitSize(mapSize, data);

  const pathGenerator = geoPath(projection);

  return { pathGenerator, projection };
};

/**
 *
 * @returns return typed world GeoJSON data
 */
export const getWorldData = () => {
  return data;
};

/**
 *
 * @param projection the 3D projection
 * @param pathGenerator the 3D path generator
 * @param features Array of features that will be map to each path
 * @param pathsSelector the way to select the paths by using `d3.selectAll()`
 * @returns
 */
export const rotate3DMap = (
  projection: Projection,
  pathGenerator: any,
  features: Array<Feature>,
  pathsSelector: string
) => {
  // select all paths and give feature to each
  const paths = selectAll(pathsSelector).data(features);

  const step = 5;
  const intervalID = window.setInterval(() => {
    // update current degree
    currentDegree = currentDegree + step;

    // rotate the projection
    projection.rotate([currentDegree, 0]);

    // reset each path attribute
    paths.attr("d", (data: any, index: number) => {
      return pathGenerator(data);
    });
  }, 100);
  return intervalID;
};

export const zoomIn = (
  gSelector: string,
  scale: number = 1,
  x: number = 0,
  y: number = 0
) => {
  const g = selectAll(gSelector);

  g.transition()
    .duration(700)
    .ease(easeCircleInOut)
    .attr("transform", `scale(${scale}) translate(${x}, ${y})`);
};

export const zoomOut = (gSelector: string) => {
  const g = selectAll(gSelector);
  g.transition()
    .duration(700)
    .ease(easeCircleInOut)
    .attr("transform", `scale(${1})`);
};
