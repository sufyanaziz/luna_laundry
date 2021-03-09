import React, { useState } from "react";
import styled from "styled-components";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";
import ImageSend from "assets/img/logo1.png";

import { Button } from "components/global/Button";
import { RadioInput } from "components/global/Input";
import { RouteComponentProps } from "react-router-dom";
import { validateInput } from "utils/validation";
// import { useUser } from "context";

interface Props extends RouteComponentProps {}

const Option: React.FC<Props> = ({ history }) => {
  // const { credentials } = useUser();
  const [optionPaket, setOptionPaket] = useState<string>("");
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

  return (
    <ComponentLayout isLogin={true}>
      <StyledOption>
        <Card bgColor="mix-blue">
          <Card className="option-card">
            <div className="option-card__type">
              <div className="option-card__type-input">
                <RadioInput
                  id="radio-paketBiasa"
                  label="Paket Biasa (3 hari)"
                  value="Paket Biasa"
                  onChange={e => setOptionPaket(e.target.value)}
                  checked={optionPaket === "Paket Biasa" ? true : false}
                  onClickLabel={() => setOptionPaket("Paket Biasa")}
                />
              </div>
              <div className="option-card__type-input">
                <RadioInput
                  id="radio-paketCepat"
                  label="Paket Cepat (1 hari)"
                  value="Paket Cepat"
                  onChange={e => setOptionPaket(e.target.value)}
                  checked={optionPaket === "Paket Cepat" ? true : false}
                  onClickLabel={() => setOptionPaket("Paket Cepat")}
                />
              </div>
            </div>

            <div className="option-card__get">
              <div className="option-card__get-header">
                <p>Penyerahan Pakaian</p>
              </div>
              <div className="option-card__get-inputs">
                <div className="option-card__get-input">
                  <div
                    className="option-card__get-image"
                    onClick={() => handleSelectImagePenyerahan("Ditempat")}
                    style={{
                      border:
                        optionPenyerahan === "Ditempat"
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
                    onClick={() => handleSelectImagePenyerahan("Dijemput")}
                    style={{
                      border:
                        optionPenyerahan === "Dijemput"
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
                    onClick={() => handleSelectImagePengambilan("Sendiri")}
                    style={{
                      border:
                        optionPengambilan === "Sendiri"
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
                    onClick={() => handleSelectImagePengambilan("Diantar")}
                    style={{
                      border:
                        optionPengambilan === "Diantar"
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
            style={{ display: "flex", justifyContent: "center", marginTop: 10 }}
          >
            <Button
              style={{ width: 200 }}
              text="Confirm"
              type="button"
              background="primary"
              onClick={() => history.push("/location")}
              disabled={!disableButton().isDisabled}
            />
          </div>
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
