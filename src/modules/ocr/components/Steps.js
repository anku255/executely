import PropTypes from "prop-types";
import React from 'react';
import styled from 'styled-components';
import { Steps } from 'antd';

const { Step } = Steps;

const StyledSteps = styled.div`
  margin-bottom: 1.6rem;
  padding: 2.4rem 1.6rem;
  background: white;
`;

const StepsComponent = ({ currentStep }) => {
  return (
    <StyledSteps>
      <Steps current={currentStep} size="small">
        <Step title="Upload Image containing code" />
        <Step title="Remove typos from code" subTitle="(if present)" />
        <Step title="Execute the code and get output" />
      </Steps>
    </StyledSteps>
  )
}

StepsComponent.propTypes = {
  currentStep: PropTypes.number
}


export default StepsComponent;
