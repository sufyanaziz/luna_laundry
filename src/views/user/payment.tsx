import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";
import { Link, Redirect, RouteComponentProps } from "react-router-dom";
import { TextField, SelectInput } from "components/global/Input";

import { Button } from "components/global/Button";

import { useStore } from "context";

import { LocalStorageTransaction } from "utils/localStorage";

interface PaymentProps extends RouteComponentProps {}

const Payment: React.FC<PaymentProps> = ({ history }) => {
  const {
    loading,
    getStoreInfo,
    storeInfo,
    transaction,
    setTransactions,
    addNewTransaction,
  } = useStore();
  const [paymentType, setPaymentType] = useState<string>("");
  const _storeInfo = Object.keys(storeInfo);

  const _localStorageTransaction = LocalStorageTransaction();

  const handleEffectStoreInfo = () => {
    if (_storeInfo.length === 0) {
      getStoreInfo();
    }
  };

  useEffect(handleEffectStoreInfo, []);

  const handleSendTransaction = () => {
    addNewTransaction(transaction);
    history.push("/payment-method");
  };

  const findEmptyTransaction = Object.values(transaction);
  const filterNullTransaction = findEmptyTransaction.filter(
    data => data === null
  );
  const onDisabledButton = () => {
    if (filterNullTransaction.length === 0) {
      if (paymentType === "") return true;
      else return false;
    } else {
      return true;
    }
  };

  if (_localStorageTransaction === null) return <Redirect to="/option" />;

  return (
    <ComponentLayout isLogin={true}>
      <StyledPayment>
        <Card bgColor="mix-blue" style={{ height: "100%" }}>
          {_storeInfo.length === 0 ? (
            <div />
          ) : (
            <>
              <Card className="payment-card" style={{ background: "white" }}>
                <div className="payment-card__total">
                  <p>Total</p>
                  <p>:</p>
                  <TextField
                    disabled={true}
                    value=""
                    onChange={e => ""}
                    type="text"
                  />
                </div>
                <div className="payment-card__metode">
                  <p>Metode Pembayaran</p>
                  <p>:</p>
                  <SelectInput
                    values={storeInfo.paymentMethod}
                    value={paymentType}
                    onChange={e => {
                      setPaymentType(e.target.value);
                      setTransactions({
                        ...transaction,
                        paymentType: e.target.value,
                      });
                    }}
                    label="Select metode"
                    isRemoveLabel={paymentType !== "" ? true : false}
                  />
                </div>
                {filterNullTransaction.length === 0
                  ? ""
                  : paymentType !== "" && (
                      <span style={{ color: "red", fontSize: 10 }}>
                        Data transaksi masih kurang, harap dilengkapi terlebih
                        dahulu.{" "}
                        <Link style={{ color: "black" }} to="/option">
                          Back to the start
                        </Link>
                      </span>
                    )}
              </Card>
              <div className="payment-button">
                {loading ? (
                  <Button
                    text="Sending transaction..."
                    type="button"
                    background="primary"
                    onClick={() => handleSendTransaction()}
                    disabled={true}
                  />
                ) : (
                  <Button
                    text="payment"
                    type="button"
                    background="primary"
                    onClick={() => handleSendTransaction()}
                    disabled={onDisabledButton()}
                  />
                )}
              </div>
            </>
          )}
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
