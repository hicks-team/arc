import React from 'react';
import {Link, NavLink} from "react-router-dom";

export default class Header extends React.Component {
    componentDidMount() {
        // Get all "navbar-burger" elements
        var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {

            // Add a click event on each of them
            $navbarBurgers.forEach(function ($el) {
                $el.addEventListener('click', function () {

                    // Get the target from the "data-target" attribute
                    var target = $el.dataset.target;
                    var $target = document.getElementById(target);

                    // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                    $el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');

                });
            });
        }
    }

    render()
    {
        return (
            <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
                <div className="container">
                    <div className="navbar-brand">
                        <div className="navbar-item">
                            {/*<img src={"/images/arc.png"} alt="Arc" />*/}
                        </div>

                        <button className="button navbar-burger" data-target="navMenu">
                            <span />
                            <span />
                            <span />
                        </button>
                    </div>

                    <div className="navbar-menu" id="navMenu">
                        <div className="navbar-start">
                            <NavLink to='/' className="navbar-item">ARC</NavLink>
                        </div>
                        <div className="navbar-end">
                            <Link to='/logout'  className="navbar-item">
                                <span className="icon is-medium has-text-light">
                                    <i className="fas fa-lg fa-sign-out-alt" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}