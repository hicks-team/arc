import React from "react";
import CommentInput from "./CommentInput.jsx";

export default class Comments extends React.Component
{
    render()
    {
        const box = this.props.commentTree.map((comment) => {

            return (
                <Comment comment={comment} key={comment.id} getPosts={this.props.getPosts} />
            );
        });

        return (
            <div style={{padding: "2px 2px 2px 10px"}}>
                {box}
            </div>
        );
    }
}

class Comment extends React.Component{
    constructor(props)
    {
        super(props);
        this.toggleReplyBox = this.toggleReplyBox.bind(this);
        this.state = {
            replyBox: false,
        }
    }

    render()
    {
        const comment = this.props.comment;

        const replyBox = this.state.replyBox ?
            <CommentInput postId={comment.postId} parentCommentId={comment.id} getPosts={this.props.getPosts} toggleReplyBox={this.toggleReplyBox} /> :
            '';

        return (
            <div className="box is-small" style={{padding: "2px 2px 2px 10px"}} key={comment.id}>
                    <span>

                        <span style={{fontSize: '11px'}}>{comment.author}</span>
                        <br />
                        <span title={'id: ' + comment.id}>
                            {comment.content}
                        </span>
                        <br/>
                    </span>
                <span style={{fontSize: '11px'}}><a onClick={() => this.toggleReplyBox()}>Reply</a></span>

                {replyBox}

                <Comments commentTree={comment.children} getPosts={this.props.getPosts}/>
            </div>
        );
    }

    toggleReplyBox()
    {
        this.setState({
            replyBox: !this.state.replyBox
        })
    }
}