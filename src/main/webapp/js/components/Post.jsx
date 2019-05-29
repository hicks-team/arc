import {connect} from 'react-redux';
import {postsFetchData} from '../actions/index';
import React, {Component} from "react";

import CommentInput from "./CommentInput.jsx";
import Comments from "./Comments.jsx";

class Post extends Component {

    componentDidMount()
    {
        this.props.fetchData('/api/posts');
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

        const match = this.props.match;
        const postId = Number(match.params.id);
        const post = this.props.posts.find(post => post.id === postId);

        if (!post)
        {
            return <p>Loading...</p>;
        }

        return (
            <div>
                <div className="box is-small">
                    <span className="is-size-6">{post.title}</span>
                    <br />
                    <span className="is-size-7">{post.author}</span>
                    <br />
                    <span className="is-size-7">{post.content}</span>
                </div>

                <CommentInput postId={post.id} parentCommentId={0} />

                Comments:
                <Comments commentTree={post.commentTree} />
            </div>
        );
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
(Post);