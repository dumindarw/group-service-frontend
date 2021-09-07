import * as React from  'react';
import { useMutation } from '@apollo/client';

import {CREATE_GROUP, RETREIVE_GROUP_METADATA} from '../../graphql/group.query'
import { Button, TextField } from '@material-ui/core';

interface ICoordinates {
    longitude: number;
    latitude: number;
}

export const GroupCreate : React.FC<ICoordinates>  = (props) => {
    
    const [addGroup, {data, loading, error}] = useMutation(CREATE_GROUP, {
        onCompleted: ()=>{  console.log("Group creation completed !")},
        refetchQueries: [{ query: RETREIVE_GROUP_METADATA, variables: { isBlackListed: false } }],
    });

    const [groupName, setGroupName] = React.useState('');

    if (loading) return <div>Creating Group...</div>;
    if (error) return <div>`Group create error! ${error.message}`</div>;

    const geojson = {
        "type":"Feature",
        "geometry":
            {"type":"Point","coordinates":[props.longitude, props.latitude]},
        "properties":
            {"name":"Group Location"}
        };

    const handleChange = (event: any) => {
        setGroupName(event.target.value);
    }

    return(
        <div>
            <form  onSubmit={e=> {
                e.preventDefault();
                addGroup({variables: {name: groupName, createdBy: 'Rajitha', location: geojson}});
                setGroupName('');
            }}>
          
            <TextField style={{ marginRight: 8 }} onChange={handleChange} size="small" id="standard-size-small" label="Group Name" value={groupName}  variant="outlined" />  
            <Button type="submit" variant="outlined">
                Add Group
            </Button>
            </form>
        </div>
    )  
}

