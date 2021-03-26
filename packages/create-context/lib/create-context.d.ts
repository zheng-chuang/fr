import React from "react";
declare type ProviderType = (props: Readonly<React.PropsWithChildren<object>>) => JSX.Element;
declare type ConsumerType<T> = React.Consumer<T>;
declare type UseContextType<T> = () => (T | ((data: T) => void))[];
export declare function createContext<T>(defaultValue: T): [{
    Provider: ProviderType;
    Consumer: ConsumerType<T>;
}, UseContextType<T>];
export {};
