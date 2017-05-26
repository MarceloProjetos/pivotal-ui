import '../spec_helper';

describe('RightSideBar', () => {
  let subject, tableOfContents;

  beforeEach(() => {
    const RightSideBar = require('../../src/components/RightSideBar');
    tableOfContents = {'header1': ['sub-header1,', 'sub-header2'], 'header2': []};
    subject = ReactDOM.render(<RightSideBar tableOfContents={tableOfContents}/>, root);
  });

  it('can render', () => {
    expect('.right-sidebar').toExist();
  });

  it('renders a table of contents', () => {
    expect($('.right-sidebar-header:eq(0)')).toContainText('header1');
    expect($('.right-sidebar-subheader:eq(0)')).toContainText('sub-header1');
    expect($('.right-sidebar-subheader:eq(1)')).toContainText('sub-header2');
    expect($('.right-sidebar-header:eq(1)')).toHaveText('header2');
  })
});
