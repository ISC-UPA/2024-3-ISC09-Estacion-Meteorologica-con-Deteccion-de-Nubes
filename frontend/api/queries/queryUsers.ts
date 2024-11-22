import { gql } from "@apollo/client";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  premiun_sucription:Boolean;
  creation_date: Date;
  end_suscription_date:Date;
  
}

export const GET_USERS = gql`
  query User($where: UserWhereUniqueInput!) {
  user(where: $where) {
    id
    name
    email
    phone
    premiun_sucription
    creation_date
    end_suscription_date
  }
}
`;