import * as React from "react";

import { GroupCreate } from './group.create.component';
import GroupList from './group.list.component';

const Group: React.FC = () =>{

    const [lat, setLat] = React.useState(0);
    const [lng, setLng] = React.useState(0);

    window.navigator.geolocation.getCurrentPosition(
        (pos)=>{ 
            setLat(pos.coords.latitude ? pos.coords.latitude : 7.4918); 
            setLng(pos.coords.longitude ? pos.coords.latitude : 80.3627);
        }, console.log);

    return(
        <div>
            <GroupCreate longitude={lng} latitude={lat} />
            <GroupList />
        </div>
    )
}

export default Group;