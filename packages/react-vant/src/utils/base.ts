import React from "react";

export function noop() {}

export const inBrowser = typeof window !== "undefined";

// unknown type for Vue prop
export const UnknownProp = null as unknown;

// eslint-disable-next-line
export type ComponentInstance = React.Component<{}, any>;

export function isDef<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val: unknown): val is Function {
  return typeof val === "function";
}

export function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === "object";
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function get(object: any, path: string): any {
  const keys = path.split(".");
  let result = object;

  keys.forEach((key) => {
    result = result[key] ?? "";
  });

  return result;
}

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export function pick<T, U extends keyof T>(
  obj: T,
  keys: ReadonlyArray<U>,
  ignoreUndefined?: boolean
) {
  return keys.reduce((ret, key) => {
    if (!ignoreUndefined || obj[key] !== undefined) {
      ret[key] = obj[key];
    }
    return ret;
  }, {} as Writeable<Pick<T, U>>);
}
