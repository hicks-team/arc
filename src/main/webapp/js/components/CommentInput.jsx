import React, { Component } from "react";
import {postsFetchData} from "../actions";
import connect from "react-redux/es/connect/connect";

class CommentInput extends Component {

    constructor(props) {
        super(props);
        this.submitComment = this.submitComment.bind(this);
    }

    submitComment()
    {
        let self = this;

        const postId = this.props.postId;
        const parentCommentId = this.props.parentCommentId;
        const text = document.getElementById('commentTextarea' + parentCommentId).value;

        if (!text)
        {
            alert('Add comment text.');
            return;
        }

        const data = {postId: postId, parentCommentId: parentCommentId, text: text};

        fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then((response) => {
                if (!response.ok)
                {
                    throw Error(response.statusText);
                }
                self.props.fetchData('/api/posts'); // re-fetch posts data
                document.getElementById('commentTextarea' + parentCommentId).value = "";
            })
            .catch(() => console.log('uh oh'));


        if (this.props.toggleReplyBox) // the top level 'make a comment' input shouldn't be hidden
            this.props.toggleReplyBox();
    }

    render() {
        if (this.props.hasErrored)
        {
            return <p>Sorry! There was an error loading the posts</p>;
        }
        if (this.props.isLoading)
        {
            return <p>Loading...</p>;
        }

        return (
            <div style={{padding: "2px 2px 2px 10px"}}>
                <textarea id={"commentTextarea" + this.props.parentCommentId} className="textarea" placeholder={'add a comment'} />
                <button className="button is-primary" onClick={this.submitComment}>Submit</button>
            </div>
        )
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
(CommentInput);