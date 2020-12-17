import { gql } from '@apollo/client';

export const GET_FAMILY_BY_USER_ID = gql`
  query($user_id: uuid = "") {
    families(where: {user_id: {_eq: $user_id}}) {
      family_members {
        given_name
        id
      }
      family_name
      family_nickname
      id
      short_bio
      timeline {
        timeline_items {
          card_detailed_text
          card_subtitle
          card_title
          id
          media_src
          media_type
          title
        }
        id
      }
    }
  }
`;