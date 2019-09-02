import React, { Component } from "react";
import styled from "styled-components";
import { Typography, Row, Button, Icon } from "antd";
import { Subscribe } from "unstated";

import MainLayout from "../layout/MainLayout";
import Editor from "../../components/Editor";
import OCRContainer from "./OCRContainer";
import ImagePlaceholder from "../../assets/img/image-placeholder.png";

const { Title } = Typography;

const StyledPage = styled.div`
  padding: 0.5rem;
  min-height: 100vh;

  .image {
    margin-bottom: 2rem;

    img {
      max-width: 80%;
    }
  }

  .editor {
    margin: 0 auto;
    max-width: 80%;
  }

  .buttons {
    margin-top: 2rem;
  }
`;

class EditorPage extends Component {
  render() {
    return (
      <Subscribe to={[OCRContainer]}>
        {OCR => (
          <MainLayout>
            <StyledPage>
              <Title level={2}>Editor Page</Title>
              <Row className="image" type="flex" justify="center">
                <img
                  src={OCR.state.imageURL || ImagePlaceholder}
                  alt="Placeholder"
                />
              </Row>
              <Editor code={OCR.state.code} onValueChange={OCR.setCode} />
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
