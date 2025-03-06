import { Button, message } from 'antd';
import {useOnce} from 'useKit';

export interface useOnceProps {
  /** Optional handler */
  fn: () => void;
}

const Once = () => {

  const fn = () => {
    message.info('click')
  }

  const sleep = (time = 1000) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };

  const once = useOnce(fn)
  const async = useOnce(async () => {
    message.info('start')
    await sleep(1000)
    message.info('end')
  })

  return (
    <div>
      <Button onClick={fn}>Button</Button>
      <Button onClick={once}>只触发一次</Button>
      <Button onClick={async}>异步</Button>
    </div>
  );
};

export default Once;
