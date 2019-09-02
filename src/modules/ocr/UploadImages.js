import React, { Component } from "react";
import { Layout, Row, Col, Button, Icon } from "antd";
import styled from "styled-components";
import { Subscribe } from "unstated";

import MainLayout from "../layout/MainLayout";
import ImagePlaceholder from "../../assets/img/image-placeholder.png";
import OCRContainer from "./OCRContainer";

const { Content } = Layout;

const StyledPage = styled.div`
  padding: 0.5rem;
  min-height: 100vh;

  .image {
    margin-bottom: 2rem;

    img {
      max-width: 80%;
    }
  }

  .buttons {
    margin-top: 2rem;
  }
`;

const StyledUploadButton = styled.div`
  positon: relative;
  width: 10rem;

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    opacity: 0;
  }

  button {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
`;

const UploadButton = props => (
  <StyledUploadButton>
    <input type="file" multiple={false} {...props} />
    <Button type="danger" disabled={props.disabled}>
      <Icon type="camera" /> Camera
    </Button>
  </StyledUploadButton>
);

class UploadImages extends Component {
  state = { file: null, filePreview: null };

  handleFileChange = e => {
    const file = e.target.files[0];
    const filePreview = URL.createObjectURL(file);
    this.setState({ file, filePreview });
  };

  render() {
    const { file, filePreview } = this.state;
    return (
      <Subscribe to={[OCRContainer]}>
        {OCR => (
          <MainLayout>
            <Content>
              <StyledPage>
                <Row className="image" type="flex" justify="center">
                  <img
                    src={filePreview || ImagePlaceholder}
                    alt="Placeholder"
                  />
                </Row>

                <Row className="buttons" type="flex" justify="center">
                  <Col type="flex" justify="center">
                    <UploadButton
                      onChange={this.handleFileChange}
                      disabled={OCR.state.loading}
                    />
                  </Col>
                  <Col type="flex" justify="center">
                    <Button
                      type="primary"
                      disabled={!file}
                      loading={OCR.state.loading}
                      onClick={() => OCR.getTextFromImage(file)}
                    >
                      Next
                      <Icon type="right" />
                    </Button>
                  </Col>
                </Row>
              </StyledPage>
            </Content>
          </MainLayout>
        )}
      </Subscribe>
    );
  }
}

export default UploadImages;
