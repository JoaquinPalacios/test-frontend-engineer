import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($offset: Int!, $limit: Int!) {
    products @rest(type: "Products", path: "products") {
      id
      title
      price
      description
      category
      image
      rating {
        rate
        count
      }
    }
  }
`;