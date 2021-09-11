组件名称

## FormInputMobile

手机号验证码组件

### param

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| second    | 需要等待的秒数           | number ｜ undefined  | 60 |
| title    | 标题    | string ｜ undefined  | 手机号 |
| onSend    | 验证码发送回调    | (mobile: string) => void  | - |
| form    | 表单，需要使用 createForm()(Index)    | Form  | - |


### 代码演示

#### InputMobile

##### 何时使用

不需要控制表单

##### 代码演示

```tsx
import React from 'react';
import {InputMobile} from './index'

export default () => (
  <InputMobile
    onSend={(mobile)=>{
      console.log(`已向手机号${mobile}发送验证码`)
    }}
  />
)
```


#### FormInputMobile


##### 何时使用

当需要与其他 Form 结合时可使用该组件

##### 代码演示

```tsx
import React from 'react';
import { Toast,List,Button,InputItem } from 'antd-mobile';
import FormInputMobile  from './index'
import FormInputItem from '../FormInputItem'
import { createForm } from 'rc-form';

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
   <>
     <List>
       <FormInputMobile
         form={props.form}
         onSend={(mobile)=>{
           console.log(`已向手机号${mobile}发送验证码`)
         }}
       />
       <FormInputItem
         name='code'
         form={props.form}
         placeholder="请输入短信验证码"
         field={{
           rules: [{ required: true, message: "请输入验证码" }],
         }}
       >验证码</FormInputItem>
     </List>

     <Button style={{ marginTop: 20 }} type="primary" onClick={handleSubmit}>完成</Button>
   </>
  )
})
```
