import React, { useState } from "react";
import styled from "styled-components";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { TextField } from "components/global/Input";
import { Button } from "components/global/Button";

import { useStore, useUser } from "context";
import { LocalStorageTransaction } from "utils/localStorage";

interface RequestCourierProps extends RouteComponentProps {}

const RequestCourier: React.FC<RequestCourierProps> = ({ history }) => {
  const { setTransactions, transaction } = useStore();
  const { credentials } = useUser();

  const [request, setRequest] = useState<string>(credentials.address);

  const handleNextRequest = () => {
    setTransactions({ ...transaction, address: request });
    history.push("/pickup-date");
  };

  const _localStorageTransaction = LocalStorageTransaction();
  if (_localStorageTransaction === null) return <Redirect to="/option" />;

  return (
    <ComponentLayout isLogin={true}>
      <StyledRequestCourier>
        <Card bgColor="mix-blue" style={{ height: "100%" }}>
          <Card className="requestCourier-card">
            <div className="requestCourier-card__header">
              <p>Your Address :</p>
            </div>
            <div className="requestCourier-card__input">
              <TextField
                type="text"
                onChange={e => setRequest(e.target.value)}
                value={request}
                placeholder="Request kurir"
              />
            </div>
            <div className="requestCourier-card__action">
              <Button
                background="primary"
                text="Request kurir"
                onClick={() => handleNextRequest()}
                disabled={request.trim() === "" ? true : false}
              />
            </div>
          </Card>
        </Card>
      </StyledRequestCourier>
    </ComponentLayout>
  );
};

const StyledRequestCourier = styled.div`
  height: 100%;

  .requestCourier-card {
    &__header {
      margin-bottom: 10px;

      p {
        font-weight: bold;
        font-size: 25px;
      }
    }

    &__input {
      margin-bottom: 10px;
    }

    &__action {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
`;

export default RequestCourier;
