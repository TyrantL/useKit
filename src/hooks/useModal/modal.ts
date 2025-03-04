import useCommon from './common';
import type { ModalHooksOption } from './types';

function useModal<T, U>(
	ref: React.Ref<any>,
	options: ModalHooksOption<'modal', T, U> = {},
	defaultData: Partial<T> | (() => Partial<T>) = {},
) {
	return useCommon('modal', ref, options, defaultData);
}

export default useModal;
