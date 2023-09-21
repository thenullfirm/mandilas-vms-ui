const localEnvParser = (environmentVariable) => {
  return environmentVariable.slice(1, -2);
};

export default localEnvParser;
