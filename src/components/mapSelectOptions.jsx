import React from 'react'
import { trModel } from 'redux-form-auto'

export const mapSelectOptions = (model, field, options) =>
  options.map(op =>
    <option
      key={op.value || op}
      value={op.value || op}
    >
      {op.label || trModel(model, field, op)}
    </option>
  )
