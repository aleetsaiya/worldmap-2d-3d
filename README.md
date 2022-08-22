# worldmap-2d-3d

using d3 to create 2D and 3D world map

**[Live Demo](https://aleetsaiya.github.io/worldmap-2d-3d/)**

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
<img width="830" alt="截圖 2022-08-22 下午6 29 57" src="https://user-images.githubusercontent.com/67775387/185900505-af18e87e-2cd9-4e45-975b-76d35448056f.png">
