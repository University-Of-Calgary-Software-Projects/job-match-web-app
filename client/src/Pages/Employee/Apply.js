import { Alert, Fab, IconButton, Paper, SvgIcon } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
} from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import UploadIcon from "@mui/icons-material/Upload";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    "&.Mui-focused fieldset": {
      border:
        theme.palette.mode === "dark" ? "2px solid white" : "2px solid black",
    },
  },
}));

const CustomSelect = styled(Select)(({ theme }) => ({
  "&.MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.mode === "dark" ? "#BABAC2" : null,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.mode === "dark" ? "white" : null,
    },
  },
}));

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#18385C" : "white",
  padding: 10,
}));

const CustomButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.mode === "dark" ? "white" : "#18385C",
  color: theme.palette.mode === "dark" ? "white" : "#18385C",
  padding: 10,
}));

const FirstNameInput = ({ firstName, onFirstNameChange }) => {
  return (
    <CustomTextField
      name="firstName"
      fullWidth
      id="firstName"
      label="First Name"
      inputProps={{ autoComplete: "off" }}
      value={firstName}
      onChange={onFirstNameChange}
    />
  );
};

function Apply() {
  const [errorLabel, setErrorLabel] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [YOF, setYOF] = useState("");
  const [data, setData] = useState([]);
  
  const [lastName, setLastName] = useState('');
  const [email, setEail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [pdfFileName, setPdfFileName] = useState("");
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const userID = localStorage.getItem("userID");

      let requestOptions = {
        url: `${process.env.REACT_APP_API_URL}/profile/jobSeeker/${userID}`,
        method: "GET",
        redirect: "follow",
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/profile/jobSeeker/${userID}`,
        requestOptions
      );
      if (response.status === 200) {
        const responseData = await response.json();
        setData(responseData.results);
        //setFirstName("damn");
        setFirstName("something");
        //setName(`${responseData.results.FirstName} ${responseData.results.LastName}`)
      }
    };

    fetchData();
  }, []);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfFileName(file.name);
      console.log(file);
    }
  };

  const handleChange = (event) => {
    setYOF(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formInput = {
      JID: location.state.detail.id,
      JSID: localStorage.getItem("userID"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      phoneNumber: data.get("phoneNumber"),
      YOF: data.get("YOF"),
      resumeUrl: data.get("resumeUrl"),
      additionalInfo: data.get("additionalInfo"),
    };
    const raw = JSON.stringify(formInput);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
      url: `${process.env.REACT_APP_API_URL}/apply`,
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/apply`,
      requestOptions
    );

    if (response.status === 200) {
      const result = await response.json();
      history.push("/applications");
    } else {
      setErrorLabel(true);
    }
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
      <Box pl={15} pr={15}>
        <Alert
          severity="error"
          sx={{ mb: 3, display: errorLabel ? "" : "none" }}
        >
          Error in the application, you cannot apply to the application twice
        </Alert>
        <Typography variant="h5">SUBMIT YOUR APPLICATION</Typography>
        <Box
          component="form"
          noValidate="false"
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
          //

          justifyContent="center"
          alignItems={"center"}
          onFocus={() => setErrorLabel(false)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomPaper sx={{}}>
                <Stack direction={"row"} alignItems="center" spacing={1}>
                  <IconButton size="large" disabled>
                    <BadgeOutlinedIcon fontSize="inherit" />
                  </IconButton>
                  <Stack direction={"column"} spacing={2}>
                    <Typography variant="h4"
                    >Résumé</Typography>
                    <Typography>
                      To start your application, upload your resume in English
                      as PDF with a max size of 2 MB.
                    </Typography>
                    <FormControl fullWidth>
                      <input
                        accept="application/pdf"
                        id="pdfDocument"
                        type="file"
                        onChange={handlePdfUpload}
                        hidden
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                        }}
                      >
                        <CustomButton
                          variant="outlined"
                          component="label"
                          htmlFor="pdfDocument"
                          startIcon={<UploadIcon />}
                          sx={{
                            width: "fit-content",
                          }}
                        >
                          Upload
                        </CustomButton>

                        {pdfFileName && (
                          <Typography
                            variant="caption"
                            sx={{
                              ml: 2,
                              display: "inline-block",
                            }}
                          >
                            {pdfFileName}
                          </Typography>
                        )}
                      </Box>
                    </FormControl>
                  </Stack>
                </Stack>
              </CustomPaper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                name="firstName"
                fullWidth
                id="firstName"
                label="First Name"
                inputProps={{ autoComplete: "off" }}
                defaultValue={firstName}
              />
               <FirstNameInput defaultFirstName={firstName} onFirstNameChange={handleFirstNameChange}/>
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                inputProps={{ autoComplete: "off" }}
                defaultValue={data.LastName}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                inputProps={{ autoComplete: "off" }}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                name="phoneNumber"
                label="Phone"
                type="phone"
                id="phoneNumber"
                inputProps={{ autoComplete: "off" }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ minWidth: 120, width: "100%" }}>
                <InputLabel
                  id="demo-simple-select-helper-label"
                  sx={{
                    "&.Mui-focused": {
                      color: "inherit",
                    },
                  }}
                >
                  Years Of Experience
                </InputLabel>
                <CustomSelect
                  required
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={YOF}
                  label="years of experience"
                  onChange={handleChange}
                  name="YOF"
                >
                  <MenuItem value={"less than 3 months"}>
                    less than 3 months
                  </MenuItem>
                  <MenuItem value={"3 to 8 months"}>3 to 8 months</MenuItem>
                  <MenuItem value={"8 to 12 months"}>8 to 12 months</MenuItem>
                  <MenuItem value={"1 year to 5 years"}>
                    1 year to 5 years
                  </MenuItem>
                  <MenuItem value={"1 year to 5 years"}>
                    more than 5 years
                  </MenuItem>
                </CustomSelect>
                <FormHelperText>
                  How many months/years of experience do you have in this
                  industry
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                required
                fullWidth
                id="resumeUrl"
                label="Resume URL"
                name="resumeUrl"
                inputProps={{ autoComplete: "off" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" p={1}>
                Additional Information
              </Typography>
              <CustomTextField
                id="additionalInfo"
                name="additionalInfo"
                label="Add a cover letter"
                fullWidth
                multiline
                minRows={5}
              />
            </Grid>
          </Grid>

          <Stack direction={"row"} justifyContent={"center"}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#0C92F3",
                ":hover": {
                  bgcolor: "#3a81d3",
                },
              }}
            >
              SUBMIT APPLICATION
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default Apply;
