import WorkIcon from '@mui/icons-material/Work';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BookmarksIcon from '@mui/icons-material/Bookmarks';


const EmployerRoutes = [
  {
    title: "My Job Posts",
    link: "/job-posts",
    icon:<WorkIcon />
  },
  {
    title: "Create Job Post",
    link: "/new-job-post",
    icon: <CreateIcon />
  },
  {
    title: "Offers",
    link: "/offers",
    icon: <LocalOfferOutlinedIcon />
  },
  {
    title: "Profile",
    link: "/profile",
    icon: <AccountCircleIcon />
  },
  {
    title: "Company",
    link: "/company-profile",
    icon: <BusinessCenterIcon />
  },
]

const EmployeeRoutes = [
  {
    title: "Job Search",
    link: "/",
    icon: <SearchIcon />
  },
  {
    title: "My Applications",
    link: "/applications",
    icon: <DescriptionIcon />
  },
  {
    title: "My Projects",
    link: "/projects",
    icon: <AccountTreeIcon />
  },
  {
    title: "My Jobs",
    link: "/job-posts",
    icon:<BookmarksIcon />
  },
  {
    title: "Offers",
    link: "/offers",
    icon: <LocalOfferOutlinedIcon />
  },
  {
    title: "Profile",
    link: "/profile",
    icon: <AccountCircleIcon />
  },
]

export {EmployerRoutes, EmployeeRoutes}