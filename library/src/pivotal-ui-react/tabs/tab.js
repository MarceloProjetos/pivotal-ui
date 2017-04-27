import React from 'react';

import PropTypes from 'prop-types';

const types = PropTypes;

export class Tab extends React.Component {
  static propTypes = {
    'aria-labelledby': types.string,
    className: types.string,
    disabled: types.bool,
    eventKey: types.any,
    onEntered: types.func,
    onExited: types.func,
    tabClassName: types.string,
    title: types.node.isRequired
  }

  static defaultProps = {
    onEntered() {},
    onExited() {}
  }

  render() {
    return null;
  }
}
