import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { adopt } from 'react-adopt';

import { CART_OPEN_QUERY } from '../queries/queries';
import { TOGGLE_CART_MUTATION } from '../queries/mutations';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';
import User from './User';
import CartItem from './CartItem';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';

const Composed = adopt({
  user: <User />,
  toggleCart: <Mutation mutation={TOGGLE_CART_MUTATION} />,
  localState: <Query query={CART_OPEN_QUERY} />,
});

const Cart = () => (
  <Composed>
    {({ user, toggleCart, localState }) => {
      const { me } = user.data;
      if (!me) return null;
      return (
        <CartStyles open={localState.data.cartOpen}>
          <header>
            <CloseButton onClick={toggleCart} title="close">
              &times;
            </CloseButton>
            <Supreme>{me.name} Cart</Supreme>
            <p>
              You have {me.cart.length} item
              {me.cart.length > 1 ? 's' : ''} in your cart
            </p>
          </header>
          <ul>
            {me.cart.map(cartItem => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))}
          </ul>
          <footer>
            <p>{formatMoney(calcTotalPrice(me.cart))}</p>
            <SickButton>Checkout</SickButton>
          </footer>
        </CartStyles>
      );
    }}
  </Composed>
);

export default Cart;
