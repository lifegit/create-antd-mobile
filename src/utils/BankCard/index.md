---
group:
  path: /utils
---

## BankCard

获取使用支付宝公开接口获取银行卡信息。

#### 代码演示

```tsx
import React, {useState,useEffect} from 'react';
import { getCardInfo, CardInfo } from './index'

export default () => {
  const [state, setState] = useState<CardInfo>();

  useEffect(() => {
    getCardInfo('6212260508002821553').then(setState)
  }, []);
  
  console.log(state)
  return (
    <div>{
      Object.keys(state ?? {}).map(key =>
        <div key={key}>{key} : {(state[key]).toString()}</div>
      )
    }</div>
  )
};
```
