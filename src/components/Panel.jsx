import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const renderChildren = (noMargin, children) => {
  if (noMargin)
    return children
  else {
    return (
      <div className="card-body">
        {children}
      </div>
    )
  }
}

const renderHeader = (header) => {
  if (header) {
    return (
      <div className="card-header">
        {header}
      </div>
    )
  } else
    return null
}

const getClasses = ({ panelType, borderType, className }) => {
  const typeIsDefault = !panelType || panelType == 'default'
  const typeClass = typeIsDefault ? '' : 'bg-' + panelType
  const textClass = typeIsDefault ? 'text-dark' : 'text-white'
  const buttonClass = className || ''

  const borderIsDef = !borderType || borderType == 'default'
  const borderClass = borderIsDef ? '' : `border-${borderType}`

  return classnames('card', typeClass, textClass, buttonClass, borderClass)
}

export const Panel = ({
  header,
  table = null,
  className,
  panelType,
  borderType,
  noMargin,
  onClick,
  children
}) => {
  const classes = getClasses({ panelType, borderType, className })

  return (
    <div
      className={classes}
      onClick={onClick}
    >
      {renderHeader(header)}
      {renderChildren(noMargin, children)}
      {table}
    </div>
  )
}

Panel.propTypes = {
  header: PropTypes.node,
  table: PropTypes.node,
  className: PropTypes.string,
  panelType: PropTypes.string,
  onClick: PropTypes.func
}
