import React, { useState } from "react";
import styled from "styled-components";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { SelectInput, TextField } from "components/global/Input";
import { Button } from "components/global/Button";
import { getFullDays, getMonths, generateYear, formatDate } from "utils/date";

import { useStore } from "context";
import { LocalStorageTransaction } from "utils/localStorage";

interface PickupDateProps extends RouteComponentProps {}

const PickupDate: React.FC<PickupDateProps> = ({ history }) => {
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const timeExp = /^([0-1][0-9]|[2][0-4]):[0-5][0-9]$/;

  const { transaction, setTransactions } = useStore();

  const handleNextPickupDate = () => {
    const pickUpDate =
      day === "" || month === "" || year === "" || time === ""
        ? ""
        : formatDate(`${day}-${month}-${year} ${time}`).toISOString();

    setTransactions({ ...transaction, pickUpDate });
    history.push("/order");
  };

  const onDisabledButton = () => {
    if (timeExp.test(time)) {
      if (day === "" || month === "" || year === "" || time === "") {
        return true;
      } else {
        const pickupDate = formatDate(
          `${day}-${month}-${year} ${time}`
        ).getTime();
        if (pickupDate <= formatDate().getTime()) return true;
        else return false;
      }
    } else {
      return true;
    }
  };

  const _localStorageTransaction = LocalStorageTransaction();
  if (_localStorageTransaction === null) return <Redirect to="/option" />;

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
                <SelectInput
                  value={day}
                  onChange={e => setDay(e.target.value)}
                  values={getFullDays()}
                  label="Day"
                  isRemoveLabel={day !== "" ? true : false}
                />
              </div>
              <div className="pickupDate-card__select-field">
                <SelectInput
                  value={month}
                  onChange={e => setMonth(e.target.value)}
                  values={getMonths()}
                  label="Month"
                  isRemoveLabel={month !== "" ? true : false}
                />
              </div>
              <div className="pickupDate-card__select-field">
                <SelectInput
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  values={generateYear(
                    formatDate().getFullYear(),
                    formatDate().getFullYear() + 2
                  )}
                  sort={{ by: "ASC", value: "num" }}
                  label="Year"
                  isRemoveLabel={year !== "" ? true : false}
                />
              </div>
            </div>
            <div className="pickupDate-card__header">
              <p>Waktu/Jam Pengembalian</p>
            </div>
            <div className="pickupDate-card__input">
              <TextField
                placeholder="00:00"
                type="text"
                value={time}
                onChange={e => {
                  setTime(e.target.value);
                }}
              />
            </div>
            <div className="pickupDate-card__action">
              <Button
                text="CONFIRM"
                background="primary"
                onClick={() => handleNextPickupDate()}
                disabled={onDisabledButton()}
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
