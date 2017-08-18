/* @noflow */
declare module 'icepick' {
  declare function assoc(obj: Object | Array<*>, path: *, value: any): any;
  declare function assocIn(obj: Object | Array<*>, path: Array<*>, value: any): any;
  declare function set(obj: Object | Array<*>, path: *, value: any): any;
  declare function setIn(obj: Object | Array<*>, path: Array<*>, value: any): any;
  declare function dissoc(obj: Object | Array<*>, path: *): any;
  declare function unset(obj: Object | Array<*>, path: *): any;
  declare function updateIn(obj: Object | Array<*>, path: Array<*>, cb: Function): any;
  declare function assign(obj: Object | Array<*>, value: B): any;
  declare function merge<A, B>(obj: A, obj: B): A & B;
  declare function freeze<A>(a: A): A;
  declare function thaw<A>(a: A): A;
  declare function getIn(obj: Object | Array<*>, path: Array<*>): any;
}
