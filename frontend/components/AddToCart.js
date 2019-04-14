import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { ADD_TO_CART_MUTATION } from '../queries/mutations';
import { CURRENT_USER_QUERY } from '../queries/queries';

class AddToCart extends Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={ADD_TO_CART_MUTATION}
        variables={{
          id,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(addToCart, { loading }) => (
          <button type="button" onClick={addToCart} disabled={loading}>
            Add{loading && 'ing'} to Cart 🛒
          </button>
        )}
      </Mutation>
    );
  }
}

export default AddToCart;
