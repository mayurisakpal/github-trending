import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box } from "../styledComponents/Box";
import { Flex } from "../styledComponents/Flex";
import { Position } from "../styledComponents/Position";
import { CursorPointer } from "../styledComponents/CursorPointer";
import Dialog from "./Dialog";

const CaretParent = styled(Box)`
  position: relative;
  padding-right: 12px;
  &::after {
    position: absolute;
    display: inline-block;
    width: 0;
    height: 0;
    content: "";
    border: 4px solid transparent;
    border-top-color: currentcolor;
    right: 0;
    top: calc(50% - 2px);
  }
`;

const OptionWrapper = styled(Flex)`
  cursor: pointer;
  color: #586069;
  &:hover {
    color: #24292e;
  }
`;

const propTypes = {
  handleTimespanDialogClick: PropTypes.func,
  timespanDialog: PropTypes.bool,
  handleTimespanListClick: PropTypes.func,
  timespanData: PropTypes.array,
  timespan: PropTypes.string,
  handleCloseClick: PropTypes.func
};

const defaultProps = {
  timespan: "Any",
  timespanDialog: false
};

export default function DateRangeOptions(props) {
  const {
    handleTimespanDialogClick,
    timespanDialog,
    handleTimespanListClick,
    timespanData,
    timespan,
    handleCloseClick,
    parentRef
  } = props;
  return (
    <Position position="relative" pt={["16px", "0"]} ref={parentRef}>
      <OptionWrapper
        alignItems="center"
        onClick={handleTimespanDialogClick}
        role="button"
        px={[null, "16px"]}
      >
        Date range:&nbsp;
        <CaretParent fontWeight="600">{timespan}</CaretParent>
      </OptionWrapper>
      <Dialog
        isOpen={timespanDialog}
        title="Adjust time span"
        height={["100vh", "176px"]}
        handleCloseClick={handleCloseClick}
      >
        <Box as="ul" bg="white">
          {timespanData.map((item, index) => (
            <CursorPointer
              display="flex"
              position="relative"
              as="li"
              borderTop="1px solid #eaecef"
              p="8px 8px 8px 30px"
              key={index}
              onClick={handleTimespanListClick.bind(null, item)}
            >
              {timespan && timespan === item && (
                <Position position="absolute" left="15px">
                  <svg
                    aria-label="check"
                    height="16"
                    viewBox="0 0 12 16"
                    version="1.1"
                    width="12"
                    role="img"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"
                    ></path>
                  </svg>
                </Position>
              )}
              <Box as="p" pl="8px">
                {item}
              </Box>
            </CursorPointer>
          ))}
        </Box>
      </Dialog>
    </Position>
  );
}

DateRangeOptions.defaultProps = defaultProps;
DateRangeOptions.propTypes = propTypes;
