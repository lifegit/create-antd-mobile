## FormInputItem

#### 何时使用

对[`InputItem`](https://mobile.ant.design/components/input-item-cn)进行封装，提供了默认值、表单等补充。

#### param

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| name    | 表单的名称           | string  | (required) |
| form    | 表单    | Form  | (required) |
| field    | [FieldProps](https://github.com/react-component/form#option-object)    | object ｜ undefined | - |


#### 代码演示

```tsx
import React from 'react';
import { Toast,List,Button,InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import FormInputItem from './index'

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
  
  return (
   <div>
     <List>
       <FormInputItem
         name={'name'}
         form={props.form}
         placeholder="名称"
         field={{
           initialValue: '',
           rules: [{ required: true, message: "请输入名称" }],
         }}
       >名称</FormInputItem>

       <FormInputItem
         name={'money'}
         form={props.form}
         placeholder="0.00"
         extra="¥"
       >价格</FormInputItem>
     </List>

     <Button style={{ marginTop: 20 }} type="primary" onClick={handleSubmit}>完成</Button>
   </div>
  )
})
```
