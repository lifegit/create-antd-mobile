import React from 'react';
import { Link } from 'umi';

interface Options{
  href?: string
}

const Index: React.FC<Options> = (props) => {
  const node = props.href?.startsWith("http") ? (
    <a target="_blank" href={props.href}>{props.children}</a>
  ) : props.href ? (
    <Link to={props.href}>{props.children}</Link>
  ) : props.children

  return <>{node}</>
}

export default Index
