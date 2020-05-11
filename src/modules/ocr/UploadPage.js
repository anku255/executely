import React, { Component } from "react";
import { Layout, Row, Card, Button, Icon } from "antd";
import styled from "styled-components";
import { Subscribe } from "unstated";

import MainLayout from "../layout/MainLayout";
import Steps from "./components/Steps";
import ImagePlaceholder from "../../assets/img/image-placeholder.png";
import OCRContainer from "./OCRContainer";

const { Content } = Layout;

const StyledPage = styled.div`
  padding-top: 1rem;
  min-height: 100vh;

  .image-card {
    display: flex;
    width: 80%;
    margin: 0 auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      max-width: 100%;
      margin: 0 auto;
    }

    button {
      width: 100%;
    }

    .next-btn {
      margin-top: 1rem;
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }

  .buttons {
    margin-top: 2rem;
  }
`;

const StyledUploadButton = styled(Button)`
  position: relative;
  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    opacity: 0;
  }
`;

const UploadButton = props => (
  <StyledUploadButton disabled={props.disabled}>
    <input type="file" multiple={false} {...props} />
    <Icon type="file-image" /> New Image
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
               <Steps currentStep={0} />
              <StyledPage>
                <Row className="image-card">
                  <Card
                    cover={
                      <img
                        src={filePreview || ImagePlaceholder}
                        alt="Placeholder"
                      />
                    }
                  >
                    <UploadButton
                      onChange={this.handleFileChange}
                      disabled={OCR.state.loading}
                    />
                    <Row className="next-btn">
                      <Button
                        type="primary"
                        disabled={!file}
                        loading={OCR.state.loading}
                        onClick={() => OCR.getTextFromImage(file)}
                        block
                      >
                        <Icon type="file-search" />
                        Read Text
                      </Button>
                    </Row>
                  </Card>
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
