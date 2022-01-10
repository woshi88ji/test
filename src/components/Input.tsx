import React, { useEffect } from 'react'
import { Input } from 'antd'
import layout from './Layout'
interface InputProps {
  label?: string,
  options: object,
  rules?: Array<object>,
  name: string,
  handler: Function
}

export default function FormInput(props: InputProps) {
  console.log(props)
  const Item = layout(Input)
  return (
    <Item change={() => { props.handler(props.name) }} {...props} />
  )
}
