import React, { Component } from "react";
import AceEditor from "react-ace";
import styled from "styled-components";
import "brace/mode/c_cpp";
import "brace/theme/monokai";

const StyledEditor = styled.div`
  border: 1px solid grey;
`;

class MyEditor extends Component {
  onLoad = editor => {
    editor.textInput.focus();
  };

  render() {
    return (
      <StyledEditor className="editor">
        <AceEditor
          mode="c_cpp"
          theme="monokai"
          name="editor"
          width="100%"
          height="300px"
          onLoad={this.onLoad}
          onChange={this.props.onValueChange}
          value={this.props.code}
          fontSize={14}
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2
          }}
        />
      </StyledEditor>
    );
  }
}

export default MyEditor;
