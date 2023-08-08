import { GPX, GeoJSON, IGC, KML, TopoJSON } from "ol/format";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import axios from "axios";
import { ref } from "vue";
export default function resolveSource(elememt) {
    let res = {}
    let sourceType;
    let type = elememt.type
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
                extractStyles: true
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
        source: source
    })
    if (!elememt.focusOn) {
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