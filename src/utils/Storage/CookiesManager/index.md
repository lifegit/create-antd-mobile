---
group:
  path: /utils/storage
---

## CookiesManager

管理 cookies

#### 代码演示

```tsx
import React, {useState,useEffect} from 'react';
import CookiesManager  from './index'

export default () => {
  const [state, setState] = useState(1);

  useEffect(() => {
    CookiesManager.setCookie("testKey","testValue","s5")
    setInterval(()=>{
      setState(res => res + 1)
    },1000)
  }, []);
  
  
  return (
    <>
      <div>{state}</div>
      <div>{CookiesManager.getCookie("testKey")}</div>
    </>
  )
};
```
