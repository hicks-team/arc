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
        const postsDiv = this.state.posts.map((post, i) => {
            return (
                <div className="box is-small">
                    <article className="media">
                        <div className="media-content">
                            <div className="content">
                                <p>
                                    {post.title}
                                    <br />
                                    {post.author}
                                    <br />
                                    comments: {post.comments.length}
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            );
        });

        return (
            <Router history={this.state.history}>
                <div>
                    <MyHelmet />
                    <Header />
                    <div style={{padding: "10px"}}>
                        {postsDiv}
                    </div>
                    {/*<Route exact path='/admin/systemSettings' render={() => <SystemSettings onThemeChange={this.handleThemeChange} />}/>*/}


                    <Footer serverProcessingTime="123"/>
                </div>
            </Router>
        );
    }
}