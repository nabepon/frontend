// @flow
// 36^6乗のランダムな値を返す
export function createKey(keyLength: ?number) {
  const _keyLength = keyLength || 6;
  return Math.random().toString(36).substr(2, _keyLength);
}
