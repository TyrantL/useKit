import useCommon from './common';
import type { ModalHooksOption } from './types';

function useDrawer<T, U>(
	ref: React.Ref<any>,
	options: ModalHooksOption<'drawer', T, U> = {},
	defaultData: T | (() => T) = {} as T,
) {
	return useCommon('drawer', ref, options, defaultData);
}

export default useDrawer;
