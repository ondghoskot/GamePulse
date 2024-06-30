<template>
  <div class="wrapper">
    <div class="gp_form">
      <h1>Sign Up</h1>
      <form class="form-group" @submit.prevent="register">
        <input
          v-model="firstName"
          type="text"
          placeholder="First Name"
          required
        />
        <input
          v-model="lastName"
          type="text"
          placeholder="Last Name"
          required
        />
        <input v-model="emailLogin" type="email" placeholder="Email" required />
        <input
          v-model="passwordLogin"
          type="password"
          placeholder="Password"
          required
        />
        <input type="submit" value="Create Account"/>
        <p class="text-md">
          Already have an account?
          <a href="/login">Sign in here</a>
        </p>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      emailLogin: "",
      passwordLogin: "",
      lastName: "",
      firstName: "",
    };
  },
  methods: {
    async register() {
      try {
        let response = await this.$axios.post("/register", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.emailLogin,
          password: this.passwordLogin,
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        });

        console.log(response);

        if (response.status == 201) {
          console.log('Registration successful:', response.data);
          this.$store.commit("setToken", response.data.jwt);
          this.$store.commit("setUserData", response.data.user);
          this.$axios.setToken(response.data.jwt, "Bearer");
          this.$router.push("/");
        }
      } catch (err) {
        console.error("Error during registration:", err);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.form-group {
  display: flex;
  flex-direction: column;
}
.wrapper {
  height: calc(100vh - 20rem);
}
.gp_form {
  display: flex;
  flex-direction: column;
  width: 25rem;
  height: 100%;
  padding: 1rem;
  color: #fff;
  margin: 5rem auto;

  h1 {
    margin-bottom: 2rem;
  }
  input::placeholder {
    padding-left: 0.35rem;
  }

  input[type="email"],
  input[type="text"],
  input[type="password"] {
    height: 2.5rem;
    margin-bottom: 1rem;
    background: #151515;
    border: 1px solid #a65afa;
    border-radius: 4px;
    color: #fff;
  }
  input[type="submit"] {
    font-weight: 600;
    cursor: pointer;
    height: 2.5rem;
    width: 50%;
    margin: 1rem auto 0 auto;
    margin-bottom: 3rem;
    background: #a65afa;
    border: 1px solid #a65afa;
    box-shadow: 0 0 25px 0 #a65afa, 0 20px 25px 0 rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    color: #fff;
  }
  a {
    color: #a65afa;
  }
}
</style>
