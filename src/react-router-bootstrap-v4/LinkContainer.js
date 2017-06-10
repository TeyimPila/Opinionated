import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types'

function isLeftClickEvent(event) {
  return event.button === 0
}

function isModifiedEvent(event) {
  return !!(
    event.metaKey ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey
  )
}

function createLocationDescriptor(to, query, hash, state) {
  if (query || hash || state) {
    return { pathname: to, query, hash, state }
  }

  return to
}

// This is my wonderful mashup of <NavLink> from react-router and <LinkContainer> from react-router-bootstrap,
// but one that supports react-router@4.0.0
export class LinkContainer extends Component {
  static propTypes = {
    exact: PropTypes.bool,
    strict: PropTypes.bool,
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
    query: PropTypes.string,
    hash: PropTypes.string,
    state: PropTypes.object,
    action: PropTypes.oneOf([
      'push',
      'replace',
    ]).isRequired,
    onClick: PropTypes.func,
    active: PropTypes.bool,
    isActive: PropTypes.func,
    target: PropTypes.string,
    children: PropTypes.node.isRequired,
  }

    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.shape({
                push: PropTypes.func.isRequired,
                replace: PropTypes.func.isRequired,
                createHref: PropTypes.func.isRequired,
            }).isRequired,
        }).isRequired,
    }

  static defaultProps = {
    exact: false,
    action: 'push',
  }

  onClick = (event) => {
    const {
      to, query, hash, state, children, onClick, target, action,
    } = this.props

    if (children.props.onClick) {
      children.props.onClick(event)
    }

    if (onClick) {
      onClick(event)
    }

    if (
      target ||
      event.defaultPrevented ||
      isModifiedEvent(event) ||
      !isLeftClickEvent(event)
    ) {
      return
    }

    event.preventDefault()

      this.context.router.history[action](
      createLocationDescriptor(to, query, hash, state)
    )
  }

  render() {
    const {
      to, children, exact, strict,
      isActive: getIsActive,
      ...props
    } = this.props

    props.onClick = this.onClick

      props.href = this.context.router.history.createHref(
      typeof to === 'string' ? { pathname: to } : to
    )

    return (
      <Route
        path={typeof to === 'object' ? to.pathname : to}
        exact={exact}
        strict={strict}
        children={({ location, match }) => {
          props.active = !!(getIsActive ? getIsActive(match, location) : match)

          return React.cloneElement(React.Children.only(children), props)
        }}
      />
    )
  }
}
