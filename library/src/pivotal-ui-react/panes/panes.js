import React from 'react';
import PropTypes from 'prop-types';
import {mergeProps} from 'pui-react-helpers';
import 'pui-css-panes';

export class BasePane extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    innerClassName: PropTypes.string
  }

  render() {
    const {innerClassName, children, ...other} = this.props;
    const outerProps = mergeProps(other, {className: 'pane'});
    const innerProps = mergeProps({className: innerClassName}, {className: 'container'});

    return (<div {...outerProps} >
      <div {...innerProps}>{children}</div>
    </div>);
  }
}

export class Pane extends React.Component {
  static propTypes = {
    className: PropTypes.string
  }

  render() {
    const {className, ...other} = this.props;
    return <BasePane {...other} className={className}/>;
  }
}
