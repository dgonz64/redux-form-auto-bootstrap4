import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const renderLabel = props => {
  const labelClasses = classnames(
    'control-label',
    {
      ['pt-0']: props.labelTop && props.horizontal,
      ['col-form-label']: props.horizontal,
      ['col-sm-3']: props.horizontal
    }
  )
  const $labelComponent = props.fieldset ? 'legend' : 'label'

  return (
    <$labelComponent className={labelClasses} data-required={props.required}>
      {props.label}
    </$labelComponent>
  )
}

const renderError = (message) => {
  if (message) {
    return (
      <span className="help-block">
        {message}
      </span>
    )
  } else
    return null
}

const renderElement = (props, wrapperClasses) =>
  <div className={wrapperClasses}>
    {props.children}
    {renderError(props.errorMessage || props.warningMessage)}
  </div>

export const BSInputWrapper = props => {
  const label = props.label ? renderLabel(props) : null
  const wrapperClasses = 'wrapperClassName' in props ? 
    props.wrapperClassName
    : classnames({
      'col-sm-9': props.horizontal && !props.inline,
      'col-sm-10': props.inline
    })
  const groupClasses = classnames(
    'form-group',
    {
      row: props.horizontal,
      'has-error': props.errorMessage,
      'has-warning': props.warningMessage
    }
  )

  const element = renderElement(props, wrapperClasses)
  const $grouper = props.fieldset ? 'fieldset' : 'div'

  if (props.elementOnly) {
    return (
      <$grouper className={groupClasses} >
        {element}
      </$grouper>
    )
  } else {
    return (
      <$grouper className={groupClasses}>
        {label}
        {element}
      </$grouper>
    )
  }
}

BSInputWrapper.propTypes = {
  label: PropTypes.string,
  horizontal: PropTypes.bool,
  required: PropTypes.bool,
  elementOnly: PropTypes.bool,
  inline: PropTypes.bool,
  fieldset: PropTypes.bool,
  labelTop: PropTypes.bool,
  children: PropTypes.node.isRequired,
  errorMessage: PropTypes.any,
  warningMessages: PropTypes.any,
}
