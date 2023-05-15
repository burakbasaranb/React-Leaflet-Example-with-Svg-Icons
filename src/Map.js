import React, { useEffect, useState, useRef } from "react";

import { Map as LeafletMap, TileLayer, Marker, Popup, LayersControl} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

import 'leaflet-arrowheads'
import Polyline from 'react-leaflet-arrowheads';
import { Istanbul_Euro, Istanbul_Anatolia } from './coordinate'

const { BaseLayer } = LayersControl;

const MyMap = () => {

  const iconMaker = L.icon({
    iconUrl: icon,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

  const yandexCrs = L.CRS.EPSG3395;
  const otherCrs = L.CRS.EPSG3857;
  const defaultZoom = 9;
  const mapCenter = [40.873795896121194, 29.091452032765492];
  const [CusromCRS, setCusromCRS] = useState(otherCrs); // [googleCrs, yandexCrs
  const mapRef = useRef(null);

  const handleTileClick_addYandex = () => {
    setCusromCRS(yandexCrs);
  };
  const handleTileClick_removeYandex = () => {
    setCusromCRS(otherCrs);
  };

  useEffect(() => {
    const map = mapRef.current.leafletElement;
    map.options.crs = CusromCRS;
    var userZoom = map.getZoom();
    var refreshZoom = userZoom + 1;
    const mapCenter = [40.873795896121194, 29.091452032765492];
    map.setView(mapCenter, refreshZoom);
    map.setView(mapCenter, userZoom);
  }, [CusromCRS]);

  //console.log(mapRef.current.props.crs)


    return (
      <div>
      <LeafletMap
        doubleClickZoom={false}
        center={mapCenter}
        id="mapId"
        zoom={defaultZoom}
        ref={mapRef}
        crs={CusromCRS}
        >

      <LayersControl>
          <BaseLayer checked name="Google Yol">
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&lang=tr_TR"
              subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
              attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
          </BaseLayer>
          <BaseLayer name="Yandex Uydu">
            <TileLayer
              url="https://sat{s}.maps.yandex.net/tiles?l=sat&x={x}&y={y}&z={z}&lang=tr_TR"
              subdomains={['01', '02', '03', '04']}
              attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
              onAdd={() => handleTileClick_addYandex()}
              onRemove={() => handleTileClick_removeYandex()}
            />
          </BaseLayer>
          <BaseLayer name="Google Uydu">
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}&lang=tr_TR"
              subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
              attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
          </BaseLayer>
          <BaseLayer  name="Yandex Yol">
          <TileLayer
            attribution= "Yandex Yol"
            url= "https://core-renderer-tiles.maps.yandex.net/tiles?l=map&v=21.06.18-0-b210520094930&x={x}&y={y}&z={z}&scale=1&lang=tr_TR"
            maxNativeZoom = {20}
            subdomains = {["01", "02", "03", "04"]}
            onAdd={() => handleTileClick_addYandex()}
            onRemove={() => handleTileClick_removeYandex()}
            />
          </BaseLayer>
          <BaseLayer name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
          </BaseLayer>
          <BaseLayer name="NASA Gibs Blue Marble">
            <TileLayer
              url="https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg"
              attribution="&copy; NASA Blue Marble, image service by OpenGeo"
              maxNativeZoom={8}
            />
          </BaseLayer>
        </LayersControl>

        <Marker position={mapCenter} icon={iconMaker}>
            <Popup>
             Marker
            </Popup>
        </Marker>

        <Polyline smoothFactor={5} color="darkred" positions={Istanbul_Euro} arrowheads={{ size: '5px' }}>
        <Popup>
          <code>{`<Polyline smoothFactor={5} color="darkred" positions={serbianBorder} arrowheads={{ size: '5px' }}>`}</code>
        </Popup>
      </Polyline>

      <Polyline smoothFactor={5} color="blue" positions={Istanbul_Anatolia} arrowheads={{ size: '5px' }}>
        <Popup>
          <code>{`<Polyline smoothFactor={5} color="darkred" positions={serbianBorder} arrowheads={{ size: '5px' }}>`}</code>
        </Popup>
      </Polyline>

      
      </LeafletMap>
      </div>
    );
}

export default MyMap;