import { Modal } from 'antd';
import React from 'react';
import { type ModalActionType, useModal } from 'useKit';

type ModalProps = {
	list: number[];
	obj: Record<string, number>;
	title?: string;
};

type ModalReturnType = {
	success: boolean;
};

export type ModalAction = ModalActionType<ModalProps, ModalReturnType>;

const Component = React.forwardRef((_, ref) => {
	const {
		modal,
		data: { list, obj },
	} = useModal<ModalProps, ModalReturnType>(
		ref,
		{
			beforeModal: async (data) => {
				console.log(data);
				return { obj: { a: 3 } };
			},
			afterModal: (data) => {
				console.log(data, 'afterModal');
			},
			beforeCloseModal: (next, action) => {
				console.log(action);
				next();
			},
			afterCloseModal: (data, action) => {
				console.log(data, action);
			},
		},
		{
			list: [] as number[],
			obj: { a: 1 },
		},
	);

	const handleConfirm = () => {
		modal.endModal({ success: true });
	};

	console.log(list, obj);

	return (
		<Modal {...modal.props} onOk={handleConfirm}>
			123123123
		</Modal>
	);
});

export default Component;
