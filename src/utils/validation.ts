const isEmpty = (value: any) => {
  const getString = value.toString();
  return getString.trim() === "" ? true : false;
};

const checkUndefinedInput = (data: any) => {
  let arr: any = [];
  let objUndefined: any = {};

  Object.entries(data).forEach(([key, value]) => {
    arr.push(`${key}:${value}`);
  });

  arr.forEach((val: any) => {
    const splitVal = val.split(":");
    const key = splitVal[0];
    const value = splitVal[1];
    const text = `${key} is missing`;

    if (value === "undefined") {
      objUndefined[key] = text;
    }
  });

  return {
    isUndefined: Object.keys(objUndefined).length !== 0 ? true : false,
    objUndefined,
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
  const { isUndefined, objUndefined } = checkUndefinedInput(data);
  if (isUndefined) {
    return {
      errors: { _type: "undefined", ...objUndefined },
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
  const re = /^\S+@\S+$/;
  return re.test(email);
};
