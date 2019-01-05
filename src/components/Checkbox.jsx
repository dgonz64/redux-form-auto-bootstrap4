import React, { PureComponent } from 'react'
import { trModel } from 'redux-form-auto'
import classnames from 'classnames'

export class Checkbox extends PureComponent {
  render() {
    const {
      input,
      input: { name },
      config,
      schemaTypeName 
    } = this.props

    const classes = classnames('form-check', {
      'offset-sm-4': config.horizontal
    })

    return (
      <div className={classes}>
        <input className="form-check-input" {...input} type="checkbox" />
        <label className="form-check-label">
          {trModel(schemaTypeName, name)}
        </label>
      </div>
    )
  }
}
