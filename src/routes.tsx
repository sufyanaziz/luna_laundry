import React from "react";
import { route_type } from "./utils/types/route-types";

// Public route -------------------------------------
const Login = React.lazy(() => import("./views/login"));
const Register = React.lazy(() => import("./views/register"));
// Private User route ------------------------------
const Dashboard = React.lazy(() => import("./views/user/dashboard"));
const AboutUs = React.lazy(() => import("./views/user/aboutUs"));
const History = React.lazy(() => import("./views/user/history"));
const Status = React.lazy(() => import("./views/user/status"));
const Option = React.lazy(() => import("./views/user/option"));
const Location = React.lazy(() => import("./views/user/location"));
const RequestCourier = React.lazy(() => import("./views/user/requestCourier"));
const PickupDate = React.lazy(() => import("./views/user/pickupDate"));
const Order = React.lazy(() => import("./views/user/order"));
const Payment = React.lazy(() => import("./views/user/payment"));
const PaymentMethod = React.lazy(() => import("./views/user/paymentMethod"));
// Private Admin route -----------------------------
const PaymentConfirmation = React.lazy(
  () => import("./views/admin/paymentConfirmation")
);
const EmployeeOrders = React.lazy(() => import("./views/admin/employeeOrders"));
// Route -------------------------------------------
const routes: route_type[] = [
  // Public ------------------
  {
    name: "login",
    exact: true,
    path: "/",
    component: Login,
    type: "public",
  },
  {
    name: "register",
    exact: true,
    path: "/register",
    component: Register,
    type: "public",
  },
  // Private User -------------
  {
    name: "dashboard",
    exact: true,
    path: "/home",
    component: Dashboard,
    type: "private-user",
  },
  {
    name: "about-us",
    exact: true,
    path: "/about-us",
    component: AboutUs,
    type: "private-user",
  },
  {
    name: "history",
    exact: true,
    path: "/history-order",
    component: History,
    type: "private-user",
  },
  {
    name: "status",
    exact: true,
    path: "/status",
    component: Status,
    type: "private-user",
  },
  {
    name: "option",
    exact: true,
    path: "/option",
    component: Option,
    type: "private-user",
  },
  {
    name: "location",
    exact: true,
    path: "/location",
    component: Location,
    type: "private-user",
  },
  {
    name: "request courier",
    exact: true,
    path: "/request-courier",
    component: RequestCourier,
    type: "private-user",
  },
  {
    name: "request courier",
    exact: true,
    path: "/pickup-date",
    component: PickupDate,
    type: "private-user",
  },
  {
    name: "order",
    exact: true,
    path: "/order",
    component: Order,
    type: "private-user",
  },
  {
    name: "payment",
    exact: true,
    path: "/payment",
    component: Payment,
    type: "private-user",
  },
  {
    name: "payment method",
    exact: true,
    path: "/payment-method",
    component: PaymentMethod,
    type: "private-user",
  },
  // Private Admin ------------
  {
    name: "payment confirmation",
    exact: true,
    path: "/payment-confirmation",
    component: PaymentConfirmation,
    type: "private-admin",
  },
  {
    name: "employee orders",
    exact: true,
    path: "/employee-orders",
    component: EmployeeOrders,
    type: "private-admin",
  },
];

export default routes;
