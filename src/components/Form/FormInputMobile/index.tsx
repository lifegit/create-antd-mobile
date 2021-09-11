import React, { useEffect, useState } from 'react';
import { Toast, InputItem } from 'antd-mobile';
import { createForm } from "rc-form";
import {useInterval} from 'react-use';
import styles from './index.less';
import { InputItemProps } from 'antd-mobile/lib/input-item';

interface Options extends InputItemProps{
  /** 秒 */
  second?: number
  /** 标题 */
  title?: string
  /** 发送回调函数 */
  onSend: (mobile: string) => void;
  /** form */
  form: any;
}

const isMobile = (value: string) => /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test((value ?? '').replaceAll(' ',''))

const FormInputMobile = (props: Options) => {
  const { second: keySecond = 60, title = '手机号' } = props
  const [second, setSecond] = useState(0);
  const fieldsError = props.form?.getFieldsError();
  const running = second > 0

  useInterval(
    () => setSecond(second - 1),
    running ? 1000 : null
  );
  useEffect(() => {
    return setSecond(0)
  }, []);

  // 发送验证码
  const handleCheck = () => {
    if (!running){
      const mobile = props.form?.getFieldValue('mobile')
      if (!isMobile(mobile)) {
        Toast.fail('手机号格式不符', 3, ()=>{}, false);
        return;
      }
      setSecond(keySecond)
      props.onSend(mobile);
    }
  };

  return (
    <InputItem
      type="phone"
      {...props.form.getFieldProps('mobile', {
        rules: [
          {
            len:11,
            required: true,
            message: "请正确输入手机号",
            validator:(rule: any, value: string)=> isMobile(value)
          },
        ],
      })}
      placeholder="请输入手机号"
      clear
      error={fieldsError.mobile}
      onErrorClick={() => Toast.info(fieldsError.mobile)}
      extra={
        <a
          className={styles.link}
          style={{
            color: running ? '#FF4949' : '',
            cursor: running ? 'pointer' : 'default',
          }}
          onClick={handleCheck}
        >
          {running ? `${second}s后重试` : '发送验证码'}
        </a>
      }
    >
      {title}
    </InputItem>
  );
};
export default FormInputMobile


const InputMobile = createForm()(FormInputMobile);
export {
  InputMobile,
}






