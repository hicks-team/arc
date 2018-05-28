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
                    {post.content}
                    <br />
                </div>
                <br />

                Comments:
                <Comments comments={post.comments} />
            </div>
        );
    }
}

const Comments = ({comments}) => (
    <div style={{padding: "10px"}}>
        {
            comments.map((comment, i) => {
                return (
                    <div className="box is-small" key={comment.id}>
                        {i+1}. {comment.content}
                    </div>
                );
            })
        }
    </div>
);