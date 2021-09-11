## Validate

#### 代码演示

```tsx
import React from 'react';
import { Button, Toast, List } from 'antd-mobile';
import FormInputItem from '../FormInputItem'
import { createForm } from 'rc-form';
import { lowerCase, legalRoutine, legalNum } from './index'

export default createForm()((props) => {
  const fieldsError = props.form.getFieldsError();
  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (err) {
        Toast.info(err[Object.keys(err)[0]].errors[0].message, 1);
        return;
      }
      Toast.info('ok', 1);
      console.log(err, values)
    });
  };
  
  return (
    <List>
      <FormInputItem
        name={'lowerCase'}
        form={props.form}
        placeholder="小写字母"
        field={{
          initialValue: 'a',
          rules: [{ required: true, message: "请输入小写字母", pattern: lowerCase }],
        }}
      >小写字母</FormInputItem>
      <FormInputItem
        name={'legalRoutine'}
        form={props.form}
        placeholder="杂文"
        field={{
          initialValue: 'a',
          rules: [{ 
            required: true,
            validator: (rule, value, callback) => {
              const run = legalRoutine(value,6, 18);
              console.log(run)
              return run === true ? callback() : callback(new Error(`杂文${run}`))
            }
          }],
        }}
      >杂文</FormInputItem>
      <FormInputItem
        name={'legalNum'}
        form={props.form}
        placeholder="金额"
        field={{
          rules: [{
            required: true,
            validator: (rule, value, callback) => {
              const run = legalNum(value,1,99999,2);
              console.log(run)
              return run === true ? callback() : callback(new Error(`金额${run}`))
            }
          }],
        }}
      >金额</FormInputItem>

      <Button style={{ marginTop: 20 }} type="primary" onClick={handleSubmit}>完成</Button>
    </List>
  )
})
```
