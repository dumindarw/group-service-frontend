import { ApolloClient , HttpLink  } from '@apollo/client';

import { cache } from './cache';

const httpLink = new HttpLink({
    uri: "http://localhost:8088/graphql",
    /*credentials: 'same-origin',
    fetchOptions:{
        mode: 'no-cors',
    }*/
  });


const groupClient = new ApolloClient({
    link: httpLink,
    cache: cache,
    credentials: 'include'
});

export default groupClient;