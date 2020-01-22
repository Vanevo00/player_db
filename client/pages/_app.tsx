import React from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import 'material-icons/iconfont/material-icons.css'
// @ts-ignore
import Index from './index'

interface Props {
  Component: any,
  pageProps: any
}

export default function MyApp({ Component, pageProps }: Props) {
  return <Index {...pageProps} />
}
