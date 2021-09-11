---
group:
  path: /utils
---

## ImgUtils

对图片的校验和压缩

#### 代码演示

```tsx
import React, {useState,useEffect} from 'react';
import { imgcheckAndCompress } from './index'

export default () => {

  const handChange = e =>{
    const file = document.getElementById("file").files[0];
    imgcheckAndCompress(file, (file,err) => {
        if(err){
           console.log(file, err)
        }
    })
  }
  
  return (
    <div>
      <input type="file" id="file" name="myfile" onChange={handChange} />
         {/*<img src={this.state.img} />*/}
     </div>
  )
};
```
