import PropTypes from "prop-types";
import styled from "styled-components";
import { PageHeader } from "antd";

const MyPageHeader = styled(PageHeader)`
  background: ${props => props.background};
`;

export default MyPageHeader;

MyPageHeader.propTypes = {
  background: PropTypes.string
};

MyPageHeader.defaultProps = {
  background: "white"
};
