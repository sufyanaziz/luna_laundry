import React, { useEffect } from "react";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";

import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import { useStore } from "context";

interface Props extends RouteComponentProps {}

const AboutUs: React.FC<Props> = ({ history }) => {
  const { getStoreInfo, loading, storeInfo, error } = useStore();

  const checkErrorLen = Object.keys(error).length;
  const getStoreInfoEffect = () => {
    const storeInfoLen = Object.keys(storeInfo).length;
    if (storeInfoLen === 0) getStoreInfo();
  };
  useEffect(getStoreInfoEffect, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ComponentLayout isLogin={true} history={history}>
      <StyledAboutUs>
        <Card className="aboutus-card-container" bgColor="mix-blue">
          <Card className="aboutus-card-info">
            {loading ? (
              <div>
                <p>Please wait, getting info...</p>
              </div>
            ) : checkErrorLen !== 0 ? (
              <div>
                <p>Something went wrong...</p>
              </div>
            ) : (
              <>
                <div className="info-jam-operasional">
                  <p className="info-header">Jam Operasional :</p>
                  <div className="info-card">
                    <p>Senin - Minggu : {storeInfo.operationalHours}</p>
                  </div>
                </div>
                <div className="info-opsi-pembayaran">
                  <p className="info-header">Opsi Pembayaran :</p>
                  <div className="info-card">
                    {storeInfo.paymentMethod?.map(method => {
                      return <p key={method}>- {method}</p>;
                    })}
                  </div>
                </div>
                <div className="info-harga">
                  <p className="info-header">Harga :</p>
                  <div className="info-card">
                    <p>- Per Piece = Rp.{storeInfo.pricePerPiece}</p>
                    <p>- Per Kilo = Rp.{storeInfo.pricePerKilo}</p>
                    <p>
                      - Delivery (Optional) = Rp.{storeInfo.basicDeliveryPrice}
                    </p>
                    <p>(Untuk 1 - 4kg = )</p>
                    <p>(Lebih dari 5kg Rp.1000.00 perkilo)</p>
                  </div>
                </div>
              </>
            )}
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

  .info-opsi-pembayaran .info-card {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 8px;
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
