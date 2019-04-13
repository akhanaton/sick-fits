import React from 'react';
import { Query, Mutation } from 'react-apollo';

import { CART_OPEN_QUERY } from '../queries/queries';
import { TOGGLE_CART_MUTATION } from '../queries/mutations';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';

const Cart = () => (
  <Mutation mutation={TOGGLE_CART_MUTATION}>
    {toggleCart => (
      <Query query={CART_OPEN_QUERY}>
        {({ data }) => (
          <CartStyles open={data.cartOpen}>
            <header>
              <CloseButton onClick={toggleCart} title="close">
                &times;
              </CloseButton>
              <Supreme>Your Cart</Supreme>
              <p>You have __ items in your cart</p>
            </header>

            <footer>
              <p>$10.20</p>
              <SickButton>Checkout</SickButton>
            </footer>
          </CartStyles>
        )}
      </Query>
    )}
  </Mutation>
);

export default Cart;
