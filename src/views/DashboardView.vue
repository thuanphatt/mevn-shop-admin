<template>
  <!-- End Navbar -->
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-md-12">
        <div class="card card-bg-primary">
          <div class="card-header">
            <h4 class="font-weight-bolder">Configurations</h4>
          </div>

          <div class="card-body">
            <form v-on:submit.prevent="saveConfigurations">
              <div class="input-group input-group-outline mb-3">
                <label
                  class="form-label no-left-margin text-white text-uppercase opacity-7"
                  >Stripe publishable key</label
                >
                <input
                  type="password"
                  class="form-control text-white"
                  name="stripePublishableKey"
                  v-bind:value="
                    configurations == null
                      ? ''
                      : configurations.stripePublishableKey
                  "
                />
              </div>

              <div class="input-group input-group-outline mb-3">
                <label
                  class="form-label no-left-margin text-white text-uppercase opacity-7"
                  >Stripe secret key</label
                >
                <input
                  type="password"
                  class="form-control text-white"
                  name="stripeSecretKey"
                  v-bind:value="
                    configurations == null ? '' : configurations.stripeSecretKey
                  "
                />
              </div>

              <div class="input-group input-group-outline mb-3">
                <label
                  class="form-label no-left-margin text-white text-uppercase opacity-7"
                  >PayPal client ID</label
                >
                <input
                  type="password"
                  class="form-control text-white"
                  name="paypalClientId"
                  v-bind:value="
                    configurations == null ? '' : configurations.paypalClientId
                  "
                />
              </div>

              <div class="input-group input-group-outline mb-3">
                <label
                  class="form-label no-left-margin text-white text-uppercase opacity-7"
                  >Admin email</label
                >
                <input
                  type="email"
                  class="form-control text-white"
                  name="adminEmail"
                  v-bind:value="
                    configurations == null ? '' : configurations.adminEmail
                  "
                />
              </div>

              <div class="text-center">
                <button
                  type="submit"
                  class="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0"
                  style="box-shadow: none; background-color: #4caf50"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";

export default {
  data() {
    return {
      configurations: null,
    };
  },

  methods: {
    saveConfigurations: async function () {
      const form = event.target;
      const formData = new FormData(form);

      const response = await axios.post(
        this.$apiURL + "/admin/saveConfigurations",
        formData,
        {
          headers: this.$headers,
        }
      );

      swal.fire("Configurations", response.data.message, response.data.status);
    },
  },

  mounted: async function () {
    const response = await axios.post(
      this.$apiURL + "/getConfigurations",
      null
    );

    if (response.data.status == "success") {
      this.configurations = response.data.configurations;
    }
  },
};
</script>
