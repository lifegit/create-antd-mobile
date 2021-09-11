## ImagePickerDetailed

图片选择器

### param

| 参数      | 说明                    | 类型         | 默认值 |
|----------|------------------------|-------------|-------|
| ref       | ref         | UploadImgRef               |  |
| fileList    | 上传文件列表  | ImageFile[]  |  |
| request    | 请求函数        | (file) => Promise  |  |
| onChange    | 上传组件发生改变回调函数  | (file) => void  |  |

### 代码演示

```tsx
import React,{useState,useRef} from 'react';
import ImagePickerDetailed,{UploadImgRef, ImageFile} from './index'
import { Button } from 'antd-mobile';

export default () =>{
  const [uploadImg, setUploadImg] = useState<ImageFile[]>([]);
  const ref = useRef<UploadImgRef>();
  
  const handRequest = (image: ImageFile) => {
    const formData = new FormData();
    formData.append('image', image.file);
    formData.append('type', 'article');
    return API.images.postImages.request(formData);
  };
  
  const handUpload = () => {
    ref.current
      ?.upload()
      .then((res) => {
        console.log('所有图片上传完毕，都成功!', res);
      })
      .catch((err) => {
        console.log('所有图片上传完毕，有失败!!', err);
      });
  };
  
  return (
    <>
      <ImagePickerDetailed
        ref={ref}
        fileList={uploadImg}
        request={handRequest}
        onChange={(fileList) => {
          console.log(fileList)
          setUploadImg(fileList)
        }}
      />
      <Button onClick={handUpload}>上传</Button>
    </>
  )
};
```
