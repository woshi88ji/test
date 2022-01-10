import React, { useState } from 'react'
import { Menu } from 'antd'
import Form from '../components/Form'
export default function Home() {
  const [current, setCurrent] = useState('edit')

  return (
    <div>
      <Menu mode="horizontal" onClick={e => setCurrent(e.key)} selectedKeys={[current]}>
        <Menu.Item key='edit' >
          页面编辑
        </Menu.Item>
        <Menu.Item key='disign'>
          页面设置
        </Menu.Item>
      </Menu>
      <Form></Form>
    </div>
  )
}
