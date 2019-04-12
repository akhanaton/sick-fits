/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { DELETE_ITEM_MUTATION } from '../queries/mutations';
import { ALL_ITEMS_QUERY } from '../queries/queries';

class DeleteItem extends Component {
  update = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  handleDelete = deleteItem => event => {
    if (confirm('Are you sure you want to delete this?')) {
      deleteItem().catch(err => {
        alert(err.message);
      });
    }
  };

  render() {
    const { id, text } = this.props;
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{
          id,
        }}
        update={this.update}
      >
        {(deleteItem, { error }) => (
          <button type="button" onClick={this.handleDelete(deleteItem)}>
            {text}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteItem;
