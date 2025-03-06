import { Button } from 'antd';
import { useRef } from 'react';
import Modal, { type ModalAction } from './Modal.tsx';

const Component = () => {
	const modalRef = useRef<ModalAction>(null);

	const fn = async () => {
		const ret = await modalRef.current?.modal({
			list: [],
			obj: { a: 1 },
			title: '123',
		});

		console.log(ret);
	};

	return (
		<div>
			<Button onClick={fn}>打开弹窗</Button>
			<Modal ref={modalRef} />
		</div>
	);
};

export default Component;
