import React from 'react';

export default class Footer extends React.Component {
    render()
    {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="content has-text-centered">
                        {/*<p>Rendered in {this.props.serverProcessingTime} ms.</p>*/}
                        <p>
                            <strong>Arc</strong> by <a href="https://google.com">Hicks Team</a>. The source code is licensed
                            <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>.
                        </p>
                    </div>
                </div>
            </footer>
        );
    }
}