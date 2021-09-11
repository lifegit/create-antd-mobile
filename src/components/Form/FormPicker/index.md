## FormPicker

#### 何时使用

对[`Picker`](https://mobile.ant.design/components/picker-cn/)进行封装，提供了默认值、表单等补充。

#### param

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| name    | 表单的名称           | string  | (required) |
| form    | 表单    | Form  | (required) |
| field    | [FieldProps](https://github.com/react-component/form#option-object)    | object ｜ undefined | - |


#### 代码演示

```tsx
import React from 'react';
import { Toast,List,Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import FormPicker from './index'

export default createForm()((props) => {
  const {getFieldValue, getFieldProps, getFieldsError,validateFields} = props.form;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (err) {
        Toast.info(err[Object.keys(err)[0]].errors[0].message, 1);
        return;
      }
      console.log(err, values)
    });
  };

  const seasons = [
    [
      {
        label: '2013',
        value: '2013',
      },
      {
        label: '2014',
        value: '2014',
      },
    ],
    [
      {
        label: '春',
        value: '春',
      },
      {
        label: '夏',
        value: '夏',
      },
    ],
  ];
  
  return (
   <div>
     <List>
       <FormPicker
         selectedIndex={1}
         extra="选择季节"
         name={'name'}
         data={seasons}
         cascade={false}
         title="选择季节"
         form={props.form}
         field={{
           // initialValue: ['2013', '春'],
           rules: [{ required: true, message: "请选择季节" }],
         }}
       >
         <List.Item arrow="horizontal">季节</List.Item>
       </FormPicker>
     </List>

     <Button style={{ marginTop: 20 }} type="primary" onClick={handleSubmit}>完成</Button>
   </div>
  )
})
```
