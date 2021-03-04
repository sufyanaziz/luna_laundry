import React, { useState, useEffect } from "react";

import { Link, RouteComponentProps } from "react-router-dom";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";
import { TextField } from "components/global/Input";
import { Button } from "components/global/Button";
import { useUser } from "context";
import { validateInput } from "utils/validation";

import styled from "styled-components";

interface Props extends RouteComponentProps {}

const Login: React.FC<Props> = ({ history }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { event, loading, error } = useUser();

  const handleLoginUser = () => {
    event.login(username, password);
  };
  const validateLogin = () => {
    const { valid } = validateInput({ username, password });
    return {
      isValid: valid,
    };
  };

  useEffect(() => {
    if (Object.keys(error).length !== 0) {
      alert(error.message);
    }
  }, [error]);

  return (
    <ComponentLayout isSelectRole={true}>
      <StyledLogin>
        <div className="login-header">
          <p>
            <i>Sign In your Account </i>
          </p>
        </div>
        <Card className="login-card" bgColor="cyan">
          <TextField
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
          />
          <TextField
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Card>
        <div className="login-action">
          {loading ? (
            <Button
              className="button-login"
              text="Please wait..."
              background="primary"
              type="button"
              disabled={true}
            />
          ) : (
            <Button
              className="button-login"
              text="Login"
              type="button"
              background="primary"
              onClick={handleLoginUser}
              disabled={!validateLogin().isValid}
            />
          )}

          <Link to="/register">
            If you don't have any account yet, Click Here!
          </Link>
          <Button
            className="buttonOAuth-login"
            text="Sign In with Google"
            type="button-oauth"
          />
        </div>
      </StyledLogin>
    </ComponentLayout>
  );
};

const StyledLogin = styled.div`
  .login-header {
    margin-bottom: 20px;
    text-align: center;
    font-size: 18px;
  }
  .login-card {
    margin: 0 20px;
    height: 100%;
  }
  .login-action {
    margin: 2rem 20px 0 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    & .button-login {
      width: 200px;
      margin-bottom: 20px;
    }

    & a {
      color: var(--white);
    }

    & .buttonOAuth-login {
      width: 100%;
      margin-top: 20px;
    }
  }
`;

export default Login;
