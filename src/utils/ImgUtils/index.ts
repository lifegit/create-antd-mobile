// demo:
//     imgcheckAndCompress(file,(file,err)=>{
//         if(err){
//             Toast.fail(err.toString());
//             return ;
//         }
//     })

/**
 * 压缩与验证图片
 * @param file
 * @param callFunc
 * @param maxSize
 * @param maxWidth
 * @param maxHeight
 * @param quality
 * @param acceptArr
 */
const imgCheckAndCompress = (
  file: File,
  callFunc: (file: File, err: Error | null) => {},
  maxSize = 3145728,
  maxWidth = 1200,
  maxHeight = 900,
  quality = 0.7,
  acceptArr = ['jpeg', 'jpg', 'bmp', 'png', 'gif'],
) => {
  imgCompress(file, maxWidth, maxHeight, quality)
    .then((res) => {
      imgCheck(res, acceptArr, maxSize, callFunc);
    })
    .catch((err) => {
      imgCheck(file, acceptArr, maxSize, callFunc);
    });
};

/**
 * 验证图片
 * @param file
 * @param acceptArr
 * @param maxSize
 * @param callFunc
 * @returns {boolean}
 */
const imgCheck = (
  file: File,
  acceptArr: string[],
  maxSize: number,
  callFunc: (file: File, err: Error | null) => {},
): boolean => {
  if (!acceptArr.find((value) => file.type.indexOf(value))) {
    callFunc(file, new Error('图片错误: 不允许的文件格式!'));
    return false;
  }

  if (file.size > maxSize) {
    callFunc(file, new Error(`图片错误: 文件太大! 最大:${maxSize / 1024 / 1024}M!`));
    return false;
  }

  callFunc(file, null);

  return true;
};

/**
 * getBase64
 * @param file
 * @param callFunc
 */
const getBase64 = (file: File, callFunc: (res: any) => {}) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callFunc(reader.result));
  reader.readAsDataURL(file);
};

// demo:
// ck = ()=>{
//     const _this = this;
//     document.querySelector('#file').addEventListener('change', function () {
//         compress(this.files[0], 1200, 900, 1)
//             .then((res) => {
//                 // 处理成功会执行
//                 console.log('success',res);
//                 _this.setState({
//                     cc: window.URL.createObjectURL(res.blob),
//                 });
//             })
//             .catch(function (err) {
//                 // 处理失败会执行
//                 console.log('error',err);
//             });
//     };
// }
// render() (
//     <div>
//         <Button onClick={this.ck}/>
//         <img src={this.state.img} />
//     </div>
// );

/**
 * 图片压缩
 * @param file
 * @param maxWidth 最大宽度
 * @param maxHeight 最大高度
 * @param quality 压缩倍率 0-1，数值越小，图片越模糊
 * @returns {Promise<*>}
 */
const imgCompress = (
  file: File,
  maxWidth = 1200,
  maxHeight = 900,
  quality = 0.7,
): Promise<File> => {
  const fileType = file.name.indexOf('.');
  const img: any = new Image();
  const canvas = document.createElement('canvas');
  const context: any = canvas.getContext('2d');
  const reader = new FileReader();
  let resolves: any;
  img.onload = () => {
    // @ts-ignore
    const originWidth = this.width;
    // @ts-ignore
    const originHeight = this.height;
    let targetWidth = originWidth;
    let targetHeight = originHeight;
    if (originWidth > maxWidth || originHeight > maxHeight) {
      if (originWidth / originHeight > maxWidth / maxHeight) {
        targetWidth = maxWidth;
        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
      } else {
        targetHeight = maxHeight;
        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
      }
    }
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    context.clearRect(0, 0, targetWidth, targetHeight);
    context.drawImage(img, 0, 0, targetWidth, targetHeight);
    canvas.toBlob(
      (blob: any) =>
        resolves(
          new File(
            [blob],
            file.name.substring(0, fileType === -1 ? file.name.length : fileType) + '.jpeg',
            { type: 'image/jpeg' },
          ),
        ),
      'image/jpeg',
      quality,
    );
  };

  reader.onload = (e: any) => {
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
  return new Promise((resolve) => {
    resolves = resolve;
  });
};

export { imgCheckAndCompress, imgCheck, getBase64, imgCompress };
