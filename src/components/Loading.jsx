import React from "react";

export default function Loading({ loading, error, children }) {
  return (
    <div>
      {loading ? (
        <p colSpan={3}>loading please wait...</p>
      ) : error ? (
        <p colSpan={3}>{error}</p>
      ) : (
        children
      )}
    </div>
  );
}
