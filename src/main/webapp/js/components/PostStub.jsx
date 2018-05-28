import React from 'react';
import {Route, Router, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'

export default class PostStub extends React.Component {

    constructor(props) {
        super(props);
        let self = this;
    }

    componentDidMount()
    {
    }

    render() {
        const post = this.props.post;
        const i = this.props.i;

        return (
            <div className="box is-small">
                <article className="media">
                    <div className="media-content">
                        <div className="content">
                            <p>
                                {i+1}. {post.title}
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
    }
}