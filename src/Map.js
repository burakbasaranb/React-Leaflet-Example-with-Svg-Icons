import React, { useEffect, useState, useRef } from "react";

import { Map as LeafletMap, TileLayer, Marker, Popup, LayersControl} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import './index.css'
import L from 'leaflet';
import { renderToString } from 'react-dom/server';
import { SvgIcon_circle, SvgIcon_rect, SvgIcon_linkedin } from './svgIcons';

const { BaseLayer } = LayersControl;

const MyMap = () => {

  const yandexCrs = L.CRS.EPSG3395;
  const otherCrs = L.CRS.EPSG3857;
  const defaultZoom = 10;
  const mapCenter = [40.980025480279345, 29.027560864012592];
  const markerCircle = [40.873795896121194, 29.091452032765492];
  const markerRect = [40.868752160207144, 29.12765133715833]; 
  const markerLinkedin = [40.980025480279345, 29.027560864012592]; 
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
  const iconSvg_circle = L.divIcon({
    className: 'LsvgIcon',
    // eslint-disable-next-line react/jsx-pascal-case 
    html: renderToString(<SvgIcon_circle fill='red' width={24} height={24} />)
  });

  const iconSvg_rect = L.divIcon({
    className: 'LsvgIcon',
    // eslint-disable-next-line react/jsx-pascal-case 
    html: renderToString(<SvgIcon_rect fill='blue' width={24} height={24} />)
  });
  const iconSvg_Linkedin = L.divIcon({
    className: 'LsvgIcon',
    // eslint-disable-next-line react/jsx-pascal-case 
    html: renderToString(<SvgIcon_linkedin fill='#1e3050' width={24} height={24} />)
  });
  
  const handleMarkerClick = () => {
    window.location.href = 'https://www.linkedin.com/in/burakbaşaran/'; // LinkedIn hesabının URL'si
  };

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

        <Marker position={markerLinkedin} icon={iconSvg_Linkedin} onClick={handleMarkerClick}>
            <Popup>
             Marker
            </Popup>
        </Marker>

        <Marker position={markerCircle} icon={iconSvg_circle}>
            <Popup>
             Marker
            </Popup>
        </Marker>

        <Marker position={markerRect} icon={iconSvg_rect}>
            <Popup>
             Marker
            </Popup>
        </Marker>
      
      </LeafletMap>
      </div>
    );
}

export default MyMap;