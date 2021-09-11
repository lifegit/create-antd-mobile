import React from 'react';
import { Toast, InputItem } from 'antd-mobile';
import { InputItemProps } from 'antd-mobile/lib/input-item';

export interface Options extends InputItemProps{
  name: string
  form: any
  field?: any
}

const Index: React.FC<Options> = (props) => {
  const fieldsError = props.form.getFieldsError();
  return (
    <InputItem
      clear
      error={fieldsError[props.name]}
      onErrorClick={() => Toast.info(fieldsError[props.name], 3, ()=>{}, false)}
      {...props.form.getFieldProps(props.name, props.field)}
      {...props}
    >{props.children}</InputItem>
  )
}

export default Index

