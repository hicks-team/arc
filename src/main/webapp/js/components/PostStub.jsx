import React from 'react';
import {Link} from 'react-router-dom'

export default class PostStub extends React.Component {

    render() {
        const post = this.props.post;
        const i = this.props.i;

        return (
            <div className="box is-small">
                <p>
                    {i+1}. {post.title}
                    <br />
                    {post.author}
                    <br />

                    <Link to={`/posts/${post.id}`}>
                        comments: {post.comments.length}
                    </Link>
                </p>
            </div>
        );
    }
}