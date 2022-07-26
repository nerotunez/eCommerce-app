import { ApolloClient, from, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
const link = from([
  errorLink,
  new HttpLink({ uri: 'http://localhost:4000/' })
])

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})


export const LOAD_CATEGOIES = gql`
query GetCategories {
    categories {
      name
    }
  }
`

export const LOAD_CURRENCIES = gql`
query GetCurrencies {
    currencies {
			label
      symbol
    }
}
`


export const LOAD_PRODUCT = gql`
query getProduct($id: String!) {
  product(id: $id) {
    id
    name
    inStock
    gallery
    description
    category
    attributes {
      id
      name
      type
      items {
        displayValue
        value
        id
      }
    }
    prices{
    currency{
        label
        symbol
    }
    amount
    }
    brand
    }
  },
`


export const LOAD_CATEGORY = gql`
query getCategory($input: CategoryInput) {
  category(input: $input) {
    name
    products {
    id
    name
    inStock
    gallery
    description
    category
    attributes{
      id
      name 
      type
      items {
        displayValue
        value
        id
      }
    }
    prices{
    currency{
      label
      symbol
    }
    amount
    }
    brand
    }
    }
}
`
