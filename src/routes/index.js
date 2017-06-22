// @flow
import url from 'url';
import quotes from './quotes';
import deliveries from './deliveries';
import billings from './billings';
import receipts from './receipts';
import error404 from './error404';

export default async function getRoute(urlStr: string): Promise<{component: Object, loader: Function}> {
  const path = url.parse(urlStr).path;

  if (path === '/quotes') {
    return quotes();
  } else if (path === '/deliveries') {
    return deliveries();
  } else if (path === '/billings') {
    return billings();
  } else if (path === '/receipts') {
    return receipts();
  } else if (path === '/404') {
    return error404();
  }

  return quotes();
}
