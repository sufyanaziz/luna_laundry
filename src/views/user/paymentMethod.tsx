import React from "react";
import styled from "styled-components";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";
import { RouteComponentProps } from "react-router-dom";
import { TextField } from "components/global/Input";

import { Button } from "components/global/Button";
import { useStore } from "context";
import { HistoryTransaction } from "context/context-store/store-types";

interface PaymentMethodProps extends RouteComponentProps {}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ history }) => {
  const { resTransaction, setResTransaction } = useStore();

  const handleFinishTransaction = () => {
    setResTransaction({} as HistoryTransaction);
    history.push("/home");
  };

  return (
    <ComponentLayout isLogin={true}>
      <StyledPaymentMethod>
        <Card bgColor="mix-blue" style={{ height: "100%" }}>
          {Object.keys(resTransaction).length === 0 ? (
            <React.Fragment>
              <Card
                className="paymentMethod-card"
                style={{ background: "white" }}
              >
                <p>No transaction detected</p>
              </Card>
              <div className="paymentMethod-button">
                <Button
                  text="Back to Home"
                  type="button"
                  background="primary"
                  onClick={() => history.push("/home")}
                />
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Card
                className="paymentMethod-card"
                style={{ background: "white" }}
              >
                <div className="paymentMethod-card__total">
                  <p>Total Pembayaran</p>
                  <TextField
                    disabled={true}
                    value={"Rp. " + resTransaction.totalPrice.toString()}
                    onChange={e => ""}
                    type="text"
                  />
                </div>
                <div className="paymentMethod-card__information">
                  <p>
                    {resTransaction.paymentType === "OVO"
                      ? "OVO"
                      : "Bank " + resTransaction.paymentType}
                  </p>
                  <p>No. Virtual Account</p>
                  <p>112 233 445 566</p>
                </div>
              </Card>
              <div className="paymentMethod-button">
                <Button
                  text="Confirm"
                  type="button"
                  background="primary"
                  onClick={handleFinishTransaction}
                />
              </div>
            </React.Fragment>
          )}
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
