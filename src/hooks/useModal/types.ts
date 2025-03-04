export type ModalType = 'modal' | 'drawer';

export type ModalAction = 'end' | 'cancel';

export type ModalTypeMap = Record<
	ModalType,
	{
		visible: string;
		onClose: string;
	}
>;

export type ModalHooksOption<P extends ModalType, T, U> = {
	beforeModal?: (
		data: Partial<T>,
		pause: (result: any, isError?: boolean) => void,
	) => undefined | T | Promise<undefined | T>;
	afterModal?: (data: Partial<T>) => void;
	beforeCloseModal?: (
		next: () => void,
		action: ModalAction,
		modal: ModalRef<P, T, U>,
	) => void | Promise<void>;
	afterCloseModal?: (
		data: Partial<T>,
		action: ModalAction,
		modal: ModalRef<P, T, U>,
	) => void | Promise<void>;
};

export type ModalPropsTypeMap = {
	modal: {
		visible: boolean;
		onClose: () => void;
	};
	drawer: {
		visible?: boolean;
		onClose?: () => void;
	};
};

export interface ModalRef<P extends ModalType, T, U> {
	readonly visible: boolean;
	readonly data: Partial<T>;
	readonly props: ModalPropsTypeMap[P];
	readonly options: ModalHooksOption<P, T, U>;
	readonly modalPromise: null | Promise<U> | PromiseLike<U>;

	modal(newData: T): Promise<U>;

	endModal: (result: U) => void;
	cancelModal: (reason: any) => void;
}
