<template>
  <div class="wrapper">
    <div class="gp_form">
      <h1>Sign In</h1>
      <form class="form-group" @submit.prevent="login">
        <input v-model="emailLogin" type="email" placeholder="Email" required />
         <p class="text-md pb-1"><a href="/reset">Forgot your password?</a></p>
        <input
          v-model="passwordLogin"
          type="password"
          placeholder="Password"
          required
        />
        <input type="submit" label="Login"/>
        <p class="text-md">
          Don't have an account?
          <a href="/register">Sign up here</a>
        </p>
      </form>
    </div>
  </div>
</template>
<script>

export default {
  auth:false,
  data() {
    return {
      emailLogin: "",
      passwordLogin: "",
    };
  },
  methods: {
    async login() {
      try {
        let response = await this.$axios.post("/login", {
          email: this.emailLogin,
          password: this.passwordLogin,
        });

        //this needs to be sent from my API to work
        // if (response.status == 200) {
          this.$cookies.set('gp_ssojwt', response.data.jwt, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          });
          this.$store.commit("setToken", response.data.jwt);
          this.$axios.setToken(response.data.jwt, "Bearer");
          this.$router.push("/");
        // }
      } catch (err) {
        console.log(err);
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

    font-size: 14px;
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
