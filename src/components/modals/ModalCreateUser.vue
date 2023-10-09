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
              <v-btn color="success" @click="createUser()">Create</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
  methods: {
    ...mapActions({
      createUserSt:'UserStoreModule/createUser'
    }),
    createUser() {
      this.createUserSt({
        user_name: this.name
      }).then((res) => {
        if(res.status === 201) {
           console.log('created!')
        } else {
          console.log('created error!')
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped></style>
