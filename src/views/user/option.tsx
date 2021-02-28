import React from "react";
import styled from "styled-components";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";
import ImageSend from "assets/img/logo1.png";

import { Button } from "components/global/Button";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {}

const Option: React.FC<Props> = ({ history }) => {
  return (
    <ComponentLayout isLogin={true}>
      <StyledOption>
        <Card bgColor="mix-blue">
          <Card className="option-card">
            <div className="option-card__type">
              <div className="option-card__type-input">
                <input type="radio" />
                <label>Paket Biasa (3 hari)</label>
              </div>
              <div className="option-card__type-input">
                <input type="radio" />
                <label>Paket Cepat (1 hari)</label>
              </div>
            </div>

            <div className="option-card__get">
              <div className="option-card__get-header">
                <p>Penyerahan Pakaian</p>
              </div>
              <div className="option-card__get-inputs">
                <div className="option-card__get-input">
                  <input type="radio" />
                  <div className="option-card__get-image">
                    <img src={ImageSend} alt="laundry-gambar" />
                  </div>
                </div>
                <div className="option-card__get-input">
                  <input type="radio" />
                  <div className="option-card__get-image">
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
                  <input type="radio" />
                  <div className="option-card__send-image">
                    <img src={ImageSend} alt="laundry-gambar" />
                  </div>
                </div>
                <div className="option-card__send-input">
                  <input type="radio" />
                  <div className="option-card__send-image">
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
