import React, { PureComponent } from 'react'
import { Field } from 'redux-form'
import classnames from 'classnames'

import { trModel } from 'redux-form-auto'

export const mapRadioOptions = ({
  name,
  schemaTypeName,
  fieldSchema: {
    options
  },
  config
}) =>
  options.map(op => {
    const label = trModel(schemaTypeName, name, op)
    const spanClasses = classnames('form-check', {
      'form-check-inline': !config.horizontal
    })

    const id = `${schemaTypeName}-${name}-${op}`

    return (
      <div className={spanClasses} key={op}>
        <Field
          id={id}
          className="form-check-input"
          name={name}
          component="input"
          type="radio"
          value={op}
        />
        <label className="form-check-label" for={id}>
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
      </div>
    )
  }
}
