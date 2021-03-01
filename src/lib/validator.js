const validate = (input, rules) => {
  return rules.filter((rule) => !rule.test(input)).map((rule) => rule.error);
};

export { validate };
