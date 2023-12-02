import { InputBase } from "@mui/material";
import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { SearchOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.light, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.light, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchBar = () => {
  
  const [searchInput, setSearchInput] = useState("");
  // console.log(searchInput)

  const navigate = useNavigate();
  
  const onSearchChange = (e) => {
    const value = e.target.value.trimStart();
    setSearchInput(value);
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 13 && searchInput !== "") {
      navigate(`/search/${searchInput.trim().toLowerCase()}`)
    }
  };
  
  return (
    <Search>
      <SearchIconWrapper>
        <SearchOutlined color="primary" />
      </SearchIconWrapper>
      <StyledInputBase
        value={searchInput}
        onChange={onSearchChange}
        onKeyUp={onKeyUp}
        placeholder="Search…"
        type="search"
      />
    </Search>
  );
};

export default SearchBar;
