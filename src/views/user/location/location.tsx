import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";
import { TextField } from "components/global/Input";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RouteComponentProps } from "react-router-dom";
import { LocationType } from "./location-types";

import axios, { AxiosResponse } from "axios";
import { useStore } from "context";

interface ResLocationType extends AxiosResponse {
  data: LocationType;
}

interface Props extends RouteComponentProps {}

const Location: React.FC<Props> = ({ history }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [locationInput, setLocationInput] = useState<string>("");

  const { event, location } = useStore();

  const locationObjectLen = Object.keys(location).length;
  // Get geolocation -----------
  const getGeolocation = () => {
    if (locationObjectLen === 0) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            // for get position geolocation (lat, long, ...more)
            const x = position.coords.latitude;
            const y = position.coords.longitude;
            // get location from x and y
            getLocation(x, y);
          },
          () => {
            // for error user denied geolocation
            setLoading(false);
            window.alert("Something went wrong, location is disabled");
          }
        );
      } else {
        setLoading(false);
        console.log("The browser is not support geolocation");
      }
    } else {
      setLoading(false);
      setLocationInput(location.locality);
    }
  };

  // Get Location -------------------------------
  const getLocation = React.useCallback(
    async (lat: number, long: number) => {
      const api = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`;
      try {
        const res: ResLocationType = await axios.get(api);
        if (res.data) {
          setLoading(false);
          event.getLocationUser(res.data);
          setLocationInput(res.data.locality);
        } else {
          setLoading(false);
          event.getLocationUser({} as LocationType);
        }
      } catch (err) {
        setLoading(false);
      }
    },
    [event]
  );
  //  ---------------------------------------

  useEffect(getGeolocation, [locationObjectLen, location, getLocation]);

  return (
    <ComponentLayout isLogin={true}>
      <StyledLocation>
        <Card style={{ height: "100%" }} bgColor="mix-blue">
          {loading ? (
            <p>Please wait, getting location...</p>
          ) : (
            <>
              <div className="location__my-location">
                <p>My Location :</p>
                <TextField
                  value={locationInput}
                  onChange={e => setLocationInput(e.target.value)}
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
            </>
          )}
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
