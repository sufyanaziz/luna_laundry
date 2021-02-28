import { useState } from "react";
import styled from "styled-components";
import { SelectInput } from "components/global/Input";
import { Button } from "components/global/Button";
import { RouteComponentProps } from "react-router-dom";

// App Layout -------------------------------------------------------------
interface AppProps {}

export const AppLayout: React.FC<AppProps> = ({ children }) => {
  return (
    <StyledApp>
      <div className="app-container">{children}</div>
    </StyledApp>
  );
};

const StyledApp = styled.div`
  background: #eee;
  min-height: 100vh;
  display: flex;
  justify-content: center;

  .app-container {
    background: var(--lightBlue);
    width: 420px;
  }
`;

// Layout Component -----------------------------------------------------
interface ComponentProps extends RouteComponentProps {
  isLogin?: boolean;
  isSelectRole?: boolean;
}

export const ComponentLayout: React.FC<Partial<ComponentProps>> = ({
  children,
  isLogin = false,
  isSelectRole = false,
  history,
}) => {
  const [selectRole, setSelectRole] = useState<string>("Costumer");

  const roles = ["Costumer", "Admin"];

  const handleChangeSelectRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectRole(value);
  };

  const HistoryHeader = () => {
    return isLogin ? history?.push("/home") : history?.push("/");
  };

  return (
    <StyledComponent>
      <div className="component-header">
        <p onClick={HistoryHeader}>{!isLogin && "Welcome to"} Luna Laundry</p>
        {isSelectRole && (
          <SelectInput
            onChange={handleChangeSelectRole}
            values={roles}
            value={selectRole}
          />
        )}
        {isLogin && (
          <div style={{ width: "100%" }}>
            <Button
              className="component-header-button"
              text="Log Out"
              background="primary"
            />
          </div>
        )}
      </div>
      <div className="component-main">{children}</div>
    </StyledComponent>
  );
};

const StyledComponent = styled.div`
  display: grid;
  grid-template-rows: 0.8fr 2fr;
  height: 100%;

  .component-header {
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    & p {
      margin-bottom: 10px;
      font-size: 24px;
      font-weight: bold;
    }

    & .component-header-button {
      float: right;
      border-radius: 4px;
    }
  }

  .component-footer {
    background: transparent;
  }

  .component-main {
    position: relative;
    overflow-y: auto;
    height: 100%;
  }
  @media only screen and (min-height: 665.99px) {
    .component-main {
      max-height: 465px;
    }
  }
  @media only screen and (min-height: 735.99px) {
    .component-main {
      max-height: 500px;
    }
  }
  @media only screen and (min-height: 811.99px) {
    .component-main {
      max-height: 560px;
    }
  }
`;
