import React, { Component } from "react";
import { Layout, Row, Col, Button, Icon } from "antd";
import styled from "styled-components";

import GuestLayout from "../layout/MainLayout";
import ImagePlaceholder from "../../assets/img/image-placeholder.png";

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
    <Button type="danger">
      <Icon type="camera" /> Camera
    </Button>
  </StyledUploadButton>
);

class UploadImages extends Component {
  state = { file: [], filePreview: null };

  handleFileChange = e => {
    const file = e.target.files[0];
    const filePreview = URL.createObjectURL(file);
    this.setState({ file, filePreview });
  };

  render() {
    const { filePreview } = this.state;
    return (
      <GuestLayout>
        <Content>
          <StyledPage>
            <Row className="image" type="flex" justify="center">
              <img src={filePreview || ImagePlaceholder} alt="Placeholder" />
            </Row>

            <Row className="buttons" type="flex" justify="center">
              <Col type="flex" justify="center">
                <UploadButton onChange={this.handleFileChange} />
              </Col>
              <Col type="flex" justify="center">
                <Button type="primary">
                  Next
                  <Icon type="right" />
                </Button>
              </Col>
            </Row>
          </StyledPage>
        </Content>
      </GuestLayout>
    );
  }
}

export default UploadImages;
