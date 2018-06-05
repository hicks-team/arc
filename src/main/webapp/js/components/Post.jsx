import React from 'react';
import $ from "jquery";
import CommentInput from "./CommentInput.jsx";

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
                <Comments commentTree={post.commentTree} />
            </div>
        );
    }
}


class Comments extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state= {
                replyBox: false,
            }
    }

    render()
    {
        const box = this.props.commentTree.map((comment, i) => {

            const replyBox = this.state.replyBox && this.state.replyNumber === i ?
                <div>
                    <textarea placeholder='Enter reply here' id="newComment" />
                    <br/>
                    <button onClick={(e) => this.submitReply(e, comment.id)}>
                        Submit
                    </button>
                </div> :
                '';

            return (
                <div className="box is-small" style={{padding: "2px 2px 2px 10px"}} key={comment.id}>
                    <span>
                        <br/>
                        {comment.author}
                        <br />
                        {comment.id}-{comment.content}
                        <br/>
                    </span>
                    <a onClick={() => this.showReplyBox(i)}>Reply</a>

                    {replyBox}

                    <Comments commentTree={comment.children} />
                </div>
            );
        });

        return (
            <div style={{padding: "2px 2px 2px 10px"}}>
                {box}
            </div>
        );
    }

    showReplyBox(number)
    {
        this.setState({
            replyBox: !this.state.replyBox,
            replyNumber: number,
        })
    }

    submitReply(event, commentId)
    {
        let self = this;
        const reply = $( '#newComment' ).val();
        $.post( '/api/comments/post?parentId=' + commentId + '&content=' + reply,
            function(data)
            {});

        window.location.reload();
    }

}