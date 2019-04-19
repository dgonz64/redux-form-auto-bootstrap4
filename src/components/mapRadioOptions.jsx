import React, { PureComponent } from 'react'
import { Field } from 'redux-form'
import classnames from 'classnames'

import { trModel } from 'redux-form-auto'

import { InputError } from './InputError'

export const mapRadioOptions = ({
  name,
  schemaTypeName,
  fieldSchema: {
    options
  },
  messages,
  config
}) =>
  options.map(op => {
    const label = op.label || trModel(schemaTypeName, name, op)
    const value = op.value || op

    const spanClasses = classnames('custom-control', 'custom-radio', {
      'form-control-inline': !config.horizontal
    })
    const errored = messages && messages.touched && messages.error

    const id = `${schemaTypeName}-${name}-${value}`

    const inputClasses = classnames('custom-control-input', {
      'is-invalid': errored
    })

    return (
      <div className={spanClasses} key={value}>
        <Field
          id={id}
          className={inputClasses}
          name={name}
          component="input"
          type="radio"
          value={value}
        />
        <label className="custom-control-label" htmlFor={id}>
          {` ${label} `}
        </label>
      </div>
    )
  })

export class Radio extends PureComponent {
  render() {
    return (
      <div key={this.props.name}>
        {this.props.children}
        <InputError messages={this.props.messages} />
      </div>
    )
  }
}

export const RadiosWrapper = ({
  horizontal,
  children,
  label
}) => {
  const classes = classnames('form-group', {
    row: horizontal
  })

  const labelClasses = classnames('control-label', 'pt-0', {
    'col-form-label': horizontal,
    'col-sm-3': horizontal,
  })

  return (
    <div className={classes}>
      <div className={labelClasses}>
        {label}
      </div>
      {children}
    </div>
  )
}
