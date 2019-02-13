import { number, string } from 'prop-types';
import { connect } from 'react-redux';
import { inflectTerm } from '../../utils';
import { withRouter } from 'react-router';
import React, { Component } from 'react';

class ListInfo extends Component {
  static propTypes = {
    count: number,
    currentSort: string,
    currentTerm: string
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.count !== nextProps.count;
  }

  getListInfo = () => {
    const { count, currentTerm: term, currentSort: sort } = this.props;
    let label = ` ${inflectTerm({ count, term: 'articles' })} found for`;
    let sorted = sort !== '' ? ` sorted by ${sort}` : '';

    return (
      <div className="list-info" role="log">
        <span>{count}</span>{label}<span> {term}</span>{sorted}
      </div>
    );
  }

  render() {
    return this.getListInfo();
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentSort: state.currentSort ? state.currentSort : '',
  currentTerm: state.currentTerm ? state.currentTerm : ''
});

export default withRouter(connect(mapStateToProps)(ListInfo));
