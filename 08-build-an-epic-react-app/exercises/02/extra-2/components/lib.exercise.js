import styled from "@emotion/styled/macro";
import { Dialog as ReachDialog } from "@reach/dialog";
// 💯 We've defined all our colors in styles/colors.js
// and media-queries in styles/media-queries.js:
import * as colors from "styles/colors";
import * as mq from "styles/media-queries";

// 💯 Find all the places you're using those values and replace them with
// a reference to the values exported from those modules.

const buttonVariants = {
  primary: {
    // background: '#3f51b5',
    background: colors.indigo,
    // color: 'white',
    color: colors.base,
  },
  secondary: {
    // background: '#f1f2f7',
    background: colors.gray,
    // color: '#434449',
    color: colors.text,
  },
};
const Button = styled.button(
  {
    padding: "10px 15px",
    border: "0",
    lineHeight: "1",
    borderRadius: "3px",
  },
  ({ variant = "primary" }) => buttonVariants[variant]
);

const Input = styled.input({
  borderRadius: "3px",
  // border: '1px solid #f1f1f4',
  border: `1px solid ${colors.gray10}`,
  // background: '#f1f2f7',
  background: colors.gray,
  padding: "8px 12px",
});

const CircleButton = styled.button({
  borderRadius: "30px",
  padding: "0",
  width: "40px",
  height: "40px",
  lineHeight: "1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // background: 'white',
  background: colors.base,
  // color: '#434449',
  color: colors.text,
  // border: `1px solid #f1f1f4`,
  border: `1px solid ${colors.gray10}`,
  cursor: "pointer",
});

const Dialog = styled(ReachDialog)({
  maxWidth: "450px",
  borderRadius: "3px",
  paddingBottom: "3.5em",
  boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.2)",
  margin: "20vh auto",
  // '@media (max-width: 991px)': {
  [mq.small]: {
    width: "100%",
    margin: "10vh auto",
  },
});

const FormGroup = styled.div({
  display: "flex",
  flexDirection: "column",
});

export { Button, Input, CircleButton, Dialog, FormGroup };
