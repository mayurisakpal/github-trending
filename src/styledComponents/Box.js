import styled from "styled-components";
import {
  space,
  color,
  layout,
  typography,
  flexbox,
  border,
  compose
} from "styled-system";

export const Box = styled("div")(
  compose(space, layout, flexbox, typography, color, border)
);
