import { TextField } from '@mui/material'
import { FC } from 'react'
import { Controller } from 'react-hook-form'

interface ITextField {
  type?: string
  name: string
  label?: string
  control: any
  multiline?: boolean
  rows?: number
  rules?: { required: string }
  disabled?: boolean
  required?: boolean
  size?: 'medium' | 'small'
}

const RHFTextField: FC<ITextField> = ({
  type = 'text',
  name,
  label = '',
  control,
  multiline = false,
  rows = 1,
  rules = {},
  disabled = false,
  required = false,
  size = 'medium'
}) => (
  <Controller
    name={name}
    control={control}
    defaultValue=""
    rules={required ? rules : {}}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        type={type}
        label={label}
        variant="outlined"
        fullWidth
        size={size}
        multiline={multiline}
        rows={rows}
        error={!!error}
        helperText={error ? error.message : ''}
        disabled={disabled}
      />
    )}
  />
)

export default RHFTextField
