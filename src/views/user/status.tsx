import React from "react";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";

import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

import Dicuci from "assets/img/dicuci.png";
import SedangDicuci from "assets/img/sedang d cuci.png";
import SelesaiDicuci from "assets/img/selesai d cuci.png";
import Setrika from "assets/img/setrika.png";
import Delivery from "assets/img/delivery.png";

interface Props extends RouteComponentProps {}

const Status: React.FC<Props> = ({ history }) => {
  return (
    <ComponentLayout isLogin={true} history={history}>
      <StyledStatus>
        <Card className="status-card" bgColor="mix-blue">
          <div className="list-card">
            <img alt="gambar-status" className="status-card-img" src={Dicuci} />
            <p>Akan Dicuci</p>
          </div>
          <div className="list-card">
            <img
              alt="gambar-status"
              className="status-card-img"
              src={SedangDicuci}
            />
            <p>Sedang Dicuci</p>
          </div>
          <div className="list-card">
            <img
              alt="gambar-status"
              className="status-card-img"
              src={SelesaiDicuci}
            />
            <p>Selesai Dicuci</p>
          </div>
          <div className="list-card">
            <img
              alt="gambar-status"
              className="status-card-img"
              src={Setrika}
            />
            <p>Selesai Disetrika</p>
          </div>
          <div className="list-card">
            <img
              alt="gambar-status"
              className="status-card-img"
              src={Delivery}
            />
            <p>Siap diantar/diambil</p>
          </div>
        </Card>
      </StyledStatus>
    </ComponentLayout>
  );
};

const StyledStatus = styled.div`
  height: 100%;

  .status-card {
    height: 100%;
  }

  .list-card {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    & .status-card-img {
      width: 110px;
      height: 80px;
      margin-right: 20px;
    }

    & p {
      font-size: 20px;
      font-weight: bold;
    }

    @media only screen and (min-height: 665.99px) {
      .status-card-img {
        height: 80px;
      }
    }
    @media only screen and (min-height: 735.99px) {
      .status-card-img {
        height: 85px;
      }
    }
    @media only screen and (min-height: 811.99px) {
      .status-card-img {
        height: 100px;
      }
    }
  }
`;

export default Status;
