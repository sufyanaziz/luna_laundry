import React, { useState, useEffect } from "react";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";

import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

// import Dicuci from "assets/img/dicuci.png";
// import SedangDicuci from "assets/img/sedang d cuci.png";
// import SelesaiDicuci from "assets/img/selesai d cuci.png";
// import Setrika from "assets/img/setrika.png";
// import Delivery from "assets/img/delivery.png";

import { formatDate } from "utils/date";
import { useStore, useUser } from "context";

interface Props extends RouteComponentProps {}

const Status: React.FC<Props> = ({ history }) => {
  const [openOngoingStatus, setOpenOngoingStatus] = useState<boolean>(false);
  const [openFinishStatus, setOpenFinishStatus] = useState<boolean>(false);

  const { status, loading, getStatusTransaction } = useStore();
  const { credentials } = useUser();

  const handleEffectGetStatus = () => {
    getStatusTransaction(credentials.customerId);
  };

  useEffect(handleEffectGetStatus, [credentials.customerId]); // eslint-disable-line react-hooks/exhaustive-deps

  const onGoingSatus = status.filter(
    value => value.finishDate > formatDate().getTime()
  );

  const onFinishStatus = status.filter(
    value => value.finishDate < formatDate().getTime()
  );

  return (
    <ComponentLayout isLogin={true} history={history}>
      <StyledStatus>
        <Card className="status-card" bgColor="mix-blue">
          {/* Opsi pertama */}
          {/* <div className="list-card">
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
          </div> */}

          {/* Opsi Kedua */}
          {loading ? (
            <p>Loading...</p>
          ) : status.length === 0 ? (
            <p>Belum Ada history</p>
          ) : (
            <React.Fragment>
              <div className="status-card__container">
                <Card
                  className="status-card__container-header"
                  onClick={() => setOpenOngoingStatus(!openOngoingStatus)}
                >
                  <p style={{ fontSize: 20 }}>
                    <b>Ongoing</b>
                  </p>
                  {openOngoingStatus ? (
                    <IoMdArrowDropup
                      style={{ fontSize: 25 }}
                      onClick={() => setOpenOngoingStatus(!openOngoingStatus)}
                    />
                  ) : (
                    <IoMdArrowDropdown
                      style={{ fontSize: 25 }}
                      onClick={() => setOpenOngoingStatus(!openOngoingStatus)}
                    />
                  )}
                </Card>
                {openOngoingStatus ? (
                  onGoingSatus.length === 0 ? (
                    <Card>
                      <p>You have 0 on going</p>
                    </Card>
                  ) : (
                    onGoingSatus
                      .sort((a, b) => a.finishDate - b.finishDate)
                      .map((val, key) => {
                        return (
                          <Card key={key} className="status-card__item">
                            <p>
                              Tanggal Selesai:{" "}
                              {formatDate(val.finishDate).toDateFormat()}
                            </p>
                            <p>
                              Tanggal Pickup:{" "}
                              {formatDate(val.pickUpDate).toDateFormat()}
                            </p>
                            <p>Paket: {val.transactionType}</p>
                            <p>-Penyerhan pakaian: {val.submissionType}</p>
                            <p>-Pengambilan pakaian: {val.deliveryType}</p>
                            <div style={{ display: "flex" }}>
                              <p style={{ marginRight: 5 }}>Items: </p>
                              <div>
                                {Object.keys(val.orders).map((order, key) => {
                                  const value = Object.values(val.orders)[key];
                                  return (
                                    <p key={key}>
                                      - {order}: {value}
                                    </p>
                                  );
                                })}
                              </div>
                            </div>

                            <p>Total Harga: Rp.{val.totalPrice}</p>
                            <p>Total Ongkir: Rp.{val.ongkir}</p>
                          </Card>
                        );
                      })
                  )
                ) : null}
              </div>
              <div className="status-card__container">
                <Card
                  className="status-card__container-header"
                  onClick={() => setOpenFinishStatus(!openFinishStatus)}
                >
                  <p style={{ fontSize: 20 }}>
                    <b>Finish</b>
                  </p>
                  {openFinishStatus ? (
                    <IoMdArrowDropup
                      style={{ fontSize: 25 }}
                      onClick={() => setOpenFinishStatus(!openFinishStatus)}
                    />
                  ) : (
                    <IoMdArrowDropdown
                      style={{ fontSize: 25 }}
                      onClick={() => setOpenFinishStatus(!openFinishStatus)}
                    />
                  )}
                </Card>
                {openFinishStatus ? (
                  onFinishStatus.length === 0 ? (
                    <Card>
                      <p>You have 0 finish</p>
                    </Card>
                  ) : (
                    onFinishStatus
                      .sort((a, b) => a.finishDate - b.finishDate)
                      .map((val, key) => {
                        return (
                          <Card key={key} className="status-card__item">
                            <p>
                              Tanggal Selesai:{" "}
                              {formatDate(val.finishDate).toDateFormat()}
                            </p>
                            <p>
                              Tanggal Pickup:{" "}
                              {formatDate(val.pickUpDate).toDateFormat()}
                            </p>
                            <p>Paket: {val.transactionType}</p>
                            <p>-Penyerhan pakaian: {val.submissionType}</p>
                            <p>-Pengambilan pakaian: {val.deliveryType}</p>
                            <div style={{ display: "flex" }}>
                              <p style={{ marginRight: 5 }}>Items: </p>
                              <div>
                                {Object.keys(val.orders).map((order, key) => {
                                  const value = Object.values(val.orders)[key];
                                  return (
                                    <p key={key}>
                                      - {order}: {value}
                                    </p>
                                  );
                                })}
                              </div>
                            </div>

                            <p>Total Harga: Rp.{val.totalPrice}</p>
                            <p>Total Ongkir: Rp.{val.ongkir}</p>
                          </Card>
                        );
                      })
                  )
                ) : null}
              </div>
            </React.Fragment>
          )}
        </Card>
      </StyledStatus>
    </ComponentLayout>
  );
};

const StyledStatus = styled.div`
  height: 100%;

  .status-card {
    height: 100%;

    &__container {
      margin-bottom: 5px;
    }
    &__container-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__item {
      border-top: 1px solid black;
    }
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
