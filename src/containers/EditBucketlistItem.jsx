import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBucketlist, editBucketlist } from '../actions/action_bucketlist';
import UpdateBucketlistForm from './UpdateBucketList';


class EditBucketlistItem extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getBucketlist(id);
  }
  onSubmit(values) {
    const { id } = this.props.match.params;
    const { itemid } = this.props.match.params;
    this.props.editItem(id, itemid, values, () => {
      this.props.history.push(`/${id}`);
    });
  }
  render() {
    const { item } = this.props;
    if (!item) {
      return <div> Loading...</div>;
    }
    const { name } = this.props.item;
    const { description } = this.props.item;
    return (
      <div>
           Edit bucketlist Item
           <UpdateBucketlistForm
             initialValues={{ name, description }}
             onSubmit={this.onSubmit}
             entity="Item"
           />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { item: state.bucketlists[ownProps.match.params.id].items[ownProps.match.params.itemid] };
}

export default connect(mapStateToProps, { getBucketlist, editBucketlist })(EditBucketlistItem);
