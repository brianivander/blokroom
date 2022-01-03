import React from "react";
import Moralis from "moralis/dist/moralis.min.js";
import { useEffect } from "react";

export const TryUser = () => {
  useEffect(async () => {
    // login
    //Moralis.User.logIn("user1@email.com", "1234");

    // logout
    // Moralis.User.logOut();

    // const user = new Moralis.Query("User");
    // const userResults = await user.find();
    // console.log(userResults);

    const ratings = await Moralis.Cloud.run("helloworld");
    console.log(ratings);
  });

  return <div></div>;
};
