import React from 'react';
import Status,{Options} from './status'

const NetWork: React.FC<Partial<Options>> = (props) => {
  return (
    <Status icon={require('./imgs/network.svg')} text={props.text ?? "网络错误!"}>
      { props.children }
    </Status>
  );
}

const Empty: React.FC<Partial<Options>> = (props) => {
  return (
    <Status icon={require('./imgs/empty.svg')} text={props.text ??  "暂无数据!"}>
      { props.children }
    </Status>
  );
}

export {
  NetWork,
  Empty
}
