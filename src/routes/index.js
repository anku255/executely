import React from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import UploadPage from "../modules/ocr/UploadPage";
import EditorPage from "../modules/ocr/EditorPage";

export default function Routes() {
  return (
    <Router history={history}>
      <Route path="/" exact component={UploadPage} />
      <Route path="/editor" exact component={EditorPage} />
    </Router>
  );
}
