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
    expect('.right-sidebar-header').toExist();
    expect('.right-sidebar-subheader').toExist();
  })
});
