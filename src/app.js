import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import "./css/common.css";
import {
    Link,
    Router,
    Route,
    browserHistory, // 使用时，将Router的history的值修改为browserHistory即可
    useRouterHistory
} from 'react-router/lib';
import { createHashHistory } from "history/lib";

import Contact from './Contact';
import Courses from './Courses';
import CommentApp from './example/react-redux/containers/CommentApp';
import commentsReducer from './example/react-redux/reducers/comments'
const history = useRouterHistory(createHashHistory)({ queryKey: false });

const app = document.querySelector('#app');
const store = createStore(commentsReducer);
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
           <Provider store={store}>
           <CommentApp />
            </Provider>
          
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