import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { FSelect } from "./form";

function FilterTask({ handleFilterChange }) {
  const [filterBy, setFilterBy] = useState("");

  useEffect(() => {
    handleFilterChange(filterBy);
  }, [handleFilterChange, filterBy]);

  const handleChange = (event) => {
    event.preventDefault();
    setFilterBy(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FSelect
        name="filterBy"
        size="small"
        sx={{ width: 120 }}
        onChange={handleChange}
      >
        {[
          { value: "", label: "All" },
          { value: "name", label: "Name" },
          // { value: "assignTo.name", label: "Assignee" },
          { value: "status", label: "Status" },
          { value: "priority", label: "Priority" },
        ].map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FSelect>
    </Box>
  );
}

export default FilterTask;
