import React, { PureComponent } from 'react'
import { trModel } from 'redux-form-auto'
import classnames from 'classnames'

import { InputError } from './InputError'

const renderSeparator = horizontal => {
  if (horizontal)
    return <div className="col-sm-3"></div>
  else
    return null
}

const renderInputs = ({ id, horizontal, label, input, messages }) => {
  const classes = classnames({
    'form-check': !horizontal
  })

  const inputClasses = classnames('form-check-input', {
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
      <label key="label" className="form-check-label" htmlFor={id}>
        {label}
      </label>
      <InputError messages={messages} />
    </div>
  )
}

const renderInputsGroup = (params) => {
  const { horizontal } = params
  const inputs = renderInputs(params)

  if (horizontal) {
    return (
      <div className="col-sm-9 form-check">
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

    return [
      renderSeparator(horizontal),
      renderInputsGroup({ id, horizontal, label, input, messages })
    ]
  }
}

export const CheckboxWrapper = ({
  horizontal,
  children
}) => {
  const classes = classnames('form-group', {
    row: horizontal
  })

  return (
    <div className={classes}>
      {children}
    </div>
  )
}
