import React, { createContext } from 'react';
import { IRoute } from '@umijs/core';

interface RouteContextType {
  routes?: IRoute[]
}

export const findRouter = (path: string, router: IRoute[], level: number = 0): (IRoute | undefined)=>{
  return router.find(item => {
    if (item.routes?.length){
      return findRouter(path, item.routes, level+1)
    }

    return item.path === path
  })
}

const routeContext: React.Context<RouteContextType> = createContext({});

export default routeContext;
