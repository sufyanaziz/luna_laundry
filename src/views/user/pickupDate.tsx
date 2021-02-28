import React from "react";
import styled from "styled-components";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";
import { RouteComponentProps } from "react-router-dom";
import { SelectInput, TextField } from "components/global/Input";
import { Button } from "components/global/Button";

interface PickupDateProps extends RouteComponentProps {}

const PickupDate: React.FC<PickupDateProps> = ({ history }) => {
  return (
    <ComponentLayout isLogin={true}>
      <StyledPickupDate>
        <Card bgColor="mix-blue" style={{ height: "100%" }}>
          <Card className="pickupDate-card">
            <div className="pickupDate-card__header">
              <p>Tanggal Pengembalian</p>
            </div>
            <div className="pickupDate-card__select-fields">
              <div className="pickupDate-card__select-field">
                <SelectInput onChange={e => ""} values={["Date"]} value="" />
              </div>
              <div className="pickupDate-card__select-field">
                <SelectInput onChange={e => ""} values={["Month"]} value="" />
              </div>
              <div className="pickupDate-card__select-field">
                <SelectInput onChange={e => ""} values={["Year"]} value="" />
              </div>
            </div>
            <div className="pickupDate-card__header">
              <p>Waktu/Jam Pengembalian</p>
            </div>
            <div className="pickupDate-card__input">
              <TextField type="text" value="" onChange={e => ""} />
            </div>
            <div className="pickupDate-card__action">
              <Button
                text="CONFIRM"
                background="primary"
                onClick={() => history.push("/order")}
              />
            </div>
          </Card>
        </Card>
      </StyledPickupDate>
    </ComponentLayout>
  );
};

const StyledPickupDate = styled.div`
  height: 100%;

  .pickupDate-card {
    background: lightblue;
    border: 1px solid rgba(0, 0, 0, 0.5);

    &__header {
      p {
        font-size: 20px;
        font-weight: bold;
      }
    }

    &__select-fields {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      margin-bottom: 10px;
    }

    &__action {
      margin: 16px 0 0 0;
      display: flex;
      justify-content: center;
    }
  }
`;

export default PickupDate;
