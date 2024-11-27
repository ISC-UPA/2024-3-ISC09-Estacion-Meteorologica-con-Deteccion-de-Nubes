import { gql } from "@apollo/client";
import { Double } from "react-native/Libraries/Types/CodegenTypes";

export interface IA{
    probability_rain: Double,
    sky_type: string,
}

export const GET_IA = gql`
query Query {
  analysisPhotos {
    probability_rain
    sky_type
    skyphoto_id {
      url_photo
    }
  }
}
`