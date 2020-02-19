import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box } from "../styledComponents/Box";
import { Flex } from "../styledComponents/Flex";
import languageColors from "../json/languageColors";
import Button from "./Button";

const Anchor = styled(Flex)`
  color: #586069;
  svg {
    fill: #586069;
  }

  &:hover {
    color: #0366d6;
    text-decoration: none;
    svg {
      fill: #0366d6;
    }
  }
`;

const ListTitle = styled(Box)`
  word-break: break-word;
`;

const propTypes = {
  data: PropTypes.array
};

function RepositoriesList(props) {
  const { data } = props;
  return (
    <ul>
      {data.length > 0 &&
        data.map((item, index) => {
          const {
            id,
            description,
            full_name,
            html_url,
            language,
            forks_count,
            stargazers_count,
            owner
          } = item;
          return (
            <li key={id}>
              <Flex
                flexDirection="column"
                padding="16px"
                borderBottom="1px solid #e1e4e8"
              >
                <Flex justifyContent="space-between" alignItems="flex-start">
                  <Flex
                    as="a"
                    href={html_url}
                    target="_blank"
                    alignItems="flex-start"
                    color="#0366d6"
                    pr="8px"
                  >
                    <Box
                      as="svg"
                      aria-label="repo"
                      height="16px"
                      viewBox="0 0 12 16"
                      version="1.1"
                      width="12px"
                      role="img"
                      pt={["8px", "10px"]}
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"
                      ></path>
                    </Box>
                    <ListTitle
                      as="p"
                      pl="8px"
                      fontSize={["18px", "20px"]}
                      fontWeight="400"
                      flex="1"
                      wordWrap="break-word"
                    >
                      {full_name}
                    </ListTitle>
                  </Flex>
                  <Button
                    alignItems="center"
                    href={html_url}
                    size="small"
                    target="_blank"
                  >
                    <svg
                      aria-label="star"
                      height="16"
                      viewBox="0 0 14 16"
                      version="1.1"
                      width="14"
                      role="img"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"
                      ></path>
                    </svg>
                    <Box pl="8px">Star</Box>
                  </Button>
                </Flex>
                <Box py="8px" maxWidth="680px" pr="68px">
                  {description}
                </Box>
                <Flex flexDirection={["column", "row"]}>
                  <Flex alignItems="center">
                    {language && (
                      <Flex alignItems="center" mr="16px">
                        <Box
                          as="span"
                          borderRadius="50%"
                          bg={
                            languageColors[language]
                              ? languageColors[language].color
                              : "transparent"
                          }
                          width="12px"
                          height="12px"
                          mr="4px"
                        ></Box>
                        {language}
                      </Flex>
                    )}
                    {forks_count > 0 && (
                      <Anchor
                        alignItems="center"
                        as="a"
                        href={`${html_url}/network/members`}
                        target="_blank"
                        mr="16px"
                        title={`${forks_count} forks`}
                      >
                        <svg
                          aria-label="repo-forked"
                          height="16"
                          viewBox="0 0 10 16"
                          version="1.1"
                          width="10"
                          role="img"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 1a1.993 1.993 0 00-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 002 1a1.993 1.993 0 00-1 3.72V6.5l3 3v1.78A1.993 1.993 0 005 15a1.993 1.993 0 001-3.72V9.5l3-3V4.72A1.993 1.993 0 008 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"
                          ></path>
                        </svg>
                        <Box as="p" pl="4px">
                          {forks_count}
                        </Box>
                      </Anchor>
                    )}
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    flex="1"
                    alignItems="center"
                    pt={["8px", "0"]}
                  >
                    {owner.avatar_url && (
                      <Flex alignItems="center" pr="8px">
                        <Box as="p" pr="8px">
                          Built by:
                        </Box>
                        <img
                          src={owner.avatar_url}
                          alt={owner.login}
                          width="25"
                          height="25"
                          title={owner.login}
                        />
                      </Flex>
                    )}

                    <Flex alignItems="center" ml={[null, "auto"]}>
                      <svg
                        aria-label="star"
                        height="16"
                        viewBox="0 0 14 16"
                        version="1.1"
                        width="14"
                        role="img"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"
                        ></path>
                      </svg>
                      <Box as="p" pl="4px">
                        {stargazers_count} stars
                      </Box>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </li>
          );
        })}
    </ul>
  );
}

RepositoriesList.propTypes = propTypes;
export default RepositoriesList;
