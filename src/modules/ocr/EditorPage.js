import React, { Component } from "react";
import styled from "styled-components";
import { Col, Row, Button, Icon, Select } from "antd";
import { Subscribe } from "unstated";

import MainLayout from "../layout/MainLayout";
import PageHeader from "../layout/PageHeader";
import Editor from "./components/Editor";
import OCRContainer from "./OCRContainer";
import ImagePlaceholder from "../../assets/img/image-placeholder.png";
import { languageList, themeList } from "../../config/constants";

const { Option } = Select;

const StyledPage = styled.div`
  padding-top: 1rem;
  min-height: 100vh;

  .image {
    margin-bottom: 2rem;

    img {
      max-width: 80%;
    }
  }

  .editor-container {
    margin: 0 auto;
    max-width: 80%;

    .config {
      margin-bottom: 0.5rem;
    }
  }

  .buttons {
    margin-top: 2rem;
  }
`;

const LanguageSelectList = props => (
  <Select defaultValue="Select Language" onChange={props.handleChange}>
    {languageList.map(lang => (
      <Option key={lang.value} value={lang.value}>
        {lang.label}
      </Option>
    ))}
  </Select>
);
const ThemeSelectList = props => (
  <Select defaultValue="cobalt" onChange={props.handleChange}>
    {themeList.map(lang => (
      <Option key={lang.value} value={lang.value}>
        {lang.label}
      </Option>
    ))}
  </Select>
);

class EditorPage extends Component {
  render() {
    return (
      <Subscribe to={[OCRContainer]}>
        {OCR => (
          <MainLayout>
            <PageHeader
              onBack={() => this.props.history.push("/")}
              title="Editor Page"
            />
            <StyledPage>
              <Row className="image" type="flex" justify="center">
                <img
                  src={OCR.state.imageURL || ImagePlaceholder}
                  alt="Placeholder"
                />
              </Row>
              <div className="editor-container">
                <Row className="config">
                  <Col span={4}>
                    <LanguageSelectList handleChange={OCR.setLanguage} />
                  </Col>
                  <Col span={4}>
                    <ThemeSelectList handleChange={OCR.setTheme} />
                  </Col>
                </Row>
                <Editor
                  code={OCR.state.code}
                  syntaxCode={OCR.state.lang_syntaxCode}
                  onValueChange={OCR.setCode}
                  theme={OCR.state.editor_theme}
                />
              </div>
              <Row className="buttons" type="flex" justify="center">
                <Button
                  type="primary"
                  disabled={!OCR.state.code}
                  loading={OCR.state.loading}
                  onClick={OCR.getOutputFromCode}
                >
                  Get Output
                  <Icon type="right" />
                </Button>
              </Row>
            </StyledPage>
          </MainLayout>
        )}
      </Subscribe>
    );
  }
}

export default EditorPage;
