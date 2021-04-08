import { useState } from "react";
import Overlay from "./overlay";
function App() {
  const [show, setShow] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setShow(true)}>显示</button>
      <Overlay show={show} style={{ zIndex: 1 }} onClick={() => setShow(false)}>
        得到的
      </Overlay>
    </div>
  );
}

export default App;
