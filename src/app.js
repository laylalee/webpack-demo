import React from "react";
import ReactDOM from "react-dom";
import "./css/common.css";
import {
    Link,
    Router,
    Route,
    browserHistory, // 使用时，将Router的history的值修改为browserHistory即可
    useRouterHistory
} from 'react-router';
import { createHashHistory } from "history";
import Contact from './Contact';
import Courses from './Courses';
const history = useRouterHistory(createHashHistory)({ queryKey: false });

const app = document.querySelector('#app');

class Nav extends React.Component{
    render() {
        return(
            <div className='container'>
                <ul className='nav'>
                    <li>
                        <Link to="/courses">Courses</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>             
                </ul> 
            </div>
         
        )
    }
}
class linkDemo extends React.Component{
    render(){
        return(
            <div>
                <Nav />
                {this.props.children}
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className="container">
            <Router history={history}>
            <Route path="/" component={linkDemo}>
                <Route path="contact" component={Contact} />
                <Route path="courses" component={Courses} />
             </Route>
           </Router>

        </div>)
    }
}

const renderDom = () => {
    ReactDOM.render(<App />, app)
}
renderDom();
if (module.hot) {
    module.hot.accept([], () => {
        renderDom()
    });
}