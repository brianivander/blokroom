import React from "react";
import Moralis from "moralis/dist/moralis.min.js";
import { useEffect } from "react";

export const TryUser = () => {
  useEffect(async () => {
    const params = { userId: "kFmVV1xxnekMNjMfgRUoXz7I" };
    const user = await Moralis.Cloud.run("getUsername", params);
    console.log(user);
  });

  return <div></div>;
};
