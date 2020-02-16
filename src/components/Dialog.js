import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { Position } from "../styledComponents/Position";
import { Box } from "../styledComponents/Box";
import { Flex } from "../styledComponents/Flex";

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
  border-radius: 3px;
  overflow-y: auto;
  font-size: 12px;
  color: #586069;
  background-color: #fff;
  transform: translate(-50%, -50%);
  @media only screen and (min-width: 768px) {
    transform: none;
  }
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
  hasCloseButton: true,
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
      height={["100vh", "auto"]}
      left={["0", "auto"]}
      right="0"
      top={["0", "100%"]}
      overflow="hidden"
      border="none"
      padding="0"
      margin="0"
      fontSize="12px"
      zIndex="2"
      bg="rgba(0,0,0,0)"
      {...otherProps}
    >
      {hasOverlay && <DialogOverlay onClick={handleCloseClick} />}
      <DialogContent
        hasOverlay={hasOverlay}
        width={["300px", "100%"]}
        Height="100%"
        maxHeight={["80%", "100%"]}
        top={["50%", "0"]}
        left={["50%", "0"]}
      >
        {(title || hasCloseButton) && (
          <Box p="8px 10px" bg="#f6f8fa">
            <Flex justifyContent="space-between">
              {title && (
                <Box flex="1" fontWeight="600">
                  {title}
                </Box>
              )}
              {hasCloseButton && (
                <Box
                  display={["block", "none"]}
                  role="button"
                  onClick={handleCloseClick}
                  width="16px"
                  height="16px"
                  textAlign="center"
                >
                  <svg
                    aria-label="x"
                    height="16"
                    viewBox="0 0 12 16"
                    version="1.1"
                    width="12"
                    role="img"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"
                    ></path>
                  </svg>
                </Box>
              )}
            </Flex>

            {subtitle && <p>{subtitle}</p>}
          </Box>
        )}
        {props.children}
      </DialogContent>
    </DialogContainer>
  );
}

Dialog.defaultProps = defaultProps;
Dialog.propTypes = propTypes;
