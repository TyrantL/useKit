import {
	useCallback,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from 'react';
import { isFunction } from '../utils';
import type {
	ModalAction,
	ModalHooksOption,
	ModalPropsTypeMap,
	ModalRef,
	ModalType,
	ModalTypeMap,
} from './types';

export const modalTypeMap: ModalTypeMap = {
	modal: {
		visible: 'open',
		onClose: 'onCancel',
	},
	drawer: {
		visible: 'open',
		onClose: 'onClose',
	},
};

function resolveDefaultData<T>(data: T | (() => T)) {
	if (!data) return data;
	if (isFunction(data)) return data();
	return data;
}

function useCommon<P extends ModalType, T, U>(
	modalType: P,
	ref: React.Ref<any>,
	options: ModalHooksOption<P, T, U>,
	defaultData: T | (() => T) = {} as T,
) {
	const [props, setProps] = useState<{
		visible:
			| false
			| { resolve: (value: U) => void; reject: (reason: any) => void };
		data: T;
		options: ModalHooksOption<P, T, U>;
		promise: null | Promise<U> | PromiseLike<U>;
	}>(() => ({
		visible: false,
		data: resolveDefaultData(defaultData) as T,
		options,
		promise: null,
	}));

	const $refs = useRef(
		{} as { props: typeof props; defaultData: typeof defaultData },
	);

	$refs.current.props = props;
	$refs.current.defaultData = defaultData;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const modal = useMemo<ModalRef<P, T, U>>(() => {
		const ret: ModalRef<P, T, U> = {
			get visible() {
				return Boolean($refs.current.props.visible);
			},
			get data(): T {
				return $refs.current.props.data;
			},
			get props() {
				const map = modalTypeMap[modalType];
				return {
					[map.visible]: Boolean($refs.current.props.visible),
					[map.onClose]: this.cancelModal,
				} as ModalPropsTypeMap[P];
			},
			get modalPromise() {
				return $refs.current.props.promise;
			},
			get options() {
				return $refs.current.props.options;
			},

			modal(newData: T): Promise<U> {
				// biome-ignore lint/suspicious/noAsyncPromiseExecutor: <explanation>
				const promise = new Promise<U>(async (resolve, reject) => {
					if ($refs.current.props.visible) {
						return;
					}

					// 将传入的数据和defaultData合并赋值给newModalData
					const defaultData = resolveDefaultData($refs.current.defaultData);
					let newModalData: T = {
						...defaultData,
						...newData,
					};

					const { beforeModal, afterModal, beforeCloseModal, afterCloseModal } =
						this.options;

					if (beforeModal) {
						let pauseResult: any;
						let pause = false;

						const pauseFn = (result: any) => {
							pause = true;
							pauseResult = result;
						};

						// 执行beforeModal
						const result =
							(await beforeModal(newModalData, pauseFn)) || newModalData;
						// 如果有result,将newModalData和result合并，防止传入的newData丢失
						if (result && result !== newModalData) {
							newModalData = {
								...newModalData,
								...result,
							};
						}

						// 如果beforeModal中调用了第二个参数，则视为希望暂停弹窗弹出
						if (pause) {
							return reject(pauseResult);
						}
					}

					const closeFn = (
						before: (next: () => void) => void,
						action: ModalAction,
					) => {
						const close = async () => {
							const _close = () => {
								$refs.current.props = {
									...$refs.current.props,
									visible: false,
									promise: null,
								};

								setProps($refs.current.props);

								setTimeout(() => {
									afterCloseModal?.(this.data, action, this);
								});
							};

							if (before) {
								before(_close);
							} else {
								_close();
							}
						};

						const modalClose = () => {
							if (beforeCloseModal) {
								beforeCloseModal(close, action, this);
							} else {
								close();
							}
						};

						modalClose();
					};
					$refs.current.props = {
						...$refs.current.props,
						data: newModalData,
						visible: {
							resolve: (value: U) => {
								return closeFn((next) => {
									resolve(value);
									next();
								}, 'end');
							},
							reject: (reason: any) => {
								closeFn((next) => {
									reject(reason);
									next();
								}, 'cancel');
							},
						},
					};

					setProps({ ...$refs.current.props });

					setTimeout(() => {
						afterModal?.(newModalData);
					});
				});

				$refs.current.props.promise = promise;
				return promise;
			},

			endModal: (result: U) => {
				if ($refs.current.props.visible) {
					$refs.current.props.visible.resolve(result);
				}
			},

			cancelModal: (reason) => {
				if ($refs.current.props.visible) {
					$refs.current.props.visible.reject(reason);
				}
			},
		};
		return ret;
	}, []);

	const setData = useCallback(
		(newData: Partial<T> | ((data: Partial<T>) => Partial<T>)) => {
			if (isFunction(newData)) {
				return setProps((p) => ({
					...p,
					data: {
						...p.data,
						...newData(p.data),
					},
				}));
			}
			return setProps({
				...$refs.current.props,
				data: {
					...$refs.current.props.data,
					...newData,
				},
			});
		},
		[],
	);

	useImperativeHandle(ref, () => modal, [modal]);

	return {
		modal,
		data: modal.data,
		setData,
	};
}

export function mergeModalType(map: ModalTypeMap) {
	return Object.assign(modalTypeMap, map);
}

export default useCommon;
