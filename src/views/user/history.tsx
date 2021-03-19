import React, { useEffect } from "react";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";

import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { useStore, useUser } from "context";
import { formatDate } from "utils/date";

interface Props extends RouteComponentProps {}

const History: React.FC<Props> = ({ history }) => {
  const { loading, getHistoryTransaction, historyTransaction } = useStore();
  const { credentials } = useUser();

  const handleEffectHistory = () => {
    if (historyTransaction.length === 0)
      getHistoryTransaction(credentials.customerId);
  };
  useEffect(handleEffectHistory, [credentials.customerId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ComponentLayout isLogin={true} history={history}>
      <StyledHistory>
        <Card className="history-card" bgColor="mix-blue">
          {loading ? (
            <Card>
              <p>getting history, please wait...</p>
            </Card>
          ) : historyTransaction.length === 0 ? (
            <Card>
              <p>You have 0 order</p>
            </Card>
          ) : (
            historyTransaction
              .sort((a: any, b: any) => b.finishDate - a.finishDate)
              .map((transaction, key) => {
                const date = formatDate(transaction.finishDate).toDateFormat();
                return (
                  <Card className="history-card__item" key={key}>
                    <p>Tanggal: {date}</p>
                    <p>Berat: 4 Kg</p>
                    <p>Paket: {transaction.transactionType}</p>
                    <p>- Penyerhan pakaian: {transaction.submissionType}</p>
                    <p>- Pengambilan pakaian: {transaction.deliveryType}</p>
                    <p>Total Ongkir: Rp.{transaction.ongkir}</p>
                    <p>Total Biaya: Rp.{transaction.totalPrice}</p>
                  </Card>
                );
              })
          )}
        </Card>
      </StyledHistory>
    </ComponentLayout>
  );
};

const StyledHistory = styled.div`
  height: 100%;

  .history-card {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 10px;

    &__item {
      height: 165px;
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
  }
`;

export default History;
