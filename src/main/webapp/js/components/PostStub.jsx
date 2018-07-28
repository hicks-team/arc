import React from 'react';
import {Link} from 'react-router-dom'

export default class PostStub extends React.Component {

    render() {
        const post = this.props.post;
        const i = this.props.i;

        return (
            <div className="box is-small">
                <table>
                    <tr>
                        <td>{i+1}.</td>
                        <td>
                            <p>
                                <span className="is-size-6">{post.title}</span>
                                <br />
                                <span className="is-size-7">{post.author}</span>
                                <br />

                                <Link to={`/posts/${post.id}`}>
                                    <span className="is-size-7">comments: {post.comments}</span>
                                </Link>
                            </p>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}