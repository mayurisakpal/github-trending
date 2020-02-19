import React, { useState, useEffect, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { Box } from "./styledComponents/Box";
import { Flex } from "./styledComponents/Flex";
import RepositoriesList from "../src/components/RepositoriesList";
import LanguageOptions from "../src/components/LanguageOptions";
import DateRangeOtions from "../src/components/DateRangeOptions";
import Button from "../src/components/Button";
import Loader from "../src/components/Loader";

//TODO: need to implement this
const githubUsers = () => {
  return fetch("https://api.github.com/users").then(data => data.json());
};

const theme = {
  breakpoints: ["768px"]
};

const createTimespan = timeEntity => {
  const timespanObject = {
    Daily: 1,
    Weekly: 7,
    Monthly: 30,
    Yearly: 365
  };
  if (!timespanObject[timeEntity]) {
    return;
  }

  const currentDate = new Date();
  const previousDate = new Date(currentDate);

  previousDate.setDate(previousDate.getDate() - timespanObject[timeEntity]);

  const currentDateIso = currentDate.toISOString();
  const currentDateIsoFormatted = currentDateIso.slice(
    0,
    currentDateIso.lastIndexOf(".")
  );
  const previousDateIso = previousDate.toISOString();
  const previousDateIsoFormatted = previousDateIso.slice(
    0,
    previousDateIso.lastIndexOf(".")
  );
  return `${previousDateIsoFormatted}..${currentDateIsoFormatted}`;
};

function App() {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(1);
  const [error, setError] = useState(false);
  const [programmingLanguage, setLanguage] = useState("");
  const [programmingLanguageInput, setLanguageInput] = useState("");
  const [timespan, setTimespan] = useState("");
  const [languageDialog, setLanguageDialog] = useState(false);
  const [timespanDialog, setTimespanDialog] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [fetchStatus, setFetchStatus] = useState(false);
  const laguageDialogRef = useRef(null);
  const dateRangeDialogRef = useRef(null);

  const githubRepos = () => {
    const hasTimeSpan = timespan && createTimespan(timespan);
    const fetchurl = `https://api.github.com/search/repositories?q=${
      !programmingLanguage && hasTimeSpan
        ? ""
        : `language:${programmingLanguage || "&nbsp;"}`
    }${
      hasTimeSpan ? `+created:${createTimespan(timespan)}` : "&nbsp;"
    }&sort=stars&order=desc&page=${pageNumber}&per_page=15`;
    return fetch(fetchurl)
      .then(data => data.json())
      .catch(error => {
        console.warn(error);
      });
  };

  useEffect(() => {
    setFetchStatus(true);
    githubRepos()
      .then(results => {
        setTotalCount(results.total_count);
        setData(prevState => {
          if (results.items) {
            if (!programmingLanguage && pageNumber === 1) {
              return results.items;
            } else {
              return [...prevState, ...results.items];
            }
          } else {
            console.warn("Api rate limit exceeded");
            return [];
          }
        });
        setFetchStatus(false);
      })
      .catch(error => {
        setFetchStatus(false);
        setError(true);
        console.warn(error);
      });
  }, [programmingLanguage, timespan, pageNumber]);

  const handleLanguageInputChange = event => {
    setLanguageInput(event.target.value);
  };

  const handleLanguageListClick = item => {
    if (item === programmingLanguage) {
      setLanguage("");
    } else {
      setLanguage(item);
    }
    setLanguageInput("");
    setLanguageDialog(false);
    setData([]);
    setPageNumber(1);
  };

  const handleLanguageDialogClick = () => {
    setLanguageDialog(true);
    setTimespanDialog(false);
  };
  const handleLanguageReset = () => {
    setLanguage("");
    setLanguageDialog(false);
    setPageNumber(1);
  };
  const handleTimespanDialogClick = () => {
    setTimespanDialog(true);
    setLanguageDialog(false);
  };

  const handleTimespanListClick = timeEntity => {
    if (timeEntity === timespan) {
      setTimespan("Any");
    } else {
      setTimespan(timeEntity);
    }
    setTimespanDialog(false);
    setPageNumber(1);
    setData([]);
  };

  const handleMainClick = event => {
    if (languageDialog && !laguageDialogRef.current.contains(event.target)) {
      setLanguageDialog(false);
    } else if (
      timespanDialog &&
      !dateRangeDialogRef.current.contains(event.target)
    ) {
      setTimespanDialog(false);
    }
  };

  const handleLanguageDialogCloseClick = () => setLanguageDialog(false);

  const handleDateRangeDialogCloseClick = () => setTimespanDialog(false);

  const timespanData = ["Daily", "Weekly", "Monthly", "Yearly"];

  const handleLoadMore = () => {
    setFetchStatus(true);
    setPageNumber(prevState => ++prevState);
  };

  const dataLength = data.length;
  return (
    <ThemeProvider theme={theme}>
      <Flex
        as="main"
        flexDirection="column"
        alignItems="center"
        onClick={handleMainClick}
      >
        <Box as="section" color="#586069" fontSize="16px" width="100%">
          <Box
            as="header"
            p="40px 16px"
            bg="#fafbfc"
            textAlign="center"
            borderY="1px solid #e1e4e8"
          >
            <Box as="h1" fontSize="40px" fontWeight="600">
              Trending
            </Box>
            <p>See what the GitHub community is most excited about today.</p>
          </Box>
          <Box
            p="40px 16px"
            bg="white"
            maxWidth="1012px"
            mx="auto"
            textAlign="center"
            fontSize="16px"
          >
            <Box
              borderX="1px solid #e1e4e8"
              borderBottom={
                dataLength > 0 && !fetchStatus ? null : "1px solid #e1e4e8"
              }
              borderRadius="3px"
              textAlign="left"
            >
              <Flex
                as="header"
                borderY="1px solid #e1e4e8"
                flexDirection={["column", "row"]}
                padding="16px"
                backgroundColor="#f6f8fa"
                justifyContent="space-between"
              >
                <Flex color="#24292e" fontSize="16px" fontWeight="600">
                  Repositories
                </Flex>
                <Flex
                  alignItems={["flex-start", "center"]}
                  flexDirection={["column", "row"]}
                >
                  <LanguageOptions
                    handleLanguageDialogClick={handleLanguageDialogClick}
                    programmingLanguage={programmingLanguage || "Any"}
                    languageDialog={languageDialog}
                    handleLanguageInputChange={handleLanguageInputChange}
                    handleLanguageReset={handleLanguageReset}
                    programmingLanguageInput={programmingLanguageInput}
                    handleLanguageListClick={handleLanguageListClick}
                    parentRef={laguageDialogRef}
                    handleCloseClick={handleLanguageDialogCloseClick}
                  />
                  <DateRangeOtions
                    handleTimespanDialogClick={handleTimespanDialogClick}
                    timespanDialog={timespanDialog}
                    handleTimespanListClick={handleTimespanListClick}
                    timespanData={timespanData}
                    timespan={timespan || "Any"}
                    parentRef={dateRangeDialogRef}
                    handleCloseClick={handleDateRangeDialogCloseClick}
                  />
                </Flex>
              </Flex>
              <RepositoriesList data={data} />
              <Box textAlign="center" px="16px">
                {fetchStatus ? (
                  <Loader my="26px" />
                ) : error ? (
                  <Box as="p" my="26px">
                    Somethng went wrong, Please try again later.
                  </Box>
                ) : (
                  !totalCount && (
                    <>
                      <Box as="p" mt="26px">
                        It looks like we don’t have any trending repositories
                        for <strong>{programmingLanguage}</strong>.
                      </Box>
                      <Box as="p" mt="16px">
                        If you create an <strong>{programmingLanguage}</strong>{" "}
                        repository, you can really own the place.
                      </Box>
                      <Box as="p" mt="16px" mb="26px">
                        We’d even let it slide if you started calling yourself
                        the mayor.
                      </Box>
                    </>
                  )
                )}
              </Box>
            </Box>
            <Box pt="26px">
              {!fetchStatus &&
                !error &&
                dataLength > 0 &&
                dataLength !== totalCount && (
                  <Button mx="auto" onClick={handleLoadMore}>
                    Load more
                  </Button>
                )}
            </Box>
          </Box>
        </Box>
      </Flex>
    </ThemeProvider>
  );
}

export default App;
