import React from "react";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";

import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {}

const AboutUs: React.FC<Props> = ({ history }) => {
  return (
    <ComponentLayout isLogin={true} history={history}>
      <StyledAboutUs>
        <Card className="aboutus-card-container" bgColor="mix-blue">
          <Card className="aboutus-card-info">
            <div className="info-jam-operasional">
              <p className="info-header">Jam Operasional :</p>
              <div className="info-card">
                <p>senin-minggu: 07.00 s/d 19.00 WIB</p>
              </div>
            </div>
            <div className="info-opsi-pembayaran">
              <p className="info-header">Opsi Pembayaran :</p>
              <div className="info-card">
                <p>- COD</p>
                <p>- Transfer BCA</p>
                <p>- Transfer Mandiri</p>
                <p>- Transfer BRI</p>
              </div>
            </div>
            <div className="info-harga">
              <p className="info-header">Harga :</p>
              <div className="info-card">
                <p>- Per Piece = Rp.-</p>
                <p>- Per Kilo = Rp.-</p>
                <p>- Delivery (Optional) = Rp.-</p>
                <p>(Untuk 1 - 4kg = )</p>
                <p>(Lebih dari 5kg Rp.1000.00 perkilo = )</p>
              </div>
            </div>
          </Card>
        </Card>
      </StyledAboutUs>
    </ComponentLayout>
  );
};

const StyledAboutUs = styled.div`
  height: 100%;

  .aboutus-card-container,
  .aboutus-card-info {
    height: 100%;
  }

  .aboutus-card-info {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 14px;
  }

  .info-header {
    margin-bottom: 12px;
    font-weight: bold;
    font-size: 18px;
  }

  .info-card {
    background: var(--white);
    border: 1px solid var(--black);
    padding: 10px 4px;
  }
`;

export default AboutUs;
