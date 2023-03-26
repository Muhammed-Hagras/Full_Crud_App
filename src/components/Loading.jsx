import React from "react";

export default function Loading({ loading, error, children }) {
  const elementType = children?.type?.render?.displayName;
  const renderHandler = () =>  {
    if(elementType === "Button") {
      const cloneElement = React.cloneElement(children,
        {disabled: true},
        "Loading");
        return <>
         {loading ? (
        cloneElement
      ) : error ? (
        <>
        {children}
        <br/>
        <p >{error}</p>
        </>
      ) : (
        children
      )}
        </>
    }
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
  
  return renderHandler()
}
