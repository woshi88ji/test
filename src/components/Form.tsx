import React, { useEffect, useReducer, useState } from 'react'
import FormItem from './FormItem'
import { Form, Button, Input } from 'antd'
import template from '../template.json'
type Condition = {
  key: string,
  condition: Array<{
    pattern: string
  }>
}
type FormOptions = {
  type: string,
  key: string,
  label: string,
  options: any,
  name: string,
  rules: Array<{
    required?: boolean,
    message: string,
    reg?: string,
    pattern?: RegExp
  }>,
  ifHidden?: boolean,
  hidden?: Array<Condition | Condition[]>
}
interface Template {
  templateName: string,
  templateId: string,
  templateData: Array<FormOptions>
}

type Objyinshe = {
  [index: string]: Array<{
    key: string,
    condition: Array<Condition | Condition[]>,
    el: FormOptions
  }>
}
/**
 * 初始化，模板数据
 */
function init(template: Template): [Template, Objyinshe] {
  const obj: Objyinshe = {}
  template.templateData.forEach(val => {
    val.ifHidden = false
    val.rules.forEach(item => {
      if (item.reg) {
        item.pattern = new RegExp(item.reg)
      }
    })
    val?.hidden?.forEach(item => {
      if (item instanceof Array) {
        item.forEach(ctx => {
          obj[ctx.key] = obj[ctx.key] || []
          obj[ctx.key].push({
            key: val.key,
            condition: val.hidden!,
            el: val
          })
        })
      } else {
        obj[item.key] = obj[item.key] || []
        obj[item.key].push({
          key: val.key,
          condition: val.hidden!,
          el: val
        })
      }
    })
  })
  return [template, obj]
}
/**
 * 利用闭包缓存查询的结果
 */
function cached(fn: Function): Function {
  const cache = Object.create(null)
  return function cachedFn(str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

export default function FormContent() {
  const [form] = Form.useForm()
  const [template1, obj] = init(template)
  const [options, dispatch] = useReducer(reducer, template1)
  function getValue(key: string): any {
    return form.getFieldValue(key)
  }

  function reducer(state: any, action: string): Template {
    const getValueFn = cached(getValue)
    console.log(form.getFieldsValue())
    const result = obj[action] || []
    if (result.length) {
      result.forEach(val => {
        const bol = val.condition.some(ctx => {
          if (ctx instanceof Array) {
            return ctx.reduce((result, item) => {
              const value = getValueFn(item.key)
              return result && item.condition.every(c => new RegExp(c.pattern).test(value))
            }, true)
          } else {
            const value = getValueFn(ctx.key)
            return ctx.condition.every(item => new RegExp(item.pattern).test(value))
          }
        })
        console.log(bol)
        val.el.ifHidden = bol
      })
    }
    return { ...template1 }
    // return template1
  }
  const [templateData, setTemplateData] = useState(template1.templateData)
  useEffect(() => {
    setTemplateData(options.templateData)
  }, [options.templateData])
  return (
    <Form form={form} >
      {
        templateData.map((val) => {
          return !val.ifHidden ? <FormItem {...val} key={val.key} handler={dispatch} /> : null
        })
      }
      <Form.Item >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>

      </Form.Item>
    </Form>

  )
}
