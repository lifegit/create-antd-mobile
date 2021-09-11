---
group:
  path: /utils/storage
---

## BaseStorage

基于 local

#### 代码演示

```tsx
import React from 'react';
import BaseStorage from './BaseStorage'

const Token = new BaseStorage('token');

Token.set('aa','aa')
export default () => {
  return (
    <>
      <div>{Token.get("aa")}</div>
    </>
  )
};
```
