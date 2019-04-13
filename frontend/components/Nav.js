import Link from 'next/link';
import React from 'react';

import { Mutation } from 'react-apollo';
import { TOGGLE_CART_MUTATION } from '../queries/mutations';
import Signout from './Signout';
import ErrorMessage from './ErrorMessage';
import NavStyles from './styles/NavStyles';
import User from './User';

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link href="/items">
          <a>Shop</a>
        </Link>
        {me && (
          <>
            <Link href="/sell">
              <a>Sell</a>
            </Link>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
            <Link href="/me">
              <a>Account</a>
            </Link>
            <Signout />
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {(toggleCart, { error }) => (
                <>
                  <p>
                    <ErrorMessage error={error} />
                  </p>
                  <button type="button" onClick={toggleCart}>
                    My Cart
                  </button>
                </>
              )}
            </Mutation>
          </>
        )}
        {!me && (
          <Link href="/signup">
            <a>Signin</a>
          </Link>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;
