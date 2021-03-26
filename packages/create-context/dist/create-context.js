"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
function createContext(defaultValue) {
    var context = react_1.default.createContext(defaultValue);
    var setContext;
    function Provider(props) {
        console.log(context);
        var _a = react_1.default.useState(defaultValue), data = _a[0], setData = _a[1];
        setContext = react_1.default.useCallback(function (data) { return setData(data); }, []);
        return jsx_runtime_1.jsx(context.Provider, __assign({ value: data }, { children: props.children }), void 0);
    }
    var useContext = function () {
        var data = react_1.default.useContext(context);
        return [data, setContext];
    };
    return [{ Provider: Provider, Consumer: context.Consumer }, useContext];
}
exports.createContext = createContext;
