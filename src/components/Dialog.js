import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { Position } from "../styledComponents/Position";
import { Box } from "../styledComponents/Box";

const DialogOverlay = styled(Position)`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  position: absolute;
`;

const DialogContainer = styled(Position)`
  ${props =>
    !props.hasOverlay &&
    css`
      border: 1px solid rgba(27, 31, 35, 0.15);
      box-shadow: 0 3px 12px rgba(27, 31, 35, 0.15);
    `}
`;
const DialogContent = styled(Position)`
  ${props =>
    props.hasOverlay &&
    css`
      border: 1px solid rgba(27, 31, 35, 0.15);
      box-shadow: 0 3px 12px rgba(27, 31, 35, 0.15);
    `}
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  overflow-y: auto;
  font-size: 12px;
  color: #586069;
  background-color: #fff;
`;

const propTypes = {
  hasOverlay: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  hasCloseButton: PropTypes.bool,
  handleCloseClick: PropTypes.func
};

const defaultProps = {
  hasOverlay: true,
  title: "Select a language",
  subtitle: "",
  hasCloseButton: false,
  handleCloseClick: PropTypes.func
};

export default function Dialog(props) {
  const {
    hasOverlay,
    title,
    subtitle,
    hasCloseButton,
    handleCloseClick,
    ...otherProps
  } = props;
  return (
    <DialogContainer
      as="dialog"
      open={props.isOpen}
      position={["fixed", "absolute"]}
      width={["100%", "300px"]}
      height={["100vh", "400px"]}
      left={["0", "auto"]}
      right="0"
      top={["0", "100%"]}
      overflow="hidden"
      border="none"
      padding="0"
      margin="0"
      fontSize="12px"
      zIndex="2"
      bg="transparent"
      {...otherProps}
    >
      {hasOverlay && <DialogOverlay onClick={handleCloseClick} />}
      <DialogContent
        hasOverlay={hasOverlay}
        width={["300px", "100%"]}
        Height="100%"
        maxHeight={["80%", "100%"]}
      >
        {(title || hasCloseButton) && (
          <Box p="8px 10px" bg="#f6f8fa">
            {title && <p>{title}</p>}
            {subtitle && <p>{subtitle}</p>}
            {hasCloseButton && (
              <div role="button" onClick={handleCloseClick}>
                X
              </div>
            )}
          </Box>
        )}
        {props.children}
      </DialogContent>
    </DialogContainer>
  );
}

Dialog.defaultProps = defaultProps;
Dialog.propTypes = propTypes;
