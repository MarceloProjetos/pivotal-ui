import React from 'react';
import PropTypes from 'prop-types';

export default class RightSideBar extends React.PureComponent{

  static propTypes = {
    tableOfContents: PropTypes.object
  };

  assembleSubheaders(tableOfContents, header) {
    let result = [];
    tableOfContents[header].forEach((subheader) => {
      result.push(<ul><li className="right-sidebar-subheader">{subheader}</li></ul>)
    })

    return result;
  }

  render() {
    const { tableOfContents } = this.props;
    const headers = [];
    Object.keys(tableOfContents).map((header) => {
      headers.push(<li className="right-sidebar-header">{header}{this.assembleSubheaders(tableOfContents, header)}</li>)
    });
    return <ul className="right-sidebar">{headers}</ul>;
  }
};