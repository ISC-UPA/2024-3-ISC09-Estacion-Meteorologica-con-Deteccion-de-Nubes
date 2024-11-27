import { gql } from "@apollo/client";

export interface Prediction {
    prediction_per_day: string,
    prediction_per_hour: string,
}

export const GET_PREDICTION = gql`
query Query($where: APIPredicionWhereInput!) {
  aPIPredicions(where: $where) {
    prediction_per_day
    prediction_per_hour
  }
}
`
/*
{
  "where": {
    "skyphoto_id": {
      "id": {
        "equals": null
      }
    }
  }
}
*/