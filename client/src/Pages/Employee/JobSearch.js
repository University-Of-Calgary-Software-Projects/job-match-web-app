import { Grow, Tooltip, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import Slide from "@mui/material/Slide";
import Fade from "@mui/material/Fade";
import Autocomplete from "@mui/material/Autocomplete";
import Divider from "@mui/material/Divider";
import { useHistory } from "react-router-dom";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { blueGrey, red } from "@mui/material/colors";
import styled from "@emotion/styled";
import PostAddIcon from "@mui/icons-material/PostAdd";

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#18385C" : "white",
}));

const CustomSearch = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#18385C" : "white",
}));

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#B2BAC2" : "#6F7E86",
}));

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function JobSearch() {
  //const [show, setShow] = useState(true);
  const [queryResults, setQueryResults] = useState([]);
  const history = useHistory();

  const handleChange = (query) => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/search`;
    const raw = JSON.stringify({
      searchTerm: `${query}`,
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setQueryResults(data.results);
      })
      .catch((error) => console.error());
  };

  return (
    <Box
      sx={{
        p: "40px",
        height: "calc(100vh - 64px)",
        maxHeight: "calc(100vh - 64px)",
        overflowY: "scroll",
      }}
      justifyContent="center"
      alignItems={"center"}
      spacing={0}
    >
      {/* <button onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"} Box
      </button> */}
      <Stack direction={"column"} spacing={6}>
        <CustomSearch
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            minWidth: "100px",
            borderRadius: 10,
          }}
        >
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            disabled
          >
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.2 }} orientation="vertical" />
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Job Match"
            inputProps={{ "aria-label": "Search Job Match" }}
            onChange={(e) => handleChange(e.target.value)}
          />
        </CustomSearch>

        <Stack direction={"column"} justifyContent={"center"} spacing={3}>
          {queryResults.map((row, index) => (
            <Slide
              key={index}
              in={true}
              timeout={(index + 1) * 100}
              direction={"up"}
            >
              <CustomPaper
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  p: 2,
                  "&:hover": {
                    boxShadow: 8,
                  },
                }}
              >
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Stack direction={"column"}>
                    <Typography id={`modal-modal-title-${index}`} variant="h5">
                      {row.JobName.title}
                    </Typography>
                    <Typography variant="p">{row.JobName}</Typography>
                    <Typography variant="p">{row.Industry}</Typography>
                    <Typography variant="p">{row.DatePosted}</Typography>
                  </Stack>
                  <Tooltip title="apply" enterDelay={50} enterNextDelay={50}>
                    <CustomIconButton
                      sx={{
                        transition: "0.3s",
                        "&:hover": {
                          boxShadow: 10,
                        },
                      }}
                      onClick={() =>
                        history.push({
                          //pathname: `/apply/${row.ID}`,
                          pathname: `/apply`,
                          state: { detail: { id: row.ID } },
                        })
                      }
                    >
                      <PostAddIcon />
                    </CustomIconButton>
                  </Tooltip>
                </Stack>
              </CustomPaper>
            </Slide>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

export default JobSearch;
