import React from 'react';
import { Skeleton } from 'antd';
import { NetWork, Empty } from '@/components/Status';


export const DefaultSkeleton = ()=> <Skeleton active paragraph={{rows: 2}} />

export const DefaultSeparator = ()=> <span />

export const DefaultErrorWidget = ()=> <NetWork />

export const DefaultEmptyWidget = ()=> <Empty  />
