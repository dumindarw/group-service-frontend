import { InMemoryCache, makeVar } from '@apollo/client';

//https://github.com/apollographql/fullstack-tutorial/blob/master/final/client/src/cache.ts

export const cache: InMemoryCache = new InMemoryCache({
    /*typePolicies: {
        Group: {
            keyFields: ["id"],
        },
    },*/
});