import React, { useState } from "react";
import styled from "styled-components";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";
import { RouteComponentProps } from "react-router-dom";
import { TextField } from "components/global/Input";
import { Button } from "components/global/Button";

interface RequestCourierProps extends RouteComponentProps {}

const RequestCourier: React.FC<RequestCourierProps> = ({ history }) => {
  const [request, setRequest] = useState<string>("");
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
                onClick={() => history.push("/pickup-date")}
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
