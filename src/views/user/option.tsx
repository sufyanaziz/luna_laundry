import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";
import ImageSend from "assets/img/logo1.png";

import { Button } from "components/global/Button";
import { RadioInput } from "components/global/Input";
import { RouteComponentProps } from "react-router-dom";
import { validateInput } from "utils/validation";
// import { useUser } from "context";
import { useStore, useUser } from "context";

interface Props extends RouteComponentProps {}

const Option: React.FC<Props> = ({ history }) => {
  const {
    transactionType,
    getTransactionType,
    transaction,
    setTransactions,
    loading,
  } = useStore();
  const { credentials } = useUser();

  const [optionPaket, setOptionPaket] = useState<number>(0);
  const [optionPenyerahan, setOptionPenyerahan] = useState<string>("");
  const [optionPengambilan, setOptionPengambilan] = useState<string>("");

  const handleSelectImagePenyerahan = (value: string) => {
    setOptionPenyerahan(value);
  };
  const handleSelectImagePengambilan = (value: string) => {
    setOptionPengambilan(value);
  };

  const disableButton = () => {
    const data = { optionPaket, optionPenyerahan, optionPengambilan };
    const { valid } = validateInput(data);
    return { isDisabled: valid };
  };

  const handleGettypeTransactionEffect = () => {
    if (transactionType.length === 0) getTransactionType();
  };
  useEffect(handleGettypeTransactionEffect, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClickNextOption = () => {
    const transactionTypeId = optionPaket;
    const deliveryType = optionPengambilan;
    const submissionType = optionPenyerahan;

    setTransactions({
      ...transaction,
      transactionTypeId,
      deliveryType,
      submissionType,
      userId: credentials.customerId,
    });

    history.push("/location");
  };

  return (
    <ComponentLayout isLogin={true}>
      <StyledOption>
        <Card bgColor="mix-blue">
          {loading ? (
            <Card className="option-card">
              <span>Loading...</span>
            </Card>
          ) : (
            transactionType.length !== 0 && (
              <>
                <Card className="option-card">
                  <div className="option-card__type">
                    {transactionType.map(type => {
                      const label = type.description.split("_").join(" ");
                      return (
                        <React.Fragment key={type.transactionTypeId}>
                          <div className="option-card__type-input">
                            <RadioInput
                              id="radio-paketBiasa"
                              label={label}
                              value={type.description}
                              onChange={() =>
                                setOptionPaket(type.transactionTypeId)
                              }
                              checked={
                                optionPaket === type.transactionTypeId
                                  ? true
                                  : false
                              }
                              onClickLabel={() =>
                                setOptionPaket(type.transactionTypeId)
                              }
                            />
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>

                  <div className="option-card__get">
                    <div className="option-card__get-header">
                      <p>Penyerahan Pakaian</p>
                    </div>
                    <div className="option-card__get-inputs">
                      <div className="option-card__get-input">
                        <div
                          className="option-card__get-image"
                          onClick={() =>
                            handleSelectImagePenyerahan("antar_sendiri")
                          }
                          style={{
                            border:
                              optionPenyerahan === "antar_sendiri"
                                ? "2px solid var(--darkBlue)"
                                : "none",
                          }}
                        >
                          <img src={ImageSend} alt="laundry-gambar" />
                        </div>
                      </div>
                      <div className="option-card__get-input">
                        <div
                          className="option-card__get-image"
                          onClick={() =>
                            handleSelectImagePenyerahan("dijemput")
                          }
                          style={{
                            border:
                              optionPenyerahan === "dijemput"
                                ? "2px solid var(--darkBlue)"
                                : "none",
                          }}
                        >
                          <img src={ImageSend} alt="laundry-gambar" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="option-card__send">
                    <div className="option-card__send-header">
                      <p>Pengambilan Pakaian</p>
                    </div>
                    <div className="option-card__send-inputs">
                      <div className="option-card__send-input">
                        <div
                          className="option-card__send-image"
                          onClick={() =>
                            handleSelectImagePengambilan("ambil_sendiri")
                          }
                          style={{
                            border:
                              optionPengambilan === "ambil_sendiri"
                                ? "2px solid var(--darkBlue)"
                                : "none",
                          }}
                        >
                          <img src={ImageSend} alt="laundry-gambar" />
                        </div>
                      </div>
                      <div className="option-card__send-input">
                        <div
                          className="option-card__send-image"
                          onClick={() =>
                            handleSelectImagePengambilan("diantar")
                          }
                          style={{
                            border:
                              optionPengambilan === "diantar"
                                ? "2px solid var(--darkBlue)"
                                : "none",
                          }}
                        >
                          <img src={ImageSend} alt="laundry-gambar" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                <div
                  className="option-button"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 10,
                  }}
                >
                  <Button
                    style={{ width: 200 }}
                    text="Confirm"
                    type="button"
                    background="primary"
                    onClick={() => handleClickNextOption()}
                    disabled={!disableButton().isDisabled}
                  />
                </div>
              </>
            )
          )}
        </Card>
      </StyledOption>
    </ComponentLayout>
  );
};

const StyledOption = styled.div`
  .option-card {
    height: 100%;
    background: lightblue;
    border: 1px solid rgba(0, 0, 0, 0.5);

    & .option-card__type-input {
      & input {
        margin-right: 10px;
      }
    }

    // Option card get ------------------------

    & .option-card__get {
      margin: 16px 0;

      .option-card__get-header p {
        font-size: 20px;
        font-weight: bold;
      }

      .option-card__get-inputs {
        margin-top: 10px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 0 10px;

        .option-card__get-input input {
          display: none;
        }
      }

      .option-card__get-image {
        width: auto;
        height: 90px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    // Option card send ------------------------

    & .option-card__send {
      .option-card__send-header p {
        font-size: 20px;
        font-weight: bold;
      }

      .option-card__send-inputs {
        margin-top: 10px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 0 10px;

        .option-card__send-input input {
          display: none;
        }
      }

      .option-card__send-image {
        width: auto;
        height: 90px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
`;

export default Option;
