## Empty

一个空状态，可自由设置文本和图标

### API


| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| text     | 展示文本           | string  |   暂无数据   |
| icon     | 展示图标           | string  |  -    |
| children | 子元素           | React.ReactNode  |  |

```tsx
import React from 'react';
import {Empty,NetWork} from './index'

export default () =>{
  
  return (
    <div>
      <Empty>
        <div>Empty</div>
      </Empty>

      <NetWork>
        <div>NetWork</div>
      </NetWork>
    </div>
  );
};
```
