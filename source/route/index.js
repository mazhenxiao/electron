import React,{Component} from "react";
import ReactDom from "react-dom";
import RouterList from "@@route/routerList";

 class Routers extends Component{
     constructor(props){
         super(props)
     }
     render(){
        return <section>
            <RouterList></RouterList>
        </section>
    }
}

ReactDom.render(<Routers />,document.querySelector("#Routers"))