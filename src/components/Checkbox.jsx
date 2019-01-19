import React, { PureComponent } from 'react'
import { trModel } from 'redux-form-auto'
import classnames from 'classnames'

const renderSeparator = horizontal => {
  if (horizontal)
    return <div className="col-sm-3"></div>
  else
    return null
}

const renderInputs = ({ id, horizontal, label, input }) => {
  const classes = classnames({
    'form-check': !horizontal
  })

  return (
    <div className={classes}>
      <input
        key="input"
        id={id}
        className="form-check-input"
        {...input}
        type="checkbox"
      />
      <label key="label" className="form-check-label" htmlFor={id}>
        {label}
      </label>
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
      schemaTypeName 
    } = this.props

    const id = `${schemaTypeName}-${name}`
    const label = trModel(schemaTypeName, name)

    return [
      renderSeparator(horizontal),
      renderInputsGroup({ id, horizontal, label, input })
    ]
  }
}

export const CheckboxWrapper = ({
  errorMessage,
  warningMessage,
  horizontal,
  children
}) => {
  const classes = classnames('form-group', { row: horizontal })

  return (
    <div className={classes}>
      {children}
      {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
      {warningMessage && <small className="form-text">{warningMessage}</small>}
    </div>
  )
}
