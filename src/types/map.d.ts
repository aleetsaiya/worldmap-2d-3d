import { ExtendedFeature, ExtendedFeatureCollection } from 'd3';
import worldData from '../assets/world.json'
import { geoPath } from 'd3'

const properties = worldData.features[0].properties;

// properties type in every feature
export type Properties = typeof properties;

// earch featuere type in world data
export type Feature = ExtendedFeature<MultiPoint, Properties>;

// world data type
export type WorldData = ExtendedFeatureCollection<Feature>;

// d3 projection type
export type Projection = GeoProjection;