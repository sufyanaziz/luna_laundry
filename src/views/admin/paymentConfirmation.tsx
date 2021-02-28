import React from "react";
import styled from "styled-components";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";
import { RouteComponentProps } from "react-router-dom";
import { Button } from "components/global/Button";

interface PaymentConfirmationProps extends RouteComponentProps {}

const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({
  history,
}) => {
  return (
    <ComponentLayout isLogin={true}>
      <StyledPaymentConfirmation>
        <Card bgColor="mix-blue" style={{ height: "100%" }}>
          <Card
            className="paymentConfirmation-card"
            style={{ background: "white" }}
          >
            <p>
              <b>Tanggal : 1 September 2020</b>
            </p>
            <p>Order Id : VJ31121</p>
            <p>
              Paket (normal 3 hari) : <br />
              - Penyerahan : Jemput <br />
              - Pengambilan : Antar <br />
            </p>
            <p>Total ongkir : Rp6.000</p>
            <p>Berat : 4kg</p>
            <p>Total biaya : Rp34.000</p>

            <div className="paymentConfirmation-card__action">
              <Button text="Confirm" background="primary" />
            </div>
          </Card>
        </Card>
      </StyledPaymentConfirmation>
    </ComponentLayout>
  );
};

const StyledPaymentConfirmation = styled.div`
  height: 100%;

  .paymentConfirmation-card {
    &__action {
      width: 100%;
      text-align: center;
      margin-top: 16px;
    }
  }
`;

export default PaymentConfirmation;
