import styled from "../../styled";
import BaseSpinner from "./spinner";

export const Spinner = styled(BaseSpinner)`
  padding: 0;
  color: ${(props) => props.theme._ui.colors.accent.bg.default};
`;

export default Spinner;
