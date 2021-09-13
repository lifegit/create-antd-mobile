import React from 'react';
import { notification } from 'antd';
import type { RequestConfig } from 'umi';
import { UseRequestProvider } from 'umi';
import type { RequestOptionsInit, ResponseError } from 'umi-request';
import { Token } from '@/utils/Storage/Storage/Token';
import RouteContext from '@/components/PageContainer/RouteContext';
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/** 异常处理程序
 * @see https://beta-pro.ant.design/docs/request-cn
 */
const errorHandler = async (error: ResponseError) => {
  let notErr = {
    description: '您的网络发生异常，无法连接服务器',
    message: '网络异常',
  };

  const { response } = error;
  if (response && response.status) {
    const { status, statusText } = response;
    let messageText;

    try {
      messageText = await response
        .clone()
        .json()
        .then((res) => res.message);
    } catch (e) {
      messageText = '数据格式错误';
    }
    // @ts-ignore
    const errorText = messageText || codeMessage[status] || statusText;

    notErr = {
      description: errorText,
      message: `请求错误 ${status}`,
    };
  }

  notification.error(notErr);
  // eslint-disable-next-line no-param-reassign
  error.message = notErr.description;
  throw error;
};

// https://umijs.org/zh-CN/plugins/plugin-request
export const request: RequestConfig = {
  timeout: 10 * 1000,
  requestType: 'json',
  errorHandler,
  requestInterceptors: [
    (url: string, options: RequestOptionsInit) => {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      options.headers.Authorization = Token.Get();
      return { url, options };
    },
  ],
};

// https://umijs.org/zh-CN/docs/runtime-config#rootcontainerlastrootcontainer-args
export function rootContainer(children: React.ReactNode, args: any) {
  return (
    <RouteContext.Provider value={args}>
      {/* https://umijs.org/zh-CN/plugins/plugin-request#userequest */}
      <UseRequestProvider
        value={{
          refreshOnWindowFocus: false,
        }}
      >
        {children}
      </UseRequestProvider>
    </RouteContext.Provider>
  );
}
