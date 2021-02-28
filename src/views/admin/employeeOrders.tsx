import React, { useEffect } from "react";
import styled from "styled-components";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";
import { RouteComponentProps } from "react-router-dom";
import { Button } from "components/global/Button";

interface EmployeeOrdersProps extends RouteComponentProps {}

const EmployeeOrders: React.FC<EmployeeOrdersProps> = ({ history }) => {
  useEffect(() => {
    document.title = "(1) Luna Laundry - Employee Order";
  }, []);
  return (
    <ComponentLayout isLogin={true}>
      <StyledEmployeeOrders>
        <Card
          className="employeeOrders-card"
          bgColor="mix-blue"
          style={{ height: "100%" }}
        >
          <Card className="employeeOrders-card__alert">
            <p>We're find a costumer!</p>
            <Button text="CHECK" background="primary" />
          </Card>
          <Card className="employeeOrders-card__main">
            <p>Tanggal : 1 September 2020</p>
            <p>Nama : Lulu</p>
            <p>Order ID : VJ31121</p>
            <p>
              Paket : <br />
              - Penyerahan : Jemput <br />
              - Pengambilan : Antar <br />
            </p>
            <p>Lokasi : Jl. Gatot Subroto</p>
            <div className="employeeOrders-card__action">
              <Button text="PICK UP" background="primary" />
              <Button text="ARRIVED" background="primary" />
            </div>
          </Card>
        </Card>
      </StyledEmployeeOrders>
    </ComponentLayout>
  );
};

const StyledEmployeeOrders = styled.div`
  height: 100%;

  .employeeOrders-card {
    &__alert {
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 24px;
      }
    }
    &__main {
      font-weight: bold;
    }

    &__action {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      button {
        width: 200px;
      }
      button:nth-child(1) {
        margin-bottom: 10px;
      }
    }
  }
`;

export default EmployeeOrders;
