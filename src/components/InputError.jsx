import React from 'react'

export const InputError = ({
  // Messages with { touched, error, warning }
  messages,

  // Alternative
  errorMessage,
  warningMessage
}) => {
  if (messages) {
    const { touched, error, warning } = messages

    errorMessage = touched && error
    warningMessage = touched && warning
  }

  return [
    errorMessage &&
      <div
        className="invalid-feedback"
        style={{ display: 'block' }}
      >
        {errorMessage}
      </div>,
    warningMessage &&
      <small className="form-text">
        {warningMessage}
      </small>
  ]
}
