import {GPX, GeoJSON, IGC, KML, TopoJSON } from "ol/format";

export default function resolveSource(response, elememt){
    if (200 > response.status || response.status >= 300){
        return {error: response.statusText}
    }
    let res = {} 
    let type = elememt.type
    switch (type) {
        case 'GeoJSON':
            res = new GeoJSON().readFeatures(response.data)
            break;
        case 'TopoJSON':
            res = new TopoJSON().readFeatures(response.data)
            break
        case 'GPX':
            res = new GPX().readFeatures(response.data)
            break
        case 'IGC':
            res = new IGC().readFeatures(response.data)
            break
        case 'KML':
            res = new KML().readFeatures(response.data,{
                extractStyles: true
              })
    }
    if (type == 'GeoJSON'){
    } 

    return res
}