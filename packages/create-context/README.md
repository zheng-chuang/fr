```tsx
import { ProviderConnect, createContext } from "@goson/create-context";

const [useData] = createContext(new Date().toISOString());

function Display() {
  const [data] = useData();
  return (
    <div>
      <h2>当前时间为</h2>
      <div>{data}</div>
    </div>
  );
}

function Action() {
  const [, setData] = useData();
  return (
    <div>
      <button onClick={() => setData(new Date().toISOString())}>
        更新数据为当前时间
      </button>
    </div>
  );
}

function App() {
  return (
    <ProviderConnect>
      <Display />
      <Action />
    </ProviderConnect>
  );
}

export default App;
```