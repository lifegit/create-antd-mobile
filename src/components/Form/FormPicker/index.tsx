import React from 'react';
import { Picker } from 'antd-mobile';
import { PickerPropsType } from 'antd-mobile/lib/picker/PropsType';

export interface Options extends PickerPropsType{
  name: string
  form: any
  field?: object
}

const Index: React.FC<Options> = (props) => {
  const fieldsError = props.form.getFieldsError();
  const { extra = "请选择" } = props

  return (
    <Picker
      {...props.form.getFieldProps(props.name, props.field)}
      {...props}
      extra={
        <div>
          {extra}
          {fieldsError[props.name] && <img src={require(`./warning.svg`)} style={{ marginLeft:5, verticalAlign:'sub' }} alt={'err'} />}
        </div>
      }
    >{props.children}</Picker>
  )
}

export default Index
