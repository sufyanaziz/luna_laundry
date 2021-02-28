import React from "react";
import styled from "styled-components";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";
import { TextField } from "components/global/Input";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RouteComponentProps } from "react-router-dom";

interface LocationProps extends RouteComponentProps {}

const Location: React.FC<LocationProps> = ({ history }) => {
  return (
    <ComponentLayout isLogin={true}>
      <StyledLocation>
        <Card style={{ height: "100%" }} bgColor="mix-blue">
          <div className="location__my-location">
            <p>My Location :</p>
            <TextField
              value=""
              onChange={e => ""}
              type="text"
              placeholder="Find Location"
            />
          </div>

          <div className="location__nearby-location">
            <div className="location__nearby-location-header">
              <p>Nearby</p>
            </div>
            <Card
              className="location__nearby-location-card"
              onClick={() => history.push("/request-courier")}
            >
              <div className="location__nearby-location-text">
                <p>0.3km</p>
                <p>Jl. Pak Tahau</p>
              </div>
              <div className="location__nearby-location-icon">
                <FaMapMarkerAlt />
              </div>
            </Card>
            <Card className="location__nearby-location-card">
              <div className="location__nearby-location-text">
                <p>0.3km</p>
                <p>Jl. Pak Tahau</p>
              </div>
              <div className="location__nearby-location-icon">
                <FaMapMarkerAlt />
              </div>
            </Card>
          </div>
        </Card>
      </StyledLocation>
    </ComponentLayout>
  );
};

const StyledLocation = styled.div`
  height: 100%;

  .location {
    &__my-location {
      p {
        font-weight: bold;
        font-size: 20px;
      }
    }

    // Nearby Location -------------------

    &__nearby-location {
      margin: 10px 0;
    }

    &__nearby-location-header {
      margin-bottom: 10px;

      p {
        font-weight: bold;
        font-size: 20px;
      }
    }

    &__nearby-location-card {
      margin-bottom: 10px;
      display: grid;
      grid-template-columns: 1fr 0.5fr;
      align-items: center;
    }
    &__nearby-location-icon {
      font-size: 25px;
      display: flex;
      justify-content: center;
    }
  }
`;

export default Location;
