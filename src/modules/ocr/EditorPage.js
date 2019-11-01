import React, { Component } from "react";
import styled from "styled-components";
import { Row, Button, Icon, Select } from "antd";
import { Subscribe } from "unstated";

import MainLayout from "../layout/MainLayout";
import PageHeader from "../layout/PageHeader";
import Editor from "./components/Editor";
import OCRContainer from "./OCRContainer";
import ImagePlaceholder from "../../assets/img/image-placeholder.png";
import { languageList, themeList, fontSizeList } from "../../config/constants";

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
      display: flex;
      flex-wrap: wrap;
      background: #fff;
      padding: 1.5rem 2rem;

      .ant-select:not(:last-child) {
        margin-right: 0.5rem;
      }
    }
  }

  .buttons {
    margin-top: 2rem;
  }
`;

const LanguageSelectList = props => (
  <Select
    value={props.value}
    onChange={props.handleChange}
    loading={props.isDetectingLanguage}
  >
    {languageList.map(lang => (
      <Option key={lang.value} value={lang.value}>
        {lang.label}
      </Option>
    ))}
  </Select>
);

const ThemeSelectList = props => (
  <Select defaultValue="Select Theme" onChange={props.handleChange}>
    {themeList.map(theme => (
      <Option key={theme.value} value={theme.value}>
        {theme.label}
      </Option>
    ))}
  </Select>
);

const FontSizeSelectList = props => (
  <Select defaultValue="Change Font Size" onChange={props.handleChange}>
    {fontSizeList.map(size => (
      <Option key={size.value} value={size.value}>
        {size.label}
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
                  <LanguageSelectList
                    handleChange={OCR.setLanguage}
                    value={OCR.state.languageSelectValue}
                    isDetectingLanguage={OCR.state.isDetectingLanguage}
                  />
                  <ThemeSelectList handleChange={OCR.setTheme} />
                  <FontSizeSelectList handleChange={OCR.setFontSize} />
                </Row>
                <Editor
                  code={OCR.state.code}
                  syntaxCode={OCR.state.lang_syntaxCode}
                  onValueChange={OCR.setCode}
                  theme={OCR.state.editor_theme}
                  fontSize={OCR.state.editor_fontSize}
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
