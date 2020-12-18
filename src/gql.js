import { gql } from '@apollo/client';

export const GET_FAMILY_BY_USER_ID = gql`
  query($user_id: uuid = "") {
    families(where: {id: {_eq: $user_id}}) {
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

export const INSERT_FAMILY_MEMBER = gql`
  mutation($family_id: uuid = "", $id: uuid = "", $given_name: String = "") {
    insert_family_members_one(object: {family_id: $family_id, id: $id, given_name: $given_name}) {
      id
      given_name
      family_id
    }
  }
`;

export const UPDATE_FAMILY = gql`
  mutation($user_id: uuid!, $family_name: String = "", $short_bio: String = "", $user_email: String = "") {
    update_families_by_pk(pk_columns: {id: $user_id}, _set: {family_name: $family_name, short_bio: $short_bio, user_email: $user_email}) {
      id
      family_name
      short_bio
      user_email
    }
  }
`;