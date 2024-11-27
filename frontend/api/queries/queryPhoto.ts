import { gql } from "@apollo/client";
import { Double } from "react-native/Libraries/Types/CodegenTypes";

export interface Photo {
    id: string,
    favorite: boolean,
    latitude: Double,
    longitude: Double,
    url_photo: string,
    date_photo: Date,
}

export const GET_PHOTO =gql`
query Query($where: PhotoSkyWhereInput!) {
  photoSkies(where: $where) {
    id
    favorite
    latitude
    longitude
    url_photo
    date_photo
  }
}
`