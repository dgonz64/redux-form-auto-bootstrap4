import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { InputError } from './InputError'

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
      <div className="invalid-feedback">
        {message}
      </div>
    )
  } else
    return null
}

const renderWarning = (message) => {
  if (message) {
    return (
      <small className="form-text">
        {message}
      </small>
    )
  } else
    return null
}

const renderElement = (props, wrapperClasses) =>
  <div className={wrapperClasses}>
    {props.children}
    <InputError
      errorMessage={props.errorMessage}
      warningMessage={props.warningMessage}
    />
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
    {
      'form-group': !props.inline,
      row: props.horizontal && !props.inline
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
