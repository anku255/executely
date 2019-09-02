import React from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import UploadImages from "../modules/ocr/UploadImages";
import EditorPage from "../modules/ocr/EditorPage";

export default function Routes() {
  return (
    <Router history={history}>
      <Route path="/" exact component={UploadImages} />
      <Route path="/editor" exact component={EditorPage} />
    </Router>
  );
}
