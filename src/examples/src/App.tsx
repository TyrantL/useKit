import { Button } from 'antd';
import {useOnce} from 'useKit';

function App() {
  const fn = useOnce(() => {
    console.log(123);
  })

  return (
    <>
       <Button onClick={fn}>测试</Button>
    </>
  )
}

export default App
