# Create 2D, 3D world map using d3

Github repos: 

[https://github.com/aleetsaiya/worldmap-2d-3d](https://github.com/aleetsaiya/worldmap-2d-3d)

我們可以使用 d3.js 來幫助我們在網頁上建立一個 2D 或是 3D 地圖，而為了要讓 d3.js 知道說我們想要繪製什麼樣的地圖，首先我們需要有地理位置的相關資料 ( 又稱 GIS data )，常見的地理位置資料格式有 GeoJSON、shp、 TopoJSON …，有興趣的話可以參考這篇文章

 [常見的GIS資料格式](https://ithelp.ithome.com.tw/articles/10193701):

[](https://ithelp.ithome.com.tw/articles/10193701)

我自己在做的時候是直接餵 GeoJSON 給 d3.js，如果要使用 TopoJSON 或是 shp 的話，可以選擇在線上先將他們轉換成 GeoJSON 格式，又或是透過 library 直接在程式碼裡面轉換成 GeoJSON。

[Natural Earth](https://www.naturalearthdata.com/downloads/) 提供免費開源的世界 GIS 資料 (格式為 shp)，可以在這邊下載好資料後再透過工具轉換成 GeoJSON

GeoJSON 資料大概會長這樣：

```json
{
    type: "FeatureCollection",
    // 每個 feature 到時候都會對應到一個 path
    "features": [
        {
            "type": "Feature",
            // properties 裡面的資料算是額外資訊的感覺，可以自己手動加上去
            "properties": {
                "country": "Taiwan"
            },
            "geometry": {
                "type": "Multipolygon",
                "coordinates": [...]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "country": "Japan"
            },
            "geometry": {
                "type": "Multipolygon",
                "coordinates": [...]
            }
        }
    ]
}
```

## d3-geo

在有 GeoJSON 資料後，我們需要一個工具來幫助我們將這些資料繪製在我們的網頁上面，而 d3.js 提供兩種方法來幫助我們繪製分別為使用 canvas 以及使用 svg

> 接下來主要介紹使用 svg 繪製世界地圖的方法
> 

[d3-geo](https://github.com/d3/d3-geo) 是 d3.js 處理 geo 部分的 library，我們可以從他們的 repository 看到裡面有提供各種各樣的 projection 給我們使用，如果是要繪製 3D 地圖的話可以使用 `geoOrthographic`，而 2D 地圖的話我自己是使用 `geoNaturalEarth1`

<aside>
💡  projection 的意思是我們以哪一種**投影方式**來繪製地圖

</aside>

當我們建立好 projection 的 instance 之後，我們把 GeoJSON 餵給 d3-geo，他會回傳給我們一個 pathGenerator，我們就可以把 GeoJSON 裡面的各個 feature 丟給 pathGenerator，他會回傳給我們 `<path/>` 需要的 `d` attribute 需要的值

```tsx
import { geoNaturalEarth1, geoOrthographic, geoPath } from 'd3-geo';
import worldData from './geoJSON.json' // GeoJSON 格式的世界資料

const mapsize = [1200, 800]; // 地圖的 width, height

export const init2DMap = () => {
    // 建立 2D projection 並設定地圖大小
    const projection = geoNaturalEarth1().fitSize(mapSize, worldData);
    // 將 projection 丟給 geoPath 讓它知道之後會以哪種方式投影
    const pathGenerator = geoPath(projection);
    
    return {projection, pathGenerator}
}

export const init3DMap = () => {
    // 建立 3D projection 並設定地圖大小
    const projection = geoOrthographic().fitSize(mapSize, worldData);
    const pathGenerator = geoPath(projection);
    
    return {projection, pathGenerator}
}

export const renderPaths = (pathGenerator) => {
    const { features } = worldData;
    
    return features.map((feature, index) => <path d={pathGenerator(feature)} />)
}
```

將建立好的 `<path/>` 包在 `<svg>` 裡面就會顯示世界地圖了，如果是要繪製世界地圖的地面的話，把 `{type: 'Sphere'}` 傳入 pathGenerator

```tsx
export const renderSphere = (pathGenerator) => {
    return <path d={pathGenerator({type: 'Sphere'})}/>
}
```

要改變各個國家或是邊界的顏色的話，透過 css 的 `fill` 跟 `stroke` 就可以達成

```css
path {
  fill: lightblue;
  stroke: pink;
}
```

## Transition

基本上透過 d3-geo 就能夠達成繪製世界地圖的功能，如果需要增加 Transition 或是其他功能的話可以選擇 d3 的其他 library，底下使用 d3 來建立一個可以 zoom in、zoom out 的 3D Map

```tsx
import { select, easeCubicOut } from 'd3'

// 對 g tag 進行放大跟移位置
export const zoomIn = () => {
    const g = select('#g');
    g.transition()
        .duration(700)
        .ease(easeCubicOut)
        .attr(
            'transform',
            `scale(${1.5}) translate(${-300}, ${50})`
        )
}

// 回覆原本大小跟位置
export const zoomOut = () => {
    const g = select('#g');
    g.transition()
        .duration(700)
        .ease(easeCubicOut)
        .attr(
            'transform',
            `scale(${1}) translate(${0}, ${0})`
        )
}
```
