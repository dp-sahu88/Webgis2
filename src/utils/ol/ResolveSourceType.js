import { GPX, GeoJSON, IGC, KML, TopoJSON } from "ol/format";
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import axios from "axios";
export default function resolveSource(elememt) {
    let res = {}
    let sourceType;
    let type = elememt.type
    const style = {
        'Point': new Style({
          image: new CircleStyle({
            fill: new Fill({
              color: 'rgba(255,0,0,0.4)',
            }),
            radius: 5,
            stroke: new Stroke({
              color: '#f00',
              width: 1,
            }),
          }),
        }),
        'LineString': new Style({
          stroke: new Stroke({
            color: '#f00',
            width: 3,
          }),
        }),
        'MultiLineString': new Style({
          stroke: new Stroke({
            color: '#f00',
            width: 3,
          }),
        }),
        'MultiPolygon': new Style({
          stroke: new Stroke({
            color: 'blue',
            width: 3,
          }),
          fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)',
          }),
        })
      };      
    switch (type) {
        case 'GeoJSON':
            sourceType = new GeoJSON()
            break;
        case 'TopoJSON':
            sourceType = new TopoJSON()
            break
        case 'GPX':
            sourceType = new GPX()
            break
        case 'IGC':
            sourceType = new IGC()
            break
        case 'KML':
            sourceType = new KML({
                extractStyles: false
            })
    }
    let name = 'l_' + elememt.source.replace(' ', '')
    let source = new VectorSource({
        url: elememt.source,
        format: sourceType
    })
    let layer = new VectorLayer({
        title: name,
        name: name,
        source: source,
        style: function (feature) {
            return style[feature.getGeometry().getType()];
        }
    })
    if (!elememt.loaded) {
        axios(elememt.source).then((response) => {
            let features = sourceType.readFeatures(response.data)
            let feature = features[0]
            elememt.focusOn = feature.getGeometry().getExtent().slice(0, 2)
        })
    }

    res = {
        name: name,
        layer: layer
    }
    return res
}