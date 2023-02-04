import React from "react";
import { useErrorContext } from "../../contexts/ErrorProvider";

function Error() {
  const { error, setError } = useErrorContext();
  console.log('ERROR',error)
  return (
    <>
      {error?.message ? (
            <div className="bg-red-600 fixed top-0">{error.message}</div>
      ) : (
        <h1>EYUP</h1>
      )}
    </>
  );
}

export default Error;
