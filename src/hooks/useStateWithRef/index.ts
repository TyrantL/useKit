import React, {
	type Dispatch,
	type SetStateAction,
	useCallback,
	useRef,
} from 'react';

type GetStateAction<S> = () => S;

function useStateWithRef<S>(
	initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>, GetStateAction<S>];

function useStateWithRef<S = undefined>(): [
	S | undefined,
	Dispatch<SetStateAction<S | undefined>>,
	GetStateAction<S | undefined>,
];

function useStateWithRef<S>(initialState?: S) {
	const [state, setState] = React.useState(initialState);
	const stateRef = useRef(initialState);

	const getState = useCallback(() => stateRef.current, []);

	const setStateWithRef = useCallback((value: S) => {
		setState(value);
		stateRef.current = value;
	}, []);

	return [state, setStateWithRef, getState];
}

export default useStateWithRef;
