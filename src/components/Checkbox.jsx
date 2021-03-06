import React, { PureComponent } from 'react'
import { trModel } from 'redux-form-auto'
import classnames from 'classnames'

import { InputError } from './InputError'

const renderSeparator = horizontal => {
  if (horizontal)
    return <div key="sep" className="col-sm-3"></div>
  else
    return null
}

const renderInputs = ({ id, horizontal, label, input, messages }) => {
  const classes = classnames('custom-control', 'custom-checkbox', {
    'form-check': false
  })

  const inputClasses = classnames('custom-control-input', {
    'is-invalid': messages && messages.touched && messages.error
  })

  return (
    <div className={classes}>
      <input
        key="input"
        id={id}
        className={inputClasses}
        {...input}
        type="checkbox"
      />
      <label key="label" className="custom-control-label" htmlFor={id}>
        {label}
      </label>
      <InputError key="errors" messages={messages} />
    </div>
  )
}

const renderInputsGroup = (params) => {
  const { horizontal } = params
  const inputs = renderInputs(params)

  const style = horizontal ? { paddingLeft: 0 } : null

  if (horizontal) {
    return (
      <div key="inputs" className="col-sm-9" style={style}>
        {inputs}
      </div>
    )
  } else
    return inputs
}

export class Checkbox extends PureComponent {
  render() {
    const {
      input,
      input: { name },
      config: { horizontal },
      messages,
      schemaTypeName 
    } = this.props

    const id = `${schemaTypeName}-${name}`
    const label = trModel(schemaTypeName, name)

    const classes = classnames('form-group', {
      row: horizontal
    })

    return (
      <div className={classes}>
        {renderSeparator(horizontal)}
        {renderInputsGroup({ id, horizontal, label, input, messages })}
      </div>
    )
  }
}

export const CheckboxWrapper = ({
  children
}) => {
  return (
    <div className="form-group">
      {children}
    </div>
  )
}
