import React from 'react';
import {Route, Router, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import $ from "jquery";

import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import MyHelmet from "./MyHelmet.jsx";
import PostStub from "./PostStub.jsx";
import Post from "./Post.jsx";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        let self = this;

        // const basename = '/arc/view/';
        const basename = '/';
        const history = createBrowserHistory({ basename });
        self.state = {history: history};
        self.state.posts = [];
    }

    componentDidMount()
    {
        let self = this;
        $.ajax({
            url: '/posts',
            async: false,
            success: function (data) {
                self.setState({posts: JSON.parse(data)});
            }
        });
    }
    
    render() {
        const posts = this.state.posts;

        return (
            <Router history={this.state.history}>
                <div>
                    <MyHelmet />
                    <Header />

                    <div style={{padding: "10px"}}>
                        <Switch>
                            <Route exact path='/' render={() => <Posts posts={posts} />}/>
                            <Route exact path='/posts/:id' render={(props) => <Post {...props} posts={posts} />}/>
                        </Switch>
                    </div>

                    <Footer serverProcessingTime="123"/>
                </div>
            </Router>
        );
    }
}

const Posts = ({posts}) => (
    posts.map((post, i) => {
        return (
            <PostStub post={post} i={i} key={post.id} />
        );
    })
);