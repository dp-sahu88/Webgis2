import { GPX, GeoJSON, IGC, KML, TopoJSON } from "ol/format";
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { getToken } from "../auth/auth";
import axios from "axios";

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
  }),
  'Polygon': new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 3,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  })
};

function getSourceType(type) {
  switch (type) {
    case 'GeoJSON':
      return new GeoJSON()
    case 'TopoJSON':
      return new TopoJSON()
    case 'GPX':
      return new GPX()
    case 'IGC':
      return new IGC()
    case 'KML':
      return new KML({
        extractStyles: false
      })
  }
}

function setFocuson(elememt, sourceType) {
  if (!elememt.loaded) {
    let header = {}
    if (elememt.sourceOrigin === "internal") {
      header = {
        'Authorization': 'Bearer ' + getToken()
      }
    }
    axios(elememt.source, { headers: header }).then((response) => {
      let features = sourceType.readFeatures(response.data)
      let feature = features[0]
      elememt.focusOn = feature.getGeometry().getExtent().slice(0, 2)
    })
  }
}

export default function resolveSource(elememt) {
  let res = {}
  let type = elememt.type
  let sourceType = getSourceType(type);
  let name = 'l_' + elememt.source.replace(' ', '')
  let source;
  if (elememt.sourceOrigin === 'internal') {
    source = new VectorSource({
      format: sourceType,
      loader: function () {
        axios.get(elememt.source
          , {
            headers: {
              'Authorization': 'Bearer ' + getToken()
            }
          }
        )
          .then(res => {
            var geoJsonFormat = new GeoJSON();
            var features = geoJsonFormat.readFeatures(JSON.stringify(res.data));
            source.addFeatures(features)
          })
          .catch(err => console.warn(err))
      }
    })
  } else {
    source = new VectorSource({
      format: sourceType,
      url: elememt.source,
    })
  }

  let layer = new VectorLayer({
    title: name,
    name: name,
    source: source,
    style: function (feature) {
      return style[feature.getGeometry().getType()];
    }
  })
  setFocuson(elememt, sourceType)
  res = {
    name: name,
    layer: layer
  }
  return res
}