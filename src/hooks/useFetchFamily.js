import { useQuery } from "@apollo/client";

import { GET_FAMILY_BY_USER_ID } from "../gql.js";

export default function useFetchFamily({ user_id }) {
  const result = useQuery(GET_FAMILY_BY_USER_ID, {
    fetchPolicy: "cache-and-network",
    variables: { user_id },
  });

  return result;
}

