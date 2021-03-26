"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
var react_1 = __importDefault(require("react"));
function createContext(defaultValue) {
    var context = react_1.default.createContext(defaultValue);
    var setContext;
    function Provider(props) {
        var _a = react_1.default.useState(defaultValue), data = _a[0], setData = _a[1];
        setContext = react_1.default.useCallback(function (data) { return setData(data); }, []);
        return react_1.default.createElement(context.Provider, { value: data }, props.children);
    }
    var useContext = function () {
        var data = react_1.default.useContext(context);
        return [data, setContext];
    };
    return [{ Provider: Provider, Consumer: context.Consumer }, useContext];
}
exports.createContext = createContext;
