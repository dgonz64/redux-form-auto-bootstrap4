import * as components from './components'
import { InputWrap } from './wrappers/InputWrap'
import { InputArrayWrap } from './wrappers/InputArrayWrap'

import { InputArrayPanel } from './components/InputArrayPanel'
import { InputArrayTable } from './components/InputArrayTable'
import { BSInputWrapper } from './components/BSInputWrapper'

import { renderInputs } from 'redux-form-auto'

/**
 * Data brick used to create a component for a type.
 *
 * @typedef {object} skinTypeMap
 * @property {Component} component
 * @property {function|object} props
 */
export default {
  form: {
    component: components.Form,
    props: {}
  },
  string: {
    component: InputWrap,
    props: props => ({
      ...props,
      inputWrapper: BSInputWrapper,
      inputComponent: props.fieldSchema.textarea ? 'textarea' : 'input'
    })
  },
  password: {
    component: InputWrap,
    props: {
      inputWrapper: BSInputWrapper,
      inputComponent: 'input',
      type: 'password'
    }
  },
  number: {
    component: InputWrap,
    props: {
      inputWrapper: BSInputWrapper,
      inputComponent: 'input',
      type: 'number',
      parse: value => Number(value)
    }
  },
  array: {
    component: InputArrayWrap,
    props: props => {
      const {
        config = {},
        propOverrides,
        fieldSchema: { type },
        name
      } = props

      const { arrayMode } = config
      const arrayHandler = arrayMode == 'table' ?
        InputArrayTable : InputArrayPanel

      return {
        ...props,
        arrayHandler,
        children: renderInputs({
          schema: type[0],
          config,
          propOverrides,
          containerField: name
        })
      }
    }
  },
  schema: {
    component: components.Submodel,
  },
  select: {
    component: InputWrap,
    props: props => {
      const {
        fieldSchema: { options },
        schemaTypeName,
        name
      } = props

      const pOptions = typeof options == 'function' ?
        options(props) : options

      return {
        ...props,
        inputWrapper: BSInputWrapper,
        inputComponent: 'select',
        children: components.mapSelectOptions(
          schemaTypeName,
          name,
          pOptions
        )
      }
    }
  },
  radios: {
    component: InputWrap,
    props: props => {
      const {
        fieldSchema: { options },
      } = props

      const pOptions = typeof options == 'function' ?
        options(props) : options

      return {
        ...props,
        inputWrapper: components.RadiosWrapper,
        inputComponent: components.Radio,
        labelTop: true,
        provideMessages: true,
        children: components.mapRadioOptions({
          ...props,
          options: pOptions
        })
      }
    }
  },
  boolean: {
    component: InputWrap,
    props: props => ({
      ...props,
      inputWrapper: components.CheckboxWrapper,
      inputComponent: components.Checkbox,
      provideMessages: true,
      labelOverride: ''
    })
  }
}
