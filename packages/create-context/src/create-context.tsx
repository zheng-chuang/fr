import React from "react";

type ProviderType = (
  props: Readonly<React.PropsWithChildren<object>>
) => JSX.Element;
type ConsumerType<T> = React.Consumer<T>;
type UseContextType<T> = () => (T | ((data: T) => void))[];
export default function createContext<T>(
  defaultValue: T
): [{ Provider: ProviderType; Consumer: ConsumerType<T> }, UseContextType<T>] {
  const context = React.createContext(defaultValue);
  let setContext: (data: T) => void;
  function Provider(props: Readonly<React.PropsWithChildren<object>>) {
    const [data, setData] = React.useState(defaultValue);
    setContext = React.useCallback((data: T) => setData(data), []);
    return <context.Provider value={data}>{props.children}</context.Provider>;
  }

  const useContext = () => {
    const data = React.useContext(context);
    return [data, setContext];
  };
  return [{ Provider, Consumer: context.Consumer }, useContext];
}
