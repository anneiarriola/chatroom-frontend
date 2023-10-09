<template>
  <div>
    <v-dialog
      v-model="show"
      max-width="500px"
      transition="dialog-top-transition"
    >
      <v-card>
        <v-card-title>Create User</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              label="User name"
              required
            ></v-text-field>
            <div class="text-right">
              <v-btn color="success">Create</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: '',
      statusCreatedUser: null,
      valid: false
    };
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close", this.statusCreatedUser);
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
