import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box } from "../styledComponents/Box";
import { Flex } from "../styledComponents/Flex";
import { Position } from "../styledComponents/Position";
import { LanguagesData } from "../json/language";
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

const Input = styled.input`
  display: block;
  width: 100%;
  max-width: 100%;
  padding: 8px;
  border: 1px solid #dfe2e5;
  border-radius: 3px;
  font-size: 14px;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
  box-sizing: border-box;

  ::-webkit-input-placeholder {
    /* Edge */
    color: #a3aab1;
    opacity: 0.54;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #a3aab1;
    opacity: 0.54;
  }

  ::placeholder {
    color: #a3aab1;
    opacity: 0.54;
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
  handleLanguageDialogClick: PropTypes.func,
  programmingLanguage: PropTypes.string,
  languageDialog: PropTypes.bool,
  handleLanguageInputChange: PropTypes.func,
  handleLanguageReset: PropTypes.func,
  programmingLanguageInput: PropTypes.string,
  handleLanguageListClick: PropTypes.func,
  handleCloseClick: PropTypes.func
};

const defaultProps = {
  programmingLanguage: "Any",
  languageDialog: false,
  programmingLanguageInput: ""
};

export default function LangauageOptions(props) {
  const {
    handleLanguageDialogClick,
    programmingLanguage,
    languageDialog,
    handleLanguageInputChange,
    handleLanguageReset,
    programmingLanguageInput,
    handleLanguageListClick,
    handleCloseClick,
    parentRef
  } = props;
  return (
    <Position position="relative" pr="8px" pt={["16px", "0"]} ref={parentRef}>
      <OptionWrapper
        alignItems="center"
        onClick={handleLanguageDialogClick}
        role="button"
        px={[null, "16px"]}
        cursor="pointer"
      >
        Language:&nbsp;
        <CaretParent fontWeight="600">{programmingLanguage}</CaretParent>
      </OptionWrapper>
      <Dialog
        isOpen={languageDialog}
        handleCloseClick={handleCloseClick}
        maxHeight={["100vh", "400px"]}
      >
        <Box p="10px" borderY="1px solid #dfe2e5">
          <Input
            onChange={handleLanguageInputChange}
            value={programmingLanguageInput}
            placeholder="Filter Languages"
            type="text"
          />
        </Box>
        <Box
          as="ul"
          bg="white"
          overflowY="auto"
          height="100%"
          maxHeight="310px"
        >
          {(programmingLanguage !== "Any" || programmingLanguageInput) && (
            <CursorPointer
              display="flex"
              position="relative"
              as="li"
              alignItems="center"
              p="8px 8px 8px 30px"
              borderBottom="1px solid #eaecef"
              onClick={handleLanguageReset}
            >
              <Position position="absolute" left="15px" fontSize="0px">
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
              </Position>
              <Box as="p" pl="8px">
                Clear Language
              </Box>
            </CursorPointer>
          )}
          {LanguagesData.filter(item =>
            item
              .toLocaleLowerCase()
              .includes(programmingLanguageInput.toLocaleLowerCase())
          ).map((item, index) => (
            <CursorPointer
              display="flex"
              position="relative"
              as="li"
              borderBottom="1px solid #eaecef"
              p="8px 8px 8px 30px"
              key={index}
              onClick={handleLanguageListClick.bind(null, item)}
            >
              {programmingLanguage && programmingLanguage === item && (
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

LangauageOptions.defaultProps = defaultProps;
LangauageOptions.propTypes = propTypes;
