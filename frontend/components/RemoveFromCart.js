import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';
import { REMOVE_FROM_CART_MUTATION } from '../queries/mutations';
import { CURRENT_USER_QUERY } from '../queries/queries';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

class RemoveFromCart extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  update = (cache, payload) => {
    console.log('Running remove from cart update function.');
    const data = cache.readQuery({
      query: CURRENT_USER_QUERY,
    });
    const cartItemId = payload.data.removeItem.id;
    data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };

  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={REMOVE_FROM_CART_MUTATION}
        variables={{
          id,
        }}
        update={this.update}
        optimisticResponse={{
          __typename: 'Mutation',
          removeItem: {
            __typename: 'CartItem',
            id,
          },
        }}
      >
        {(removeFromCart, { loading, error }) => (
          <>
            <ErrorMessage error={error} />
            <BigButton
              disabled={loading}
              onClick={() => {
                removeFromCart().catch(err => console.log(err.message));
              }}
              title="Delete Item"
            >
              &times;
            </BigButton>
          </>
        )}
      </Mutation>
    );
  }
}

export default RemoveFromCart;
