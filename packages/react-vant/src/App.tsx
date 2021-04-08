import { useState } from "react";
import Overlay from "./overlay";
import "./App.less";
import { Popup } from "./popup/popup";
function App() {
  const [show, setShow] = useState(true);

  return (
    <div className="App">
      <button onClick={() => setShow(true)}>显示</button>
      <Popup show={show} onClose={() => setShow(false)}>
        <div style={{ background: "#fff", padding: "30px 50px" }}>dfasfd</div>
      </Popup>
    </div>
  );
}

export default App;
