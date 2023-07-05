import { Box } from "@mui/material";
import React, { useState } from "react";
import { FSelect } from "./form";
import { useEffect } from "react";
// import { sortBy } from "lodash";
// import { useForm } from "react-hook-form";

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
