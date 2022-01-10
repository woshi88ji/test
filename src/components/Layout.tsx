import React, { useEffect, useState } from 'react'
import { Form } from 'antd'
import '../style/formItem.less'
interface props {
  label?: string,
  options?: object,
  rules?: Array<object>,
  name: string,
  change?: Function
}
export default function Layout(Component: any) {
  return function FormLayout(props: props) {
    return (
      <Form.Item name={props.name} label={props.label} rules={props.rules}>
        <Component onChange={props.change} {...props.options} />
      </Form.Item>
    )
  }
}
