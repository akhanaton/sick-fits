/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Head from 'next/head';

import styled from 'styled-components';
import Error from './ErrorMessage';
import { SINGLE_ITEM_LARGE_IMAGE_QUERY } from '../queries/queries';

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 3rem;
  }
`;

class SingleItem extends Component {
  render() {
    const { id } = this.props;
    return (
      <Query
        query={SINGLE_ITEM_LARGE_IMAGE_QUERY}
        variables={{
          id,
        }}
      >
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No item found for id: {id}</p>;
          const { item } = data;
          return (
            <SingleItemStyles>
              <Head>
                <title>Sick fitz | {item.title}</title>
              </Head>
              <img src={item.largeImage} alt={item.description} />
              <div className="details">
                <h2>Viewing {item.title}</h2>
                <p>{item.description}</p>
              </div>
            </SingleItemStyles>
          );
        }}
      </Query>
    );
  }
}

export default SingleItem;
