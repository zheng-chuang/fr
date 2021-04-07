import { deepAssign } from "../utils/deep-assign";
import defaultMessages from "./lang/zh-CN";

type Message = Record<string, any>;
type Messages = Record<string, Message>;

let lang = "zh-CN";
const messages = {
  "zh-CN": defaultMessages,
};

export default {
  messages(): Message {
    // @ts-ignore
    return messages[lang];
  },

  use(newLang: string, newMessages?: Message) {
    lang = newLang;
    this.add({ [newLang]: newMessages });
  },

  add(newMessages: Message = {}) {
    deepAssign(messages, newMessages);
  },
};
