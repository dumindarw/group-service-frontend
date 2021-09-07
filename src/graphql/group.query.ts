import { gql } from '@apollo/client';

export const GEOJSON_LOCATION = gql`
  fragment Location on Group {
    location {
        type
        geometry {
          coordinates
          type
        }
        properties {
          name
        }
    }
  }
`;
export const RETREIVE_GROUP_METADATA = gql`
  query GetGroups($isBlackListed: Boolean) {
    allGroups(isBlackListed: $isBlackListed) {
      id
      name
      createdDate
    }
  }
`;

export const RETREIVE_GROUP_LOCATION = gql`
  ${GEOJSON_LOCATION} 
  query GetGroupById($id: String) {
    groupById(id: $id) {
      ...Location
    }
  }
`;

export const CREATE_GROUP = gql`
  mutation  CreateGroup($name: String, $createdBy: String, $location: GeoJSONInput) {
    addGroup(name: $name, createdBy: $createdBy, location: $location) 
  }
`;