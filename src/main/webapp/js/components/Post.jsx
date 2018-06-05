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
                    {post.title}
                    <br />
                    {post.author}
                    <br />
                    {post.content}
                    <br />
                </div>
                <br />

                <CommentInput postId={post.id} getPosts={this.props.getPosts} />

                Comments:
                <Comments commentTree={post.commentTree} getPosts={this.props.getPosts}/>
            </div>
        );
    }
}