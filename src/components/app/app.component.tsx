import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import groupClient from '../../common/apollo-group-client';

import Group from '../group/group.component'
import { Container } from '@material-ui/core';

const App: React.FC = () =>{
    return(
        <ApolloProvider client={groupClient}>
            <Container fixed>
                <Group/>
            </Container>
        </ApolloProvider>
    )
}

export default App;