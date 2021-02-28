import React from "react";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";

import { RouteComponentProps, Link } from "react-router-dom";
import styled from "styled-components";

interface Props extends RouteComponentProps {}

const LISTS = [
  {
    name: `Information about Luna Laundry`,
    path: "/about-us",
    className: "list-card",
  },
  { name: "Order", path: "/option", className: "list-card" },
  { name: "History Order", path: "/history-order", className: "list-card" },
  { name: "Cek Status Laundry", path: "/status", className: "list-card" },
];

const Dashboard: React.FC<Props> = ({ history }) => {
  return (
    <ComponentLayout isLogin={true} history={history}>
      <StyledDashboard>
        <Card className="dashboard-card" bgColor="mix-blue">
          {LISTS.map(list => {
            return (
              <Card key={list.name} className={list.className}>
                <Link to={list.path}>{list.name}</Link>
              </Card>
            );
          })}
        </Card>
      </StyledDashboard>
    </ComponentLayout>
  );
};

const StyledDashboard = styled.div`
  height: 100%;

  .dashboard-card {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 4rem !important;
  }

  .list-card {
    height: 90px;
    width: 100%;
    & a {
      width: 100%;
      height: 100%;
      color: var(--black);
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      text-decoration: none;
    }
  }
`;

export default Dashboard;
