import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

import AllProductsView from "./views/AllProductsView.vue";
import LoginView from "./views/LoginView.vue";
import AllOrdersView from "./views/AllOrdersView.vue";
import DashboardView from "./views/DashboardView.vue";
import AddProductView from "./views/AddProductView.vue";

import OrderDetail from "./components/OrderDetail.vue";
import EditProduct from "./components/EditProduct.vue";

const routes = [
  { path: "/", component: DashboardView },
  { path: "/login", component: LoginView },
  { path: "/orderDetail/:_id", component: OrderDetail },
  { path: "/allOrders", component: AllOrdersView },
  { path: "/allProducts", component: AllProductsView },
  { path: "/product/edit/:_id", component: EditProduct },
  { path: "/addProduct", component: AddProductView },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.config.globalProperties.$clientURL = "http://localhost:8080";
app.config.globalProperties.$mainURL = "http://localhost:8081";
app.config.globalProperties.$apiURL = "http://localhost:3002";
app.config.globalProperties.$accessTokenKey = "accessTokenKey";
app.config.globalProperties.$months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

app.config.globalProperties.$user = null;
app.config.globalProperties.$login = false;

app.config.globalProperties.$headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("accessTokenKey"),
};

app.use(router);
app.mount("#app");
