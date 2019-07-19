import * as React from "react";
import * as ReactDOM from "react-dom";
// import App from './App';
// import './index.css';
// import registerServiceWorker from './registerServiceWorker';
import App from "./component/App";
// 以下2行は入れ替え不可（「Failed to compile.」が起きる）
// (8, 1): Import sources within a group must be alphabetized.(（8, 1）：グループ内のインポート元はアルファベット順にする必要があります。)
import registerServiceWorker from "./materials/registerServiceWorker";
import "./stypes/index.css";

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
