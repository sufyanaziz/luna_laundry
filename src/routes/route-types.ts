import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {}

export type route_type = {
  path: string;
  component: React.LazyExoticComponent<React.FC<Props>>;
  exact: boolean;
  name: string;
  type: string;
};
