import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { FSelect } from "./form";

function SortProject({ handleSortChange }) {
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    handleSortChange(sortBy);
  }, [handleSortChange, sortBy]);

  const handleChange = (event) => {
    event.preventDefault();
    setSortBy(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FSelect
        name="sortBy"
        label="Sort By"
        size="small"
        sx={{ width: 300 }}
        onChange={handleChange}
      >
        {[
          { value: "name", label: "name" },
          { value: "description", label: "description" },
        ].map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FSelect>
    </Box>
  );
}

export default SortProject;
