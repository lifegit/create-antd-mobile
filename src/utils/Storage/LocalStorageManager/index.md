---
group:
  path: /utils/storage
---

## LocalStorageManager

管理 LocalStorage

#### 代码演示

```tsx
import React, {useState,useEffect} from 'react';
import LocalStorageManager from './index';

const lsm = new LocalStorageManager()
export default () => {
  const [state, setState] = useState(1);

  useEffect(() => {
    lsm.setItem('aa','aa')
    lsm.setItemTime('aa','aa', 5)

    setInterval(()=>{
      setState(res => res + 1)
    },1000)
  }, []);
  
  return (
    <div>
      <div>{state}</div>
      <div>{lsm.getItem("aa")}</div>
    </div>
  )
};
```
