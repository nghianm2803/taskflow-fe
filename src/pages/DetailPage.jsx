import React from "react";
import { useParams } from "react-router-dom";

function DetailPage() {
  let params = useParams();
  return (
    <div>
      <h1>DetailPage - ProjectID: {params.id}</h1>
    </div>
  );
}

export default DetailPage;
