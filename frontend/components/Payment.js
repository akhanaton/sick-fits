/* eslint-disable react/prop-types */
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import { CURRENT_USER_QUERY } from '../queries/queries';
import calcTotalPrice from '../lib/calcTotalPrice';
import { CREATE_ORDER_MUTATION } from '../queries/mutations';
import User from './User';

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

class Payment extends React.Component {
  onTokenReceive = async (res, createOrder) => {
    NProgress.start();

    const order = await createOrder({
      variables: {
        token: res.id,
      },
    }).catch(err => {
      alert(err.message);
    });

    Router.push({
      pathname: '/order',
      query: { id: order.data.createOrder.id },
    });
  };

  render() {
    const { children } = this.props;
    return (
      <User>
        {({ data: { me } }) => (
          <Mutation
            mutation={CREATE_ORDER_MUTATION}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          >
            {createOrder => (
              <StripeCheckout
                amount={calcTotalPrice(me.cart)}
                name="Sick fits"
                description={`Order of ${totalItems(me.cart)} items.`}
                image={
                  me.cart.length && me.cart[0].item && me.cart[0].item.image
                }
                stripeKey="pk_test_kVbY2NQ3ssFnIahw3al8GZmw00b3zCbktt"
                currency="USD"
                email={me.email}
                token={response => this.onTokenReceive(response, createOrder)}
              >
                {children}
              </StripeCheckout>
            )}
          </Mutation>
        )}
      </User>
    );
  }
}

export default Payment;
