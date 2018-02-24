import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AddSourceForm from './AddSourceForm'
import DisplaySourceDetail from './../containers/DisplaySourceDetail'
import EditSource from './../containers/EditSource'
import Header from './Header'
import Admin from './../backend/index'
import './../assets/css/main.css'
import Sidebar from './Sidebar'

const App = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Sidebar} />
        <Route exact path='/Admin' component={Admin} />
        <Route path='/resources/add/' component={AddSourceForm} />
        <Route path='/resources/edit/:id' component={EditSource} />
        <Route path='/resources/:id' component={DisplaySourceDetail} />
      </Switch>
    </div>
  </Router>
)

export default App
