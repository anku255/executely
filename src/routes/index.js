import React from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import UploadImages from "../modules/ocr/UploadImages";

export default function Routes() {
  return (
    <Router history={history}>
      <Route path="/" component={UploadImages} />
    </Router>
  );
}
