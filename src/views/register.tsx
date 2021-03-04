import React, { useState } from "react";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";
import { TextField, RadioInput, SelectInput } from "components/global/Input";
import { Button } from "components/global/Button";
import { useUser } from "context";
import { getFullDays, getMonths, generateYear, formatDate } from "utils/date";
import { validateInput, validateEmail } from "utils/validation";

import { Link, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

interface Props extends RouteComponentProps {}

const Register: React.FC<Props> = ({ history }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const { loading, event } = useUser();

  const dob =
    day === "" || month === "" || year === ""
      ? ""
      : formatDate(`${day}-${month}-${year}`).toISOString();

  const req = {
    username,
    password,
    address,
    dob,
    email,
    gender,
    fullName,
    phoneNumber,
  };

  const handleUserRegistration = () => {
    event.register(req);
  };

  const validRegistration = () => {
    const reqInput = { ...req, rePassword };
    const { valid } = validateInput(reqInput);
    if (valid) {
      if (!validateEmail(req.email)) return { isValid: false };
      else if (password !== rePassword) return { isValid: false };
      else return { isValid: true };
    } else {
      return { isValid: false };
    }
  };

  return (
    <ComponentLayout isSelectRole={true} isLogin={false} history={history}>
      <StyledRegister>
        <div className="register-header">
          <p>Sign Up your Account</p>
        </div>
        <Card className="register-card" bgColor="cyan">
          {/* Field Name */}
          <div className="register-card-fields">
            <p>Name</p>
            <TextField
              type="text"
              onChange={e => setFullName(e.target.value)}
              value={fullName}
              placeholder="Nama"
            />
          </div>
          {/* Field Username */}
          <div className="register-card-fields">
            <p>Username</p>
            <TextField
              type="text"
              onChange={e => setUsername(e.target.value)}
              value={username}
              placeholder="Username"
            />
          </div>
          {/* Field Gender */}
          <div className="register-card-fields">
            <p>Gender</p>
            <div>
              <RadioInput
                label="Female"
                value="Female"
                checked={gender === "Female" ? true : false}
                onChange={e => setGender(e.target.value)}
              />
              <RadioInput
                label="Male"
                value="Male"
                checked={gender === "Male" ? true : false}
                onChange={e => setGender(e.target.value)}
              />
            </div>
          </div>
          {/* Field Email */}
          <div className="register-card-fields">
            <p>Email</p>
            <TextField
              type="text"
              onChange={e => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
            />
          </div>
          {/* Field Address */}
          <div className="register-card-fields">
            <p>Address</p>
            <TextField
              type="text"
              onChange={e => setAddress(e.target.value)}
              value={address}
              placeholder="Address"
            />
          </div>
          {/* Field DoB */}
          <div className="register-card-fields">
            <p>DoB</p>
            <div className="register-card-inputs">
              <SelectInput
                value={day}
                onChange={e => setDay(e.target.value)}
                values={getFullDays()}
                label="Day"
                isRemoveLabel={day !== "" ? true : false}
              />
              <SelectInput
                value={month}
                onChange={e => setMonth(e.target.value)}
                values={getMonths()}
                label="Month"
                isRemoveLabel={month !== "" ? true : false}
              />
              <SelectInput
                value={year}
                onChange={e => setYear(e.target.value)}
                values={generateYear(1945, formatDate().getFullYear())}
                sort={{ by: "DEC", value: "num" }}
                label="Year"
                isRemoveLabel={year !== "" ? true : false}
              />
            </div>
          </div>
          {/* Field Phone Number */}
          <div className="register-card-fields">
            <p>Phone Number</p>
            <TextField
              type="text"
              onChange={e => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              placeholder="Phone Number"
            />
          </div>
          {/* Field Password */}
          <div className="register-card-fields">
            <p>Password</p>
            <TextField
              type="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
            />
          </div>
          {/* Field Re-Password */}
          <div className="register-card-fields">
            <p>Re-Password</p>
            <TextField
              type="password"
              onChange={e => setRePassword(e.target.value)}
              value={rePassword}
              placeholder="Re-Password"
            />
          </div>
        </Card>
        {/* Field Action */}
        <div className="register-action">
          {loading ? (
            <Button
              text="Please wait..."
              background="primary"
              disabled={true}
            />
          ) : (
            <Button
              text="Sign Up"
              disabled={!validRegistration().isValid}
              onClick={() => handleUserRegistration()}
              background="primary"
            />
          )}
        </div>
        <div className="register-link">
          <Link to="/">If you have an account, Login Here!</Link>
        </div>
      </StyledRegister>
    </ComponentLayout>
  );
};

const StyledRegister = styled.div`
  .register-header {
    margin-bottom: 20px;
    text-align: center;
    font-size: 18px;
    font-style: italic;
  }

  .register-card {
    margin: 0 20px;
    border-radius: 10px;
  }

  .register-card-fields {
    display: grid;
    grid-template-columns: 0.52fr 1fr;
    align-items: center;

    & .register-card-inputs {
      display: flex;

      & .register-card-input:nth-child(2) {
        margin-right: 5px;
        margin-left: 5px;
      }
    }
  }

  .register-action {
    margin: 14px 0;
    text-align: center;
  }
  .register-link {
    text-align: center;
    & a {
      color: white;
    }
  }
`;

export default Register;
