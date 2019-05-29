import {connect} from 'react-redux';
import {postsFetchData} from '../actions/index';
import React, {Component} from "react";

import PostStub from "./PostStub.jsx";

class PostsList extends Component {
    componentDidMount()
    {
        this.props.fetchData('/api/posts');
    }

    render()
    {
        if (this.props.hasErrored)
        {
            return <p>Sorry! There was an error loading the posts</p>;
        }
        if (this.props.isLoading)
        {
            return <p>Loading...</p>;
        }
        return (
            <ul>
                {this.props.posts.map((post, index) => (
                    <PostStub post={post} index={index} key={post.id}/>
                ))}
            </ul>
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
(PostsList);