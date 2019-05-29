import React, {Component} from "react";
import {postsFetchData} from "../actions";
import connect from "react-redux/es/connect/connect";
import CommentInput from "./CommentInput.jsx";
import Comments from "./Comments.jsx";

class Comment extends Component {
    constructor(props)
    {
        super(props);
        this.deleteComment = this.deleteComment.bind(this);
        this.toggleReplyBox = this.toggleReplyBox.bind(this);
        this.state = {
            replyBox: false,
        }
    }

    render()
    {
        const comment = this.props.comment;

        const replyBox = this.state.replyBox ?
            <CommentInput postId={comment.postId} parentCommentId={comment.id} toggleReplyBox={this.toggleReplyBox} /> :
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
                <span style={{fontSize: '11px'}}>
                    <a onClick={() => this.toggleReplyBox()}>Reply</a>
                    &nbsp;&nbsp;
                    <a onClick={() => this.deleteComment()}>Delete</a>
                </span>

                {replyBox}

                <Comments commentTree={comment.children} />
            </div>
        );
    }

    deleteComment()
    {
        let self = this;

        fetch('/api/comments/' + self.props.comment.id, {
            method: 'DELETE'
        })
            .then((response) => {
                if (!response.ok)
                {
                    throw Error(response.statusText);
                }
                self.props.fetchData('/api/posts'); // re-fetch posts data
                return response;
            })
            .then((response) => {response.json().then(value => console.log(value))})
            .catch((error) => console.log(error));
    }

    toggleReplyBox()
    {
        this.setState({
            replyBox: !this.state.replyBox
        })
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        hasErrored: state.postsHasErrored,
        isLoading: state.postsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(postsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)
(Comment);