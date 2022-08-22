# worldmap-2d-3d

using d3 to create 2D and 3D world map

## Data
Natural Earth: [https://www.naturalearthdata.com/downloads/110m-cultural-vectors/](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/)

## Step
1. download data from [Natural Earth](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/)
2. translate `.shp` to GeoJSON
3. go to [d3-geo](https://github.com/d3/d3-geo#_path) to select projection that we want
4. provide projection and map size to `geoPath()` to get the pathGenerator
5. using pathGenerator to create `<path/>`

## libraries
+ React
+ Typescript
+ d3.js

## Screenshots
