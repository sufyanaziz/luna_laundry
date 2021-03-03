const isEmpty = (value: any) => {
  const getString = value.toString();
  return getString.trim() === "" ? true : false;
};

const checkUndefinedInput = (data: any) => {
  let arr: any = [];
  let undefined: any = {};

  Object.entries(data).forEach(([key, value]) => {
    arr.push(`${key}:${value}`);
  });

  arr.forEach((val: any) => {
    const splitVal = val.split(":");
    const key = splitVal[0];
    const value = splitVal[1];
    const text = `${key} is missing`;

    if (value === "undefined") {
      undefined[key] = text;
    }
  });

  return {
    isUndefined: Object.keys(undefined).length !== 0 ? true : false,
    undefined,
  };
};

const checkEmptyValue = (data: any) => {
  let arr: any = [];
  let errors: any = {};

  Object.entries(data).forEach(([key, value]) => {
    arr.push(`${key}:${value}`);
  });

  arr.forEach((val: any) => {
    const splitVal = val.split(":");
    const key = splitVal[0];
    const value = splitVal[1];
    const text = `${key} is empty`;

    if (isEmpty(value)) errors[key] = text;
  });

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

export const validateInput = (data: any) => {
  const { isUndefined, undefined } = checkUndefinedInput(data);
  if (isUndefined) {
    return {
      errors: { _type: "undefined", ...undefined },
      valid: !isUndefined,
    };
  } else {
    const { valid, errors } = checkEmptyValue(data);

    return {
      errors: { _type: "empty", ...errors },
      valid,
    };
  }
};

export const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
