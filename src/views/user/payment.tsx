import React from "react";
import styled from "styled-components";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";
import { RouteComponentProps } from "react-router-dom";
import { TextField } from "components/global/Input";

import { Button } from "components/global/Button";

interface PaymentProps extends RouteComponentProps {}

const Payment: React.FC<PaymentProps> = ({ history }) => {
  return (
    <ComponentLayout isLogin={true}>
      <StyledPayment>
        <Card bgColor="mix-blue" style={{ height: "100%" }}>
          <Card className="payment-card" style={{ background: "white" }}>
            <div className="payment-card__total">
              <p>Total</p>
              <p>:</p>
              <TextField value="" onChange={e => ""} type="text" />
            </div>
            <div className="payment-card__metode">
              <p>Metode Pembayaran</p>
              <p>:</p>
              <TextField value="" onChange={e => ""} type="text" />
            </div>
          </Card>
          <div className="payment-button">
            <Button
              text="payment"
              type="button"
              background="primary"
              onClick={() => history.push("/payment-method")}
            />
          </div>
        </Card>
      </StyledPayment>
    </ComponentLayout>
  );
};

const StyledPayment = styled.div`
  height: 100%;

  .payment-card {
    margin-bottom: 16px;

    &__total,
    &__metode {
      display: grid;
      grid-template-columns: 0.55fr 0.1fr 1fr;
      align-items: center;
    }
  }

  .payment-button {
    width: 100%;
    text-align: center;

    button {
      width: 200px;
    }
  }
`;

export default Payment;
