import Image from "next/image";
import React from "react";

const Spinner = () => {
  const load = "https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif";
  return (
    <>
      <Image className="w-52 m-auto block" src={load} alt="loading" />
    </>
  );
};

export default Spinner;
