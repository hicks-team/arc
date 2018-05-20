import React from 'react';
import {Route, Router, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import $ from "jquery";

import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import MyHelmet from "./MyHelmet.jsx";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        let self = this;

        // const basename = '/arc/view/';
        const basename = '/';
        const history = createBrowserHistory({ basename });
        self.state = {history: history};
        self.state.posts = "";
    }

    componentDidMount()
    {
        let self = this;
        $.get('/posts', '', function (data) {
            self.setState({posts: data});
        });
    }
    
    render() {
        return (
            <Router history={this.state.history}>
                <div>
                    <MyHelmet />
                    <Header />
                    <div>{this.state.posts}</div>
                    {/*<Route exact path='/admin/systemSettings' render={() => <SystemSettings onThemeChange={this.handleThemeChange} />}/>*/}


                    <Footer serverProcessingTime="123"/>
                </div>
            </Router>
        );
    }
}