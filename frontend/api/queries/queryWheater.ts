import { gql } from "@apollo/client";
import { Double } from "react-native/Libraries/Types/CodegenTypes";

export interface Weather{
    humidity: Double,
    atmospheric_pressure: Double,
    temperature: Double,
    reading_date: Date
    
}

export const GET_Wheater = gql`
query Query($where: WeatheReadingWhereInput!) {
  weatheReadings(where: $where) {
    humidity
    atmospheric_pressure
    temperature
    reading_date
  }
}
`

/*
{
  "where": {
    "reading_date": {
      "lt": null,
      "gt": null
    }
  }
}
*/