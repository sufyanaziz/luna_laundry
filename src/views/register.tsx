import React from "react";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";
import { TextField } from "components/global/Input";
import { Button } from "components/global/Button";
import { Link, RouteComponentProps } from "react-router-dom";

import styled from "styled-components";

interface Props extends RouteComponentProps {}

const Register: React.FC<Props> = ({ children, history }) => {
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
              onChange={() => "ok"}
              value=""
              placeholder="Nama"
            />
          </div>
          {/* Field Username */}
          <div className="register-card-fields">
            <p>Username</p>
            <TextField
              type="text"
              onChange={() => "ok"}
              value=""
              placeholder="Username"
            />
          </div>
          {/* Field Gender */}
          <div className="register-card-fields">
            <p>Gender</p>
            <TextField type="text" onChange={() => "ok"} value="" />
          </div>
          {/* Field Email */}
          <div className="register-card-fields">
            <p>Email</p>
            <TextField
              type="text"
              onChange={() => "ok"}
              value=""
              placeholder="Email"
            />
          </div>
          {/* Field Address */}
          <div className="register-card-fields">
            <p>Address</p>
            <TextField
              type="text"
              onChange={() => "ok"}
              value=""
              placeholder="Address"
            />
          </div>
          {/* Field DoB */}
          <div className="register-card-fields">
            <p>DoB</p>
            <div className="register-card-inputs">
              <TextField
                className="register-card-input"
                type="text"
                onChange={() => "ok"}
                value=""
              />
              <TextField
                className="register-card-input"
                type="text"
                onChange={() => "ok"}
                value=""
              />
              <TextField
                className="register-card-input"
                type="text"
                onChange={() => "ok"}
                value=""
              />
            </div>
          </div>
          {/* Field Phone Number */}
          <div className="register-card-fields">
            <p>Phone Number</p>
            <TextField
              type="text"
              onChange={() => "ok"}
              value=""
              placeholder="Phone Number"
            />
          </div>
          {/* Field Password */}
          <div className="register-card-fields">
            <p>Password</p>
            <TextField
              type="password"
              onChange={() => "ok"}
              value=""
              placeholder="Password"
            />
          </div>
          {/* Field Re-Password */}
          <div className="register-card-fields">
            <p>Re-Password</p>
            <TextField
              type="password"
              onChange={() => "ok"}
              value=""
              placeholder="Re-Password"
            />
          </div>
        </Card>
        {/* Field Action */}
        <div className="register-action">
          <Button text="Sign Up" disabled={true} />
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
