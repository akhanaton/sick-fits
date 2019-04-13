import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';

import { CART_OPEN_QUERY } from '../queries/queries';

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    // local data
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            const { cartOpen } = cache.readQuery({
              query: CART_OPEN_QUERY,
            });
            const data = {
              data: { cartOpen: !cartOpen },
            };
            console.log(data);
            cache.writeData(data);
            return data;
          },
        },
      },
      defaults: {
        cartOpen: true,
      },
    },
  });
}

export default withApollo(createClient);
