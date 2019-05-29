import React from 'react';
import {Route, Router, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'

import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import MyHelmet from "./MyHelmet.jsx";
import PostsList from "./PostsList.jsx";
import Post from "./Post.jsx";

export default class App extends React.Component {

    constructor(props) {
        super(props);

        // const basename = '/arc/view/';
        const basename = '/';
        this.state = {
            history: createBrowserHistory({ basename }),
            posts: []
        };
    }
    
    render() {
        return (
            <Router history={this.state.history}>
                <div>
                    <MyHelmet />
                    <Header />

                    <div style={{padding: "10px"}}>
                        <Switch>
                            <Route exact path='/' render={() =>
                                <PostsList />
                            }/>
                            <Route exact path='/posts/:id' render={(props) =>
                                <Post {...props} />
                            }/>
                        </Switch>
                    </div>

                    <Footer serverProcessingTime="123"/>
                </div>
            </Router>
        );
    }
}
