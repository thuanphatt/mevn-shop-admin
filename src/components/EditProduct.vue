<template>
  <!-- End Navbar -->
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-md-12">
        <div class="card card-bg-primary">
          <div class="card-header">
            <h4 class="font-weight-bolder">Edit product</h4>
          </div>

          <div class="card-body">
            <form
              v-on:submit.prevent="editProduct"
              enctype="multipart/form-data"
              v-if="product != null"
            >
              <div class="input-group input-group-outline mb-3">
                <label
                  class="form-label no-left-margin text-uppercase text-white opacity-7"
                  >Name</label
                >
                <input
                  type="text"
                  class="form-control text-white"
                  autocomplete="off"
                  name="name"
                  v-bind:value="product.name"
                  required
                />
              </div>

              <div class="input-group input-group-outline mb-3">
                <label
                  class="form-label no-left-margin text-uppercase text-white opacity-7"
                  >Description</label
                >
                <textarea
                  name="description"
                  style="margin-top: 40px"
                  class="form-control text-white"
                  required
                  v-bind:value="product.description"
                ></textarea>
              </div>

              <div class="input-group input-group-outline mb-3">
                <label
                  class="form-label no-left-margin text-uppercase text-white opacity-7"
                  >Price ($)</label
                >
                <input
                  type="number"
                  min="0"
                  name="price"
                  autocomplete="off"
                  class="form-control text-white"
                  required
                  v-bind:value="product.price"
                />
              </div>

              <div class="input-group input-group-outline mb-3">
                <label
                  class="form-label no-left-margin text-uppercase text-white opacity-7"
                  >Items in stock (0 means unlimited, for digital
                  products)</label
                >
                <input
                  type="number"
                  min="0"
                  autocomplete="off"
                  name="itemsInStock"
                  class="form-control text-white"
                  v-bind:value="product.itemsInStock || 0"
                  required
                />
              </div>

              <div class="input-group input-group-outline mb-3">
                <label
                  class="form-label no-left-margin text-uppercase text-white opacity-7"
                  >Categories</label
                >
                <select
                  name="categories[]"
                  class="form-control text-white"
                  v-on:change="onchangeCategory"
                >
                  <option value="">Select category</option>
                  <option
                    v-for="(category, index) in categories"
                    :key="index"
                    v-text="category"
                    v-bind:value="category"
                  ></option>
                </select>
              </div>

              <div class="input-group input-group-outline mb-3">
                <label
                  class="form-label no-left-margin text-uppercase text-white opacity-7"
                  >Add new category</label
                >
                <input
                  type="text"
                  name="category"
                  autocomplete="off"
                  v-bind:value="category"
                  class="form-control text-white"
                />
              </div>

              <h3 class="text-white">Specifications</h3>
              <div
                class="row"
                v-for="(spec, index) in product.specs"
                :key="index"
              >
                <div class="col-md-6">
                  <div class="input-group input-group-outline mb-3">
                    <label
                      class="form-label no-left-margin text-uppercase text-white opacity-7"
                      >Key</label
                    >
                    <input
                      type="text"
                      autocomplete="off"
                      v-model="spec.key"
                      class="form-control text-white"
                      required
                    />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="input-group input-group-outline mb-3">
                    <label
                      class="form-label no-left-margin text-uppercase text-white opacity-7"
                      >Value</label
                    >
                    <input
                      type="text"
                      autocomplete="off"
                      v-model="spec.value"
                      class="form-control text-white"
                      required
                    />

                    <i
                      class="fa fa-close"
                      style="
                        color: #e53935;
                        position: relative;
                        top: 50px;
                        left: 10px;
                        cursor: pointer;
                      "
                      v-on:click="removeSpec(index)"
                    ></i>
                  </div>
                </div>
              </div>

              <button
                type="button"
                v-on:click="addSpec"
                class="btn bg-gradient-primary mt-4 mb-0"
                style="box-shadow: none; background-color: #01579b"
              >
                Add specs
              </button>

              <div class="input-group input-group-outline mb-3">
                <label
                  class="form-label no-left-margin text-uppercase text-white opacity-7"
                  >Images</label
                >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  name="images"
                  class="form-control text-white"
                />
              </div>

              <img
                v-for="(image, index) in product.images"
                :key="index"
                v-bind:src="$apiURL + '/' + image"
                style="display: inline-block; width: 50%; margin-top: 10px"
              />

              <div class="text-center">
                <button
                  type="submit"
                  class="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0"
                  style="box-shadow: none; background-color: #4caf50"
                >
                  Edit product
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
      // eslint-disable-next-line vue/no-reserved-keys
      _id: this.$route.params._id,
      product: null,
      categories: [],
      category: "",
    };
  },

  methods: {
    addSpec: function () {
      this.product.specs.push({
        key: "",
        value: "",
      });
    },

    removeSpec: function (index) {
      this.product.specs.splice(index, 1);
    },

    onchangeCategory: function () {
      this.category = event.target.value;
    },

    getData: async function () {
      const formData = new FormData();
      formData.append("_id", this._id);

      const response = await axios.post(
        this.$apiURL + "/admin/products/fetchSingle",
        formData,
        {
          headers: this.$headers,
        }
      );

      if (response.data.status == "success") {
        this.product = response.data.product;
        this.category = this.product.category;
      } else {
        swal.fire("Error", response.data.message, "error");
      }

      const responseConfig = await axios.post(
        this.$apiURL + "/getConfigurations",
        null
      );

      if (responseConfig.data.status == "success") {
        let configurations = responseConfig.data.configurations;
        this.categories = configurations.categories || [];
      }
    },

    editProduct: async function () {
      const form = event.target;
      const formData = new FormData(form);
      formData.append("_id", this._id);
      formData.append("specs", JSON.stringify(this.product.specs));

      const response = await axios.post(
        this.$apiURL + "/admin/products/update",
        formData,
        {
          headers: this.$headers,
        }
      );

      swal.fire("Edit product", response.data.message, response.data.status);
    },
  },

  mounted: function () {
    this.getData();
  },
};
</script>

<style>
.no-left-margin::before {
  width: auto !important;
}
</style>
