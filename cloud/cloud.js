Moralis.Cloud.define("getUsername", async (request) => {
  const logger = Moralis.Cloud.getLogger();

  logger.info(JSON.stringify(request.params.userId));
  const user = new Moralis.Query("User");
  user.equalTo("objectId", request.params.userId);
  const userResults = await user.find({ useMasterKey: true });

  logger.info(JSON.stringify(userResults[0]));
  return await userResults[0];
});
