<template>
  <div
    class="page-header align-items-start min-vh-100"
    style="
      background-image: url('https://c4.wallpaperflare.com/wallpaper/317/630/437/artwork-simple-background-blue-stars-wallpaper-preview.jpg');
    "
  >
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container my-auto">
      <div class="row">
        <div class="col-lg-4 col-md-8 col-12 mx-auto">
          <div class="card z-index-0 fadeIn3 fadeInBottom card-bg-primary">
            <div
              class="card-header p-0 position-relative z-index-2 card-bg-primary m-0"
            >
              <div class="card-bg-primary border-radius-lg py-3 pe-1 m-0">
                <h4 class="text-white font-weight-bolder text-center mb-0">
                  Sign in
                </h4>
              </div>
            </div>
            <div class="card-body pt-0">
              <form
                id="login-form"
                class="text-start"
                v-on:submit.prevent="doLogin"
              >
                <div class="input-group input-group-outline">
                  <label
                    class="form-label no-left-margin text-white"
                    style="letter-spacing: 1.6px"
                    >Email</label
                  >
                  <input
                    type="email"
                    name="email"
                    autocomplete="off"
                    class="form-control text-white"
                    style="
                      background-color: rgba(255, 255, 255, 0.15);
                      border: 1px solid rgba(255, 255, 255, 0.15);
                    "
                  />
                </div>
                <div class="input-group input-group-outline mb-3">
                  <label
                    class="form-label no-left-margin text-white"
                    style="letter-spacing: 1.6px"
                    >Password</label
                  >
                  <input
                    type="password"
                    name="password"
                    autocomplete="off"
                    class="form-control text-white"
                    style="
                      background-color: rgba(255, 255, 255, 0.15);
                      border: 1px solid rgba(255, 255, 255, 0.15);
                    "
                  />
                </div>
                <div class="text-center">
                  <button
                    type="submit"
                    name="submit"
                    class="btn bg-gradient-primary w-100 my-4 mb-2 btn-sign-in"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";
import store from "../vuex/store";

export default {
  methods: {
    doLogin: async function () {
      const form = event.target;
      const formData = new FormData(form);

      form.submit.setAttribute("disabled", "disabled");

      const response = await axios.post(
        this.$apiURL + "/admin/login",
        formData
      );

      form.submit.removeAttribute("disabled");

      if (response.data.status == "success") {
        // get access token from server
        const accessToken = response.data.accessToken;

        // save in local storage
        localStorage.setItem(this.$accessTokenKey, accessToken);

        form.reset();
        this.$headers.Authorization = "Bearer " + accessToken;

        store.commit("setAdmin", response.data.admin);
        store.commit("setLogin", true);

        this.$router.push({
          path: "/",
        });
      } else {
        swal.fire("Error", response.data.message, "error");
      }
    },
  },

  mounted: function () {
    setTimeout(function () {
      const form = document.getElementById("login-form");
      form.email.value = "";
      form.password.value = "";
    }, 500);
  },
};
</script>
<style scoped>
.btn-sign-in {
  margin: 50px 0;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-style: normal;
  font-variant: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  font-family: Montserrat, sans-serif;
  letter-spacing: 2.8px;
  color: rgba(0, 0, 0, 1);
  width: 50%;
  height: 40px;
  border: none;
  background-color: #fff;
  outline: none;
  cursor: pointer;
  padding: 0;
  border-radius: 40px;
}
</style>
