import React from 'react';
import CommentInput from "./CommentInput.jsx";
import Comments from "./Comments.jsx";

export default class Post extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount()
    {
    }

    render() {
        const match = this.props.match;
        const postId = Number(match.params.id);
        const post = this.props.posts.find(post => post.id === postId);

        if (!post)
            return (<div>loading...</div>);

        return (
            <div>
                <div className="box is-small">
                    <span className="is-size-6">{post.title}</span>
                    <br />
                    <span className="is-size-7">{post.author}</span>
                    <br />
                    <span className="is-size-7">{post.content}</span>
                </div>

                <CommentInput postId={post.id} parentCommentId={0} getPosts={this.props.getPosts} />

                Comments:
                <Comments commentTree={post.commentTree} getPosts={this.props.getPosts}/>
            </div>
        );
    }
}