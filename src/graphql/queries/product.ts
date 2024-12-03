import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) @rest(
      type: "Product"
      path: "products/{args.id}"
    ) {
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