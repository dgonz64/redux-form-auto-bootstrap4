import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import classnames from 'classnames'

import { trModel, arrLast } from 'redux-form-auto'

class InputBase extends Component {
  focus() {
    this.inputControl.focus()
  }

  render() {
    const {
      children,
      input,
      inputWrapper,
      inputComponent,
      required,
      config,
      config: {
        horizontal
      },
      elementOnly,
      inline,
      fieldset,
      labelTop,
      type,
      autoFocus,
      className,
      schemaTypeName,
      onKeyDown,
      onKeyPress,
      labelOverride,
      componentPropMap,
      wrapperClassName,
      provideMessages,
      meta,
      meta: {
        touched,
        error,
        warning
      },
      ...rest
    } = this.props

    const $wrapper = inputWrapper
    const $input = inputComponent || 'input'
    const inputIsClass = typeof inputComponent == 'function'
    const providedRest = componentPropMap ?
      componentPropMap(this.props) : (inputIsClass ? {
        ...rest,
        input,
        meta,
        config,
        autoFocus,
        schemaTypeName
      } : input)

    if (provideMessages) {
      providedRest.messages = {
        touched,
        error,
        warning
      }
    }

    const noWrap = type == 'hidden' || elementOnly
    const fieldName = arrLast(input.name.split('.'))
    const label = typeof labelOverride != 'undefined' ?
      labelOverride : trModel(schemaTypeName, fieldName, '_field')
    const placeholder = noWrap ? label : null
    const errorMessage = touched && error
    const warningMessage = touched && warning
    const inputClasses = classnames('form-control', className, {
      'is-invalid': errorMessage,
      // 'is-valid': (touched && !error && !warning)
    })

    return (
      <$wrapper
        label={label}
        required={required}
        horizontal={horizontal}
        inline={inline}
        fieldset={fieldset}
        labelTop={labelTop}
        errorMessage={errorMessage}
        warningMessage={warningMessage}
        elementOnly={noWrap}
        wrapperClassName={wrapperClassName}
      >
        <$input
          className={inputClasses}
          type={type || 'text'}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
          {...providedRest}
          autoComplete="off"
          placeholder={placeholder}
          ref={element => this.inputControl = element}
        >
          {children}
        </$input>
      </$wrapper>
    )
  }
}

export class InputWrap extends Component {
  focus() {
    this.fieldElement.getRenderedComponent().focus()
  }

  render() {
    return (
      <Field
        component={InputBase}
        ref={el => this.fieldElement = el}
        withRef
        {...this.props}
      />
    )
  }
}

/**
 * Skin input propTypes.
 * @typedef {object} InputPropTypes
 */
InputWrap.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  fieldSchema: PropTypes.object,
  schemaTypeName: PropTypes.string.isRequired,
  label: PropTypes.string,
  inputComponent: PropTypes.any,
  required: PropTypes.bool,
  horizontal: PropTypes.bool,
  elementOnly: PropTypes.bool,
  type: PropTypes.string,
}
