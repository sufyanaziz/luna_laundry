import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";
import { TextField } from "components/global/Input";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RouteComponentProps } from "react-router-dom";
import { LocationType } from "./location-types";

import axios, { AxiosResponse } from "axios";

interface LocationProps extends RouteComponentProps {}

interface ResLocationType extends AxiosResponse {
  data: LocationType;
}

const Location: React.FC<LocationProps> = ({ history }) => {
  const [location, setLocation] = useState<LocationType>({} as LocationType);
  const [loading, setLoading] = useState<boolean>(false);
  const [locationInput, setLocationInput] = useState<string>("");
  const [locationError, setLocationError] = useState<boolean>(false);

  // Get geolocation -----------
  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          // for get position geolocation (lat, long, ...more)
          const x = position.coords.latitude;
          const y = position.coords.longitude;
          getLocation(x, y);
          setLocationError(false);
        },
        () => {
          // for error user denied geolocation
          setLocationError(true);
        }
      );
    } else {
      console.log("You're browser is not support geolocation");
      setLocationError(true);
    }
  };

  useEffect(getGeolocation, []);
  // ---------------------------

  // Check allow location -----
  const checkAllowLocation = () => {
    const locationObjectLen = Object.keys(location).length;
    if (locationError) {
      window.alert("failed get location, allow premission");
    } else {
      locationObjectLen !== 0 &&
        window.alert(
          "location is detected, you're location is " + location.locality
        );
    }
  };

  useEffect(checkAllowLocation, [location, locationError]);
  //  ---------------------------

  const getLocation = async (lat: number, long: number) => {
    setLoading(true);
    const api = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`;
    try {
      const res: ResLocationType = await axios.get(api);
      if (res.data) {
        setLoading(false);
        setLocation(res.data);
        setLocationInput(res.data.locality);
        setLocationError(false);
      } else {
        setLocation({} as LocationType);
      }
    } catch (error) {}
  };

  return (
    <ComponentLayout isLogin={true}>
      <StyledLocation>
        <Card style={{ height: "100%" }} bgColor="mix-blue">
          <div className="location__my-location">
            <p>My Location :</p>
            {loading ? (
              <p>...</p>
            ) : (
              <TextField
                value={locationInput}
                onChange={e => setLocationInput(e.target.value)}
                type="text"
                placeholder="Find Location"
              />
            )}
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
