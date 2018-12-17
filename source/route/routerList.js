import React,{Component} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import createBrowserHistory from "history/createBrowserHistory";
//import viewIndex from "@@view/index";
//import( /* webpackChunkName: "my-chunk-name" */ "@@view/index")
//const history = createBrowserHistory()
const routes = [
     {
    path: "/sandwiches",
    component:""
  },
]
let test = ()=>{
    return <div>fdafa</div>
}
function RouteWithSubRoutes(route) {
    return (
      <Route
        path={route.path}
        render={props => (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.routes} />
        )}
      />
    );
  }

export default class RouterList extends Component{
    render(){
      
        //import( /* webpackChunkName: "my-chunk-name" */""
        return <Router>
                 <Route path="/demo" exact component={test} />
              </Router>
    }
}