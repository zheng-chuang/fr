import React from "react";

export const providers: React.FC[] = [];

type UseContextType<T> = () => [T, (data: T) => void];

export function createContext<T>(
  defaultValue: T
): [UseContextType<T>, React.Consumer<T>] {

  const context = React.createContext(defaultValue);
  let setContext: (data: T) => void;

  const Provider: React.FC = (props) => {
    const [data, setData] = React.useState(defaultValue);
    setContext = React.useCallback((data: T) => setData(data), []);
    return <context.Provider value={data}>{props.children}</context.Provider>;
  };
  const useContext: UseContextType<T> = () => {
    const data = React.useContext(context);
    return [data, setContext];
  };
  providers.push(Provider);
  return [useContext, context.Consumer];
}
