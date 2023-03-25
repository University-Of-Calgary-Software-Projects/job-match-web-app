import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import {
  Autocomplete,
  Avatar,
  Chip,
  FormHelperText,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import TagFacesIcon from "@mui/icons-material/TagFaces";

/**
 *
 * @type {StyledComponent<PropsOf<OverridableComponent<BoxTypeMap<{}, "div", Theme>>> & {theme?: Theme} & {readonly theme?: *}, {}, {}>}
 */
const CustomBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#18385C" : "white",
}));

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

/**
 *
 * @type {StyledComponent<PropsOf<OverridableComponent<TypographyTypeMap>> & {theme?: Theme} & {readonly theme?: *}, {}, {}>}
 */
const CustomTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#B2BAC2" : "#6F7E86",
}));

/**
 *
 * @type {StyledComponent<PropsOf<((props: ({href: string} & OverrideProps<ExtendButtonBaseTypeMap<ExtendButtonBaseTypeMap<{props: {children?: React.ReactNode, classes?: Partial<IconButtonClasses>, color?: OverridableStringUnion<"inherit" | "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning", IconButtonPropsColorOverrides>, disabled?: boolean, disableFocusRipple?: boolean, edge?: "start" | "end" | false, size?: OverridableStringUnion<"small" | "medium" | "large", IconButtonPropsSizeOverrides>, sx?: SxProps<Theme>}, defaultComponent: "button"}>>, "a">)) => JSX.Element) & OverridableComponent<ExtendButtonBaseTypeMap<ExtendButtonBaseTypeMap<{props: {children?: React.ReactNode, classes?: Partial<IconButtonClasses>, color?: OverridableStringUnion<"inherit" | "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning", IconButtonPropsColorOverrides>, disabled?: boolean, disableFocusRipple?: boolean, edge?: "start" | "end" | false, size?: OverridableStringUnion<"small" | "medium" | "large", IconButtonPropsSizeOverrides>, sx?: SxProps<Theme>}, defaultComponent: "button"}>>>> & {theme?: Theme} & {readonly theme?: *}, {}, {}>}
 */
const CustomIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#B2BAC2" : "#6F7E86",
}));

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function Profile() {
  const history = useHistory();
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);

  const handleValueChange = async (event, newValue) => {
    setSelectedValues(newValue);
    const userID = localStorage.getItem("userID");

    const formInput = {
      JSID: userID,
      skillsArray: newValue,
    };
    console.log(formInput);

    const raw = JSON.stringify(formInput);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
      url: `${process.env.REACT_APP_API_URL}/profile/update-skills`,
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/profile/update-skills`,
      requestOptions
    );

    if (response.status === 200) {
      console.log(response);
    } else {
      console.log("error");
    }
  };

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
        setName(
          `${responseData.results.FirstName} ${responseData.results.LastName}`
        );
        setData(responseData.results);
        console.log(responseData)
        const labelsArray = responseData.skills.map((obj) => obj.label);
        console.log(labelsArray);
        setSelectedValues(labelsArray);
      }

      requestOptions = {
        url: `${process.env.REACT_APP_API_URL}/profile/jobSeeker/${userID}`,
        method: "GET",
        redirect: "follow",
      };
    };

    fetchData();
    console.log(selectedValues);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userID");
    history.push("./login");
  };

  // const handleDelete = (chipToDelete) => () => {
  //   setChipData((chips) =>
  //     chips.filter((chip) => chip.key !== chipToDelete.key)
  //   );
  // };

  return (
    <Stack
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
      <CustomBox
        sx={{
          width: 500,
          boxShadow: 3,
          marginBottom: 10,
          borderRadius: "20px",
        }}
      >
        <Stack alignItems={"center"} p={4} spacing={2}>
          <Avatar
            sx={{
              width: "120px",
              height: "120px",
              boxShadow: 6,
            }}
          >
            <img
              src={`https://avatars.dicebear.com/api/initials/${name}.svg?scale=110`}
              alt="initials"
            />
          </Avatar>

          <CustomTypography variant="h3">{`${data.FirstName} ${data.LastName}`}</CustomTypography>

          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <CustomTypography variant="h6" fontWeight={"bold"}>
              Username
            </CustomTypography>
            <CustomTypography>{data.Username}</CustomTypography>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <CustomTypography variant="h6" fontWeight={"bold"}>
              Email
            </CustomTypography>
            <CustomTypography>{data.Email}</CustomTypography>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <CustomTypography variant="h6" fontWeight={"bold"}>
              PhoneNo
            </CustomTypography>
            <CustomTypography>{data.PhoneNo}</CustomTypography>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            p={2}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Tooltip
              title="explore my offers"
              enterDelay={500}
              enterNextDelay={500}
            >
              <CustomIconButton
                size="large"
                sx={{
                  boxShadow: 2,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 7,
                    bgcolor: "inherit",
                  },
                }}
                onClick={() => history.push("/offers")}
              >
                <LocalOfferOutlinedIcon fontSize="inherit" />
              </CustomIconButton>
            </Tooltip>
            <Tooltip
              title="view my applications"
              enterDelay={500}
              enterNextDelay={500}
            >
              <CustomIconButton
                size="large"
                sx={{
                  boxShadow: 2,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 7,
                    bgcolor: "inherit",
                  },
                }}
                onClick={() => history.push("/applications")}
              >
                <DescriptionIcon fontSize="inherit" />
              </CustomIconButton>
            </Tooltip>
            <Tooltip
              title="recommended job posts"
              enterDelay={500}
              enterNextDelay={500}
            >
              <CustomIconButton
                size="large"
                sx={{
                  boxShadow: 2,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 7,
                    bgcolor: "inherit",
                  },
                }}
                onClick={() => history.push("/job-posts")}
              >
                <BookmarksIcon fontSize="inherit" />
              </CustomIconButton>
            </Tooltip>
            <Tooltip
              title="search for job posts"
              enterDelay={500}
              enterNextDelay={500}
            >
              <CustomIconButton
                size="large"
                sx={{
                  boxShadow: 2,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 7,
                    bgcolor: "inherit",
                  },
                }}
                onClick={() => history.push("/")}
              >
                <SearchIcon fontSize="inherit" />
              </CustomIconButton>
            </Tooltip>
            <Tooltip title="sign out" enterDelay={500} enterNextDelay={500}>
              <CustomIconButton
                onClick={() => handleLogout()}
                size="large"
                sx={{
                  boxShadow: 2,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 7,
                    bgcolor: "inherit",
                  },
                }}
              >
                <LogoutIcon fontSize="inherit" />
              </CustomIconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </CustomBox>
      <Autocomplete
        sx={{
          minWidth: "450px",
          maxWidth: "500px",
        }}
        multiple
        id="tags-filled"
        options={[]}
        freeSolo
        onChange={handleValueChange}
        value={selectedValues}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => <TextField {...params} placeholder="skills" />}
      />
      <FormHelperText>
        Add/remove your skills to reflect your recent work experience
      </FormHelperText>
    </Stack>
  );
}

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];

export default Profile;
