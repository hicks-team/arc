import React from 'react';

export default class Post extends React.Component {

    constructor(props) {
        super(props);
        let self = this;

        const match = this.props.match;
        const postId = Number(match.params.id);

        this.state = {};
        this.state.post = this.props.posts.find(post => post.id === postId)
    }

    componentDidMount()
    {
    }

    render() {
        const post = this.state.post;

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

                Comments:
                <Comments commentTree={post.commentTree} />
            </div>
        );
    }
}

const Comments = ({commentTree}) => (
    <div style={{padding: "2px 2px 2px 10px"}}>
        {
            commentTree.map((comment, i) => {
                return (
                    <div className="box is-small" style={{padding: "2px 2px 2px 10px"}} key={comment.id}>
                        {comment.id}
                        <br/>
                        {comment.author}
                        <br />
                        {comment.content}

                        <Comments commentTree={comment.children} />
                    </div>
                );
            })
        }
    </div>
);