import React, { useEffect } from "react";

import { RouteComponentProps } from "react-router-dom";

import styled from "styled-components";

interface Props extends RouteComponentProps {}

const ErrorPage: React.FC<Props> = ({ history }) => {
  useEffect(() => {
    document.title = "Luna Laundry - Not Found";
  }, []);
  return (
    <StyledErrorPage>
      <p>Not found</p>
    </StyledErrorPage>
  );
};

const StyledErrorPage = styled.div``;

export default ErrorPage;
