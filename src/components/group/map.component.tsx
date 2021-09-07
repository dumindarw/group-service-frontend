import { useLazyQuery, useQuery } from '@apollo/client';
import * as React from  'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import * as L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import '../../resources/map.css'
import { LatLngExpression } from 'leaflet';

interface IMapProps {
  groupLocation: any;
}

const Map: React.FC<IMapProps> = (props) =>{

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const [coordinates, setCoordinates] : [LatLngExpression, any] = React.useState([7.4918, 80.3627]);

React.useEffect(() => { 
  if(props.groupLocation.geometry){
    let [long, lat] = props.groupLocation.geometry.coordinates;
    setCoordinates([lat, long]);
  }
},[props.groupLocation])

return(<MapContainer center={coordinates} zoom={10} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={coordinates} autoPan={true} >
      <Popup>
        Group Location
      </Popup>
    </Marker>
  </MapContainer>
);

}

export default Map;