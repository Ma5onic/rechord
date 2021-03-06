import React, { PureComponent } from "react"
import { Link }                 from "react-router-dom"
import classNames               from "classnames"
import * as path                from "../../../../utils/path"

export default class TabItems extends PureComponent {
  render () {
    const { currentUser, currentPath, handleToggleModal } = this.props
    const isActive = (targetPath) => {
      if (targetPath === currentPath) return true
      switch (true) {
        case (/^\/(scores|[a-zA-Z0-9-_]{11}).*/).test(currentPath):
          return targetPath === path.score.index()
        case (/^\/users.*/).test(currentPath):
          return currentPath !== path.user.show(currentUser.name) && targetPath === path.user.index()
        default: return false
      }
    }
    const tabItemBase = (label, icon) => (
      <div>
        <span className="icon">
          <i className={classNames("fa", `fa-${icon}`)} />
        </span>
        <span className="tab-label">
          {label}
        </span>
      </div>
    )
    const tabItemComponent = ({ label, icon, targetPath, onClick }) => (
      <li
        className={classNames({ "is-active": isActive(targetPath) })}
        key={label}
      >
        {onClick ? (
          <a onClick={onClick}>{tabItemBase(label, icon)}</a>
        ) : (
          <Link to={targetPath}>{tabItemBase(label, icon)}</Link>
        )}
      </li>
    )
    const tabItems = [
      { label: "New Score", icon: "file-o",  targetPath: path.root },
      { label: "Scores",    icon: "files-o", targetPath: path.score.index() },
      { label: "Users",     icon: "users",   targetPath: path.user.index() },
      {
        label:      "My Page",
        icon:       "user-circle-o",
        targetPath: path.user.show(currentUser.name),
        onClick:    !currentUser.name && handleToggleModal
      },
      {
        label:      "My Fav",
        icon:       "heart",
        targetPath: path.fav.index(),
        onClick:    !currentUser.name && handleToggleModal
      }
    ]
    return (
      <ul>
        {tabItems.map(item => tabItemComponent(item))}
      </ul>
    )
  }
}
