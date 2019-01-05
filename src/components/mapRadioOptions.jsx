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
    const $spanComponent = config.horizontal ? 'div' : 'span'
    const spanClasses = classnames({
      'form-check': config.horizontal
    })
    const fieldClasses = classnames({
      'form-check-input': config.horizontal
    })

    return (
      <$spanComponent className={spanClasses} key={op}>
        <Field
          className={fieldClasses}
          name={name}
          component="input"
          type="radio"
          value={op}
        />
        <label className="form-check-label">
          {` ${label} `}
        </label>
      </$spanComponent>
    )
  })

export class Radio extends PureComponent {
  render() {
    return (
      <span key={this.props.name}>
        {this.props.children}
      </span>
    )
  }
}
