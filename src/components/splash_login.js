import styled from "styled-components";
import defaultImg from "../images/yellowstone.jpg";
const loginDiv = styled.div`
  background-image: url(${defaultImg});
  min-height: 94vh;
  background-size: cover;
  background-position: center;
  z-index: -1;
  overflow: hidden;
`;
export default loginDiv;
