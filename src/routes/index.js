// @flow
import url from 'url';
import matchPath from 'react-router/matchPath';
import sample from './sample';
import error404 from './error404';
import type { Route, Match } from '../types/routes';

export async function getRoute(urlStr: string): Promise<Route> {
  // path-to-regexp を使ったmatch処理
  const { pathname } = url.parse(urlStr);
  const match = (path): ?Match => matchPath(pathname, path);

  if (pathname === '/') {
    return sample();
  } else if (match('/sam:ple')) {
    return sample();
  }

  return error404();
}
