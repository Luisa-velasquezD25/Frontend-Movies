import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Header } from './components/ui/Header'
import {DirectorView} from './components/director/DirectorView'
import {GenderView} from './components/gender/GenderView'
import {MediasView} from './components/medias/MediasView'
import {ProducerView} from './components/producer/ProducerView'
import {TypeView} from './components/type/TypeView'
import { MediaUpdate } from "./components/medias/MediaUpdate";

function App() {
  return     <Router>
  <Header/>
    <Switch>
      <Route exact path= '/' component={MediasView} />
      <Route exact path='/director' component={DirectorView} />
      <Route exact path= '/gender' component={GenderView} />
      <Route exact path= '/producer' component={ProducerView} />
      <Route exact path= '/type' component={TypeView} />
      <Route exact path= '/medias/edit/:mediaId' component={ MediaUpdate } /> 
      <Redirect to='/' />
    </Switch>
</Router>
}

export default App;
