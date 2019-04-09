/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/head';
import { Query } from 'react-apollo';
import Link from 'next/link';

import { PAGINATION_QUERY } from '../queries/queries';
import { perPage } from '../config';
import PaginationStyles from './styles/PaginationStyles';

const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      const { count } = data.itemsConnection.aggregate;
      const pages = Math.ceil(count / perPage);
      const { page } = props;
      return (
        <PaginationStyles>
          <Head>
            <title>
              Sick fitz — page {page} of {pages}
            </title>
          </Head>
          <Link
            prefetch
            href={{
              pathname: '/items',
              query: { page: page - 1 },
            }}
          >
            <a className="prev" aria-disabled={page <= 1}>
              ← prev
            </a>
          </Link>
          <p>{count} items total</p>
          <Link
            prefetch
            href={{
              pathname: '/items',
              query: { page: page + 1 },
            }}
          >
            <a className="next" aria-disabled={page >= pages}>
              next →
            </a>
          </Link>
        </PaginationStyles>
      );
    }}
  </Query>
);

export default Pagination;
