import React from "react";

export function createContext<T>(defaultValue: T) {
  const context = React.createContext(defaultValue);
  let setContext: (data: T) => void;
  function Provider(props: Readonly<React.PropsWithChildren<object>>) {
    console.log(context);
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
