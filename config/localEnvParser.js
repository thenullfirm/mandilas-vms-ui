const localEnvParser = (environmentVariable) => {
  return process.env.NEXT_PUBLIC_ENV === "'local';" ? environmentVariable.slice(1, -2) : environmentVariable;
};

export default localEnvParser;
