import React from "react";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";

import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

interface Props extends RouteComponentProps {}

const History: React.FC<Props> = ({ history }) => {
  return (
    <ComponentLayout isLogin={true} history={history}>
      <StyledHistory>
        <Card className="history-card" bgColor="mix-blue">
          <Card>
            <p>Tanggal: 7 Februari 2019</p>
            <p>Berat: 4 Kg</p>
            <p>Paket (normal 3 hari):</p>
            <p>- Penyerhan pakaian: jemput</p>
            <p>- Pengambilan pakaian: antar</p>
            <p>Total Ongkir: Rp.6.000</p>
            <p>Total Biaya: Rp.34.000</p>
          </Card>
          <Card>
            <p>Tanggal: 7 Februari 2019</p>
            <p>Berat: 4 Kg</p>
            <p>Paket (normal 3 hari):</p>
            <p>- Penyerhan pakaian: jemput</p>
            <p>- Pengambilan pakaian: antar</p>
            <p>Total Ongkir: Rp.6.000</p>
            <p>Total Biaya: Rp.34.000</p>
          </Card>
          <Card>
            <p>Tanggal: 7 Februari 2019</p>
            <p>Berat: 4 Kg</p>
            <p>Paket (normal 3 hari):</p>
            <p>- Penyerhan pakaian: jemput</p>
            <p>- Pengambilan pakaian: antar</p>
            <p>Total Ongkir: Rp.6.000</p>
            <p>Total Biaya: Rp.34.000</p>
          </Card>
          <Card>
            <p>Tanggal: 7 Februari 2019</p>
            <p>Berat: 4 Kg</p>
            <p>Paket (normal 3 hari):</p>
            <p>- Penyerhan pakaian: jemput</p>
            <p>- Pengambilan pakaian: antar</p>
            <p>Total Ongkir: Rp.6.000</p>
            <p>Total Biaya: Rp.34.000</p>
          </Card>
          <Card>
            <p>Tanggal: 7 Februari 2019</p>
            <p>Berat: 4 Kg</p>
            <p>Paket (normal 3 hari):</p>
            <p>- Penyerhan pakaian: jemput</p>
            <p>- Pengambilan pakaian: antar</p>
            <p>Total Ongkir: Rp.6.000</p>
            <p>Total Biaya: Rp.34.000</p>
          </Card>
          <Card>
            <p>Tanggal: 7 Februari 2019</p>
            <p>Berat: 4 Kg</p>
            <p>Paket (normal 3 hari):</p>
            <p>- Penyerhan pakaian: jemput</p>
            <p>- Pengambilan pakaian: antar</p>
            <p>Total Ongkir: Rp.6.000</p>
            <p>Total Biaya: Rp.34.000</p>
          </Card>
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
  }
`;

export default History;
