import React, { Fragment, useImperativeHandle } from 'react';
import { ImagePicker } from 'antd-mobile';
import Zmage from 'react-zmage';
import styles from './index.less';

export interface ImageFile {
  url: string;
  [key: string]: any;
}

export interface UploadImgRef {
  upload: (allowStatus?: []) => Promise<any>;
}

interface Options {
  fileList: ImageFile[];
  length?: number;
  onChange?: (files: ImageFile[]) => void;
  request: (data: ImageFile) => Promise<any>;
}

const Index = React.forwardRef<UploadImgRef | undefined, Options>((props: Options, ref) => {
  // ref
  useImperativeHandle(ref, () => ({
    upload: () => {
      return Promise.all(submitUpload());
    },
  }));

  // upload
  const submitUpload = () => {
    return (props?.fileList || []).map((item, index) => {
      if (item.status === 'success') {
        return Promise.resolve('success');
      }
      return props
        .request(item.file)
        .then((res) => {
          setRes(index, {
            status: 'success',
            response: res,
          });
          return Promise.resolve(res);
        })
        .catch((err) => {
          setRes(index, {
            status: 'error',
            error: new Error(err.message || '上传错误'),
          });
          return Promise.reject(err);
        });
    });
  };

  // set
  const setRes = (itemIndex: number, res: { status: string; response?: any; error?: Error }) => {
    const fileList: ImageFile[] =
      props.fileList?.map((item, index) => {
        if (index === itemIndex) {
          return { ...item, ...res };
        }
        return item;
      }) || [];

    props.onChange?.(fileList);

    return res;
  };

  const handleImageClick = (index: number, files: ImageFile[]) => {
    Zmage.browsing({ set: files.map(item => ({src: item.url})), defaultPage: index });
  };

  return (
    <Fragment>
      <ImagePicker
        className={styles.ImagePickerSimple}
        files={props.fileList}
        length={props.length ?? 5}
        onChange={props.onChange}
        // @ts-ignore
        onImageClick={handleImageClick}
      />
    </Fragment>
  );
});
export default Index;
