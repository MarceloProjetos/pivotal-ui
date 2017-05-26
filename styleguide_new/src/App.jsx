import React from 'react'
import ReactDOM from 'react-dom'

import 'pui-css-all'
import '../stylesheets/app.scss'

import SideBar from './components/Sidebar'
import RightSideBar from './components/RightSideBar'
import Content from './components/Content'
import routes, {attachPackagesToWindow} from './helpers/content'

attachPackagesToWindow()

class App extends React.Component {
  constructor(props) {
    super(props)

    const path = window.location.pathname
    this.state = {content: App.currentContent(path), path: path}
  }

  updateContent(href) {
    window.history.pushState({}, '', href)

    const path = window.location.pathname
    this.setState({content: App.currentContent(path), path: path})
  }

  static currentContent(path) {
    return routes[path] ? routes[path] : routes['/404']
  }

  render() {
    const sidebarData = this.state.content.sidebar || {}
    return <div id="app">
      <SideBar updateContent={this.updateContent.bind(this)} activePath={this.state.path}/>
      <Content content={this.state.content}/>
      <RightSideBar tableOfContents={sidebarData} />
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('root'))