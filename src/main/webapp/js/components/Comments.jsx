import React, { Component } from "react";
import Comment from "./Comment.jsx";

export default class Comments extends Component {
    render()
    {
        const box = this.props.commentTree.map((comment) => {

            return (
                <Comment comment={comment} key={comment.id} />
            );
        });

        return (
            <div style={{padding: "2px 2px 2px 10px"}}>
                {box}
            </div>
        );
    }
}
