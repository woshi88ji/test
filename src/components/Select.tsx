import React from 'react'
import { Select } from 'antd'
import layout from './Layout'
interface InputProps {
  label?: string,
  options?: object,
  name: string
}

export default function FormSelect(props: InputProps) {
  const Item = layout(Select)
  return (
    <Item {...props} />
  )
}
