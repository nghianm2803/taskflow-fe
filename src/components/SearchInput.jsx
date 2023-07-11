import React, { useState } from "react";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';

function SearchInput({ handleOnSubmit }) {
  const [search, setSearch] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleOnSubmit(search);
  };
  
  const handleClearSearch = () => {
    setSearch("");
    handleOnSubmit('')
  }

  const handleChangeSearch= (event) => {
    setSearch(event.target.value);
  }
  return (
   <Box>
    <form onSubmit={onSubmit}>
      <TextField
        value={search}
        placeholder="Search by name"
        label="Search"
        onChange={handleChangeSearch}
        sx={{ width: 300 }}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {search && (
                <IconButton onClick={handleClearSearch} edge="end">
                  <ClearIcon />
                </IconButton>
              )}
              <IconButton
                type="submit"
                color="primary"
                aria-label="Search"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  </Box>
  );
}


export default SearchInput;
