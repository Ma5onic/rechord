import React, { PureComponent } from "react"
import classNames               from "classnames"
import { Link  }                from "react-router-dom"
import LoginModal               from "./LoginModal"
import * as path                from "../../../utils/path"

export default class Header extends PureComponent {
  constructor() {
    super()
    this.state = { burger: false, modal: false }
  }
  componentWillReceiveProps({ pathname }) {
    if (pathname !== this.props.pathname) {
      this.setState({ burger: false })
    }
  }
  handleToggleBurger = () => this.setState({ burger: !this.state.burger })
  handleToggleModal  = () => this.setState({ modal:  !this.state.modal })
  render() {
    const { burger, modal } = this.state
    const { currentUser: { name, icon } } = this.props
    const userPath = path.user.show(name)
    const burgerClass = classNames("navbar-burger", "burger", { "is-active": burger })
    const navMenuClass = classNames("navbar-menu", { "is-active": burger })

    return (
      <nav className="navbar is-primary" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item title-logo">
              <h1 className="title is-4">
                <span className="icon is-medium">
                  <i className="fa fa-paper-plane" />
                </span>
                <span>rechord</span>
              </h1>
            </Link>
            <div className={burgerClass} onClick={this.handleToggleBurger} role="presentation">
              <span /><span /><span />
            </div>
          </div>

          <div className={navMenuClass}>
            <div className="navbar-start">
              <Link to="/about" className="navbar-item">
                About
              </Link>
              <Link to="/features" className="navbar-item">
                Features
              </Link>
            </div>
            <div className="navbar-end">
              {name ? (
                <Link to={userPath} className="navbar-item current-user">
                  <span>
                    @{name}
                  </span>
                  <img src={icon.url} className="user-icon" width={32} height={32} alt={name} />
                </Link>
              ) : (
                <div className="navbar-item">
                  <div className="field">
                    <div className="control">
                      <a
                        className="button is-primary is-inverted login-button"
                        role="presentation"
                        onClick={this.handleToggleModal}
                      >
                        <span className="icon">
                          <i className="fa fa-sign-in" />
                        </span>
                        <span>login or register</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {!name && <LoginModal active={modal} hideModal={this.handleToggleModal} />}
          </div>
        </div>
      </nav>
    )
  }
}