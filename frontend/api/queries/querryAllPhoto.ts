import { gql } from "@apollo/client";
import { Double } from "react-native/Libraries/Types/CodegenTypes";

export interface Photo {
    id: string,
    date_photo: Date,
    latitude: Double,
    longitude: Double,
    url_photo: string,
}

export const GET_ALLPHOTO =gql`
query Query {
  photoSkies {
    id
    date_photo
    latitude
    longitude
    url_photo
  }
}
`