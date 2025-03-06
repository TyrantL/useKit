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
		data: T,
		pause: (result: any) => void,
		// biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
	) => void | Partial<T> | Promise<void | Partial<T>>;
	afterModal?: (data: T) => void;
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

export interface ModalActionType<T, U> {
	modal: (newData: T) => Promise<U>;
}

export interface ModalRef<P extends ModalType, T, U>
	extends ModalActionType<T, U> {
	readonly visible: boolean;
	readonly data: T;
	readonly props: ModalPropsTypeMap[P];
	readonly options: ModalHooksOption<P, T, U>;
	readonly modalPromise: null | Promise<U> | PromiseLike<U>;

	endModal: (result: U) => void;
	cancelModal: (reason: any) => void;
}
