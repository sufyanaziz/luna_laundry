import React from "react";
import styled from "styled-components";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";
import { RouteComponentProps } from "react-router-dom";
import { TextField } from "components/global/Input";

import { Button } from "components/global/Button";

interface PaymentMethodProps extends RouteComponentProps {}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ history }) => {
  return (
    <ComponentLayout isLogin={true}>
      <StyledPaymentMethod>
        <Card bgColor="mix-blue" style={{ height: "100%" }}>
          <Card className="paymentMethod-card" style={{ background: "white" }}>
            <div className="paymentMethod-card__total">
              <p>Total Pembayaran</p>
              <TextField value="" onChange={e => ""} type="text" />
            </div>
            <div className="paymentMethod-card__information">
              <p>Bank BCA</p>
              <p>No. Virtual Account</p>
              <p>112 233 445 566</p>
            </div>
          </Card>
          <div className="paymentMethod-button">
            <Button text="Confirm" type="button" background="primary" />
          </div>
        </Card>
      </StyledPaymentMethod>
    </ComponentLayout>
  );
};

const StyledPaymentMethod = styled.div`
  height: 100%;

  .paymentMethod-card {
    margin-bottom: 16px;

    &__total {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      margin-bottom: 10px;
    }

    &__information {
      p:nth-child(1),
      p:nth-child(3) {
        font-weight: bold;
        font-size: 20px;
      }

      p:nth-child(2) {
        margin: 10px 0;
      }
      p:nth-child(3) {
        color: red;
      }
    }
  }

  .paymentMethod-button {
    width: 100%;
    text-align: center;

    button {
      width: 200px;
    }
  }
`;

export default PaymentMethod;
