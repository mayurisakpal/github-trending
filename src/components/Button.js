import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { Flex } from "../styledComponents/Flex";

const propTypes = {
  size: PropTypes.oneOf(["small", "medium"]),
  variant: PropTypes.oneOf(["primary", "default"]),
  onClick: PropTypes.func,
  href: PropTypes.string,
  children: PropTypes.node
};

const defaultProps = {
  size: "medium",
  variant: "default"
};

const ButtonWrapper = styled(Flex)`
  text-transform: capitalize;
  position: relative;
  background: ${props =>
    props.variant === "primary"
      ? "#0366d6"
      : "linear-gradient(-180deg,#fafbfc,#eff3f6 90%)"};
  border-width: 1px;
  border-style: solid;
  border-color: ${props =>
    props.variant === "primary" ? "#0366d6" : "#e1e4e8"};
  color: ${props => (props.variant === "primary" ? "#fff" : "#586069")};
  font-size: ${props => (props.size === "small" ? "12px" : "16px")};
  padding: ${props => (props.size === "small" ? "3px 10px" : "6px 14px;")};
  ${props =>
    props.href &&
    css`
      text-decoration: none;
      &:hover {
        text-decoration: none;
      }
    `}
`;

export default function Button(props) {
  const { children, size, variant, onClick, href, ...otherProps } = props;
  return (
    <ButtonWrapper
      borderRadius="3px"
      fontWeight="600"
      lineHeight="20px"
      as={href ? "a" : "button"}
      href={href}
      size={size}
      variant={variant}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </ButtonWrapper>
  );
}

Button.defaultProps = defaultProps;
Button.propTypes = propTypes;
