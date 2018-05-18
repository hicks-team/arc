import React from 'react';
import {Link, NavLink} from "react-router-dom";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faServer from '@fortawesome/fontawesome-free-solid/faServer'

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
        const isAdmin = this.props.isAdmin;

        return (
            <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
                <div className="container">
                    <div className="navbar-brand">
                        <div className="navbar-item">
                            <img src={"/loon/images/loon.png"} alt="Loon" />
                        </div>

                        <button className="button navbar-burger" data-target="navMenu">
                            <span />
                            <span />
                            <span />
                        </button>
                    </div>

                    <div className="navbar-menu" id="navMenu">
                        <div className="navbar-start">
                            <NavLink to='/library' activeClassName='is-active' className="navbar-item">Library</NavLink>
                            <NavLink to='/playlists' activeClassName='is-active' className="navbar-item">Playlists</NavLink>

                            {
                                isAdmin &&
                                <div className={"navbar-item has-dropdown is-hoverable"}>
                                    <NavLink to='/admin' activeClassName='is-active' className="navbar-link">Admin</NavLink>
                                    <div className="navbar-dropdown">
                                        <NavLink to={'/admin/systemSettings'} activeClassName='is-active' className="navbar-item">
                                            <span className="icon is-medium has-text-info">
                                                <FontAwesomeIcon icon={faServer}/>
                                            </span>
                                            Manage System
                                        </NavLink>
                                    </div>
                                </div>
                            }
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