import React from 'react'
import Input from './Input'
import Select from './Select'
interface propsType {
  type: string,
  options: object,
  name: string
  key: string,
  handler: Function
}

export default function Default(props: propsType) {
  console.log(props)
  switch (props.type) {
    case 'input':
      return <Input {...props} />
    case 'select':
      return <Select {...props} ></Select>
    default:
      return <Input {...props} />
  }
}
