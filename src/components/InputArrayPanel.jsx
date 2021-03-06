import React from 'react'
import { PropTypes } from 'prop-types'
import { Panel } from './Panel'
import { Button } from './Button'
import { renderLectures } from './renderLectures'

import { tr, trModel } from 'redux-form-auto'

const renderItemHeader = ({
  onRemove,
  fields,
  idx
}) =>
  <Button
    onClick={onRemove.bind(null, fields, idx)}
    text="❌"
    className="btn-danger"
    small
  >
    &times;
  </Button>

const renderInputs = (props) => {
  const { fields, onRemove, children } = props

  return fields.map((field, idx) => {
    const header = renderItemHeader({ fields, onRemove, idx })

    return (
      <Panel key={idx} header={header}>
        {props.instrumentChildren({ field, idx, children })}
      </Panel>
    )
  })
}

const renderHeader = (props) => {
  const { schemaTypeName, fields, onAdd, newObject } = props
  const boundAdd = onAdd.bind(null, fields, newObject)

  return (
    <span>
      {trModel(schemaTypeName, fields.name) + ' '}
      <Button
        className="btn-success"
        onClick={boundAdd}
        iconClass="plus"
        text="🞤"
        small
      />
    </span>
  )
}

export const InputArrayPanel = (props) => {
  const { meta } = props

  return (
    <Panel header={renderHeader(props)}>
      {renderLectures(meta)}
      {renderInputs(props)}
    </Panel>
  )
}

InputArrayPanel.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  instrumentChildren: PropTypes.func.isRequired
}
