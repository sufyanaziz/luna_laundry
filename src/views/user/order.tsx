import React from "react";
import styled from "styled-components";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";
import { RouteComponentProps } from "react-router-dom";
import { TextField } from "components/global/Input";
import { All_Data_Pakaian } from "assets/data/pakaian";
import { Button } from "components/global/Button";

interface OrderProps extends RouteComponentProps {}

const Order: React.FC<OrderProps> = ({ history }) => {
  return (
    <ComponentLayout isLogin={true}>
      <StyledOrder>
        <Card bgColor="mix-blue" style={{ height: "100%" }}>
          <Card className="order-card" style={{ background: "white" }}>
            <div className="order-card__top-inputs">
              <div className="order-card__top-input">
                <p>nama</p>
                <p> :</p>
                <TextField value="" onChange={e => ""} type="text" />
              </div>
              <div className="order-card__top-input">
                <p>Karegori</p>
                <p> :</p>
                <TextField value="" onChange={e => ""} type="text" />
              </div>
            </div>
            <div className="order-card__bottom-inputs">
              <div className="order-card__bottom-table">
                <div className="order-card__bottom-table-header">
                  <p>Pakaian</p>
                </div>
                <div className="order-card__bottom-table-header">
                  <p>Jumlah</p>
                </div>
              </div>
              {All_Data_Pakaian.map(data => {
                return (
                  <div className="order-card__bottom-table-child" key={data}>
                    <div className="order-card__bottom-table-child-header">
                      <p>{data}</p>
                    </div>
                    <div className="order-card__bottom-table-child-header">
                      <p>0</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
          <div className="order-button">
            <Button
              text="Order"
              type="button"
              background="primary"
              onClick={() => history.push("/payment")}
            />
          </div>
        </Card>
      </StyledOrder>
    </ComponentLayout>
  );
};

const StyledOrder = styled.div`
  height: 100%;

  .order-button {
    margin-top: 10px;
    text-align: center;
    width: 100%;

    button {
      width: 200px;
    }
  }

  .order-card {
    &__top-input {
      display: grid;
      grid-template-columns: 0.4fr 0.1fr 1fr;
      align-items: center;
    }

    &__bottom-inputs {
      overflow-y: scroll;
      margin-top: 10px;
    }

    &__bottom-table,
    &__bottom-table-child {
      display: grid;
      grid-template-columns: 1fr 1fr;
      text-align: center;
      align-items: center;
    }
    &__bottom-table-header,
    &__bottom-table-child-header {
      padding: 5px 6px;
      border: 1px solid rgba(0, 0, 0, 0.5);
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media only screen and (min-height: 665.99px) {
      &__bottom-inputs {
        height: 220px;
      }
    }
    @media only screen and (min-height: 735.99px) {
      &__bottom-inputs {
        height: 255px;
      }
    }
    @media only screen and (min-height: 811.99px) {
      &__bottom-inputs {
        height: 315px;
      }
    }
  }
`;

export default Order;
