import { VerticalOrigin, LabelStyle, Math, Cartesian2, Color, ArcType, Cartesian3, HeightReference } from "cesium"
import { ref } from 'vue'
const line = ref([])
let viewer;

function clickHandler(event) {
  const mousePosition = new Cartesian2(event.clientX, event.clientY);
  const selectedLocation = convertScreenPixelToLocation(mousePosition);
  if (selectedLocation == null) {
    return;
  }
  setMarkerInPos(selectedLocation);
  updateLine(selectedLocation)
  draw(viewer);
}

function convertScreenPixelToLocation(mousePosition) {
  const ellipsoid = viewer.scene.globe.ellipsoid;
  const cartesian = viewer.camera.pickEllipsoid(mousePosition, ellipsoid);
  if (cartesian) {
    const cartographic = ellipsoid.cartesianToCartographic(cartesian);
    const longitudeString = Math.toDegrees(cartographic.longitude).toFixed(15);
    const latitudeString = Math.toDegrees(cartographic.latitude).toFixed(15);
    return { lat: Number(latitudeString), lng: Number(longitudeString) };
  } else {
    return null;
  }
}

function updateLine(position) {
  line.value.push(position.lng)
  line.value.push(position.lat)
  let n = line.value.length;
  if (n == 6) {
    line.value = line.value.slice(2, n);
  }
}

function draw() {
  if (line.value.length < 4) {
    return
  }
  const wyoming = viewer.entities.add({
    polyline: {
      positions: Cartesian3.fromDegreesArray(line.value),
      width: 5,
      arcType: ArcType.RHUMB,
      material: Color.GREENYBLUE,
      heightReference: HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
    },
  });
  // viewer.zoomTo(wyoming);
}

function setMarkerInPos( position) {
  viewer.pickTranslucentDepth = true;
  const locationMarker = viewer.entities.add({
    name: 'location',
    position: Cartesian3.fromDegrees(position.lng, position.lat),
    point: {
      pixelSize: 5,
      color: Color.RED,
      outlineColor: Color.WHITE,
      outlineWidth: 2
    },
    // label: {
    //   text: position.lng+' '+position.lat,
    //   font: '14pt monospace',
    //   style: LabelStyle.FILL_AND_OUTLINE,
    //   outlineWidth: 2,
    //   verticalOrigin: VerticalOrigin.BOTTOM,
    //   pixelOffset: new Cartesian2(0, -9)
    // }
  });
}

export function viewerAddDrawEventListener(view) {
  viewer = view;
  viewer.scene.canvas.addEventListener('click', clickHandler, false);
}

export function viewerRemoveDrawEventListener(viewer) {
  viewer.scene.canvas.removeEventListener('click', clickHandler);
}
