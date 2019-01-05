export * from 'redux-form-auto'
export * from './components'
export { InputWrap } from './wrappers/InputWrap'
export { InputArrayWrap } from './wrappers/InputArrayWrap'

import skin from './skin'
import { setSkin } from 'redux-form-auto'

setSkin(skin)
