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


class Comments extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state= {
                commentTree: props.commentTree,
                replyBox: false,
            }
    }

    render()
    {
        const box = this.state.commentTree.map((comment, i) => {

            const replyBox = this.state.replyBox && this.state.replyNumber === i ?
                <div>
                <textarea defaultValue='Enter reply here'>
                </textarea>
                    <br/>
                    <button onClick={() => console.log('hi')}>
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
        })


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