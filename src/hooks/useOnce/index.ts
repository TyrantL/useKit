import { once } from 'lodash-es'
import { useRef } from 'react'
import { isFunction } from '../utils';
import isDev from '../utils/isDev';

type noop = (...args: any[]) => any;

function useOnce<T extends noop>(fn: T) {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(`useOnce expected parameter is a function, got ${typeof fn}`);
    }
  }
  const onceRef = useRef<T>(null)

  if (!onceRef.current) {
    onceRef.current = once(fn)
  }

  return onceRef.current as T
}

export default useOnce
