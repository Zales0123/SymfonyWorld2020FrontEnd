<template>
  <div id="login-form">
    <form ref="loginForm">
      <h1>Login</h1>
      <label for="email">Email:</label>
      <input id="email" type="email" ref="email"/>
      <label for="password">Password:</label>
      <input id="password" type="password" ref="password" />
      <br/><button type="submit" @click.stop.prevent="login">Login</button>
    </form>
  </div>
</template>


<script>
const axios = require('axios');

export default {
  name: 'LoginForm',
  mounted: function () {
    document.querySelector('#login-form').hidden = this.$session !== undefined;
  },
  methods: {
    login() {
      let email = this.$refs.email.value;
      let password = this.$refs.password.value;

      axios
        .post(
            'LOGIN_URL',
            {'email': email, 'password': password},
            { headers: { accept: 'application/json', 'Content-Type': 'application/json' } }
        )
        .then((response) => {
          let token = response.data.token;

          if (!this.$session.exists()) {
            this.$session.start();
          }
          this.$session.set('token', token);

          document.getElementById('login-form').hidden = true;
        })
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#login-form { width: 800px; margin: 0 auto; text-align: left; }
</style>
