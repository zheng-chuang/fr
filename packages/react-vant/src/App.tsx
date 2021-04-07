import { useState } from "react";
import Overlay from "./overlay";
function App() {
  const [show, setShow] = useState(false)
  return (
    <div className="App">
      <button onClick={() => setShow(!show)}>显示</button>
      <Overlay show={show} onClick={() => setShow(!show)}>得到的</Overlay>
    </div>
  );
}

export default App;
