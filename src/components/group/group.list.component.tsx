import * as React from  'react';
import { useQuery, useLazyQuery } from '@apollo/client';

import { RETREIVE_GROUP_METADATA, RETREIVE_GROUP_LOCATION } from '../../graphql/group.query'
import { Button, Card, CardContent, Grid, List, ListItem, ListItemSecondaryAction, ListItemText} from '@material-ui/core';
import LocationOnSharpIcon from '@material-ui/icons/LocationOnSharp';
import Map from './map.component';

const GroupList: React.FC<any> = (props) =>{

    let isBlackListed = false;

    const [groupLoc, setGroupLocation] = React.useState({});

    const { loading, error, data, refetch } = 
    useQuery(RETREIVE_GROUP_METADATA, {
        variables: { isBlackListed },
    });

    const [fetchLocation, { loading : locationLoading, error: locationError, data: locationData}]  = 
    useLazyQuery(RETREIVE_GROUP_LOCATION, {
        fetchPolicy: "network-only",
        onCompleted:(data)=>{
            console.log("Fetched latest location");
            setGroupLocation(data.groupById.location)
        }
        
    });
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>`Query error! ${error.message}`</div>;

    const getGroupLocation = (groupId : string) => {
        fetchLocation({variables:{id: groupId}})
    }

    return(
        <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
             <Card style={{marginTop: 10}}>
             <CardContent>
                <List >
                    {
                    data.allGroups.map((d: { name: string, id: string, location: any  }) => (
                      
                        <div key={d.id}>
                            <ListItem>
                            <ListItemText
                                primary={d.name} />
                            <ListItemSecondaryAction>
                                <Button onClick={()=>getGroupLocation(d.id)}>
                                    <LocationOnSharpIcon   />
                                </Button>
                            </ListItemSecondaryAction>
                            </ListItem>
                        </div>
                    ))
                    }
                </List>
            </CardContent>
            </Card>
            </Grid>
            <Grid item xs={6} md={6}>
                <Card style={{marginTop: 10}}>
                    <Map groupLocation={groupLoc}/>
                </Card>
            </Grid>
        </Grid>
    )  
}

export default GroupList;