import {
  FormControl,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import { OffersHeaders } from "./OffersHeaders";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

/**
 *
 * @type {StyledComponent<PropsOf<OverridableComponent<TableTypeMap>> & {theme?: Theme} & {readonly theme?: *}, {}, {}>}
 */
const MyTable = styled(Table)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#18385C" : "white",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

/**
 *
 * @type {StyledComponent<PropsOf<(props: TableCellProps) => JSX.Element> & {theme?: Theme} & {readonly theme?: *}, {}, {}>}
 */
const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#0d294a" : "white",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontWeight: "bold",
}));

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function Offers() {
  const [data, setData] = useState([]);
  
  const handleSelectChange = (value, index) => {
    console.log(`${value} for ${index}. ID is ${data[0].HID}`);
    let newData = [...data];
    newData[index].JobSeekerStatus = value;
    setData(newData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const userID = localStorage.getItem("userID");

      let requestOptions = {
        url: `${process.env.REACT_APP_API_URL}/offers/jobSeeker/${userID}`,
        method: "GET",
        redirect: "follow",
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/offers/jobSeeker/${userID}`,
        requestOptions
      );
      if (response.status === 200) {
        const responseData = await response.json();
        setData(responseData.results);
      }
    };

    fetchData();
  }, []);

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
      <TableContainer component={Paper} sx={{ boxShadow: 6 }}>
        <MyTable sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {OffersHeaders.map((column) => (
                <HeaderTableCell
                  sx={{ fontWeight: "bold" }}
                  key={column.accessor}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.HEADER}
                </HeaderTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.code}
                  sx={{
                    transition: "0.3s",
                    "&:hover": {
                      boxShadow: 1,
                    },
                  }}
                >
                  {OffersHeaders.map((column) => {
                    const value = row[column.accessor];
                    if (column.accessor === "JobSeekerStatus") {
                      return (
                        <TableCell key={column.accessor} align="center">
                          <FormControl
                            sx={{ m: 0.5, minWidth: 100,maxWidth: 100 }}
                            size="small"
                          >
                            <Select
                              labelId="freelancer-status"
                              id="freelancer-status"
                              value={value}
                              onChange={(event) => {
                                handleSelectChange(event.target.value, index)
                              }}
                              autoWidth
                            >
                              <MenuItem value={"rejected"}>
                                <Typography variant="body2">
                                  rejected
                                </Typography>
                              </MenuItem>

                              <MenuItem value={"accepted"}>
                                <Typography variant="body2">
                                  accepted
                                </Typography>
                              </MenuItem>

                              <MenuItem value={"pending"}>
                                <Typography variant="body2">
                                  pending
                                </Typography>
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell key={column.accessor} align="center">
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MyTable>
      </TableContainer>
    </Box>
  );
}

export default Offers;
