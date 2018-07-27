import React from "react";
import CommentInput from "./CommentInput.jsx";

export default class Comments extends React.Component
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
                <CommentInput postId={comment.postId} parentCommentId={comment.id} getPosts={this.props.getPosts}/> :
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
                    <span style={{fontSize: '11px'}}><a onClick={() => this.showReplyBox(i)}>Reply</a></span>

                    {replyBox}

                    <Comments commentTree={comment.children} getPosts={this.props.getPosts}/>
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
}