<template>
  <div class="d-flex justify-content-center align-items-center vh-100 m-0 p-0">
    <div class="w-50">
      <h1>Banco</h1>
      <img class="w-50" src="@/assets/images/capgemini.png" alt="">
    </div>
    <div class="w-50 p-lg-5">
      <h1 class="h3 mb-3 font-weight-normal">Efetuar Login</h1>
      <label for="inputEmail" class="sr-only">Endereço de email</label>
      <input type="email" id="inputEmail" v-model="email" class="form-control" placeholder="Digite o seu email" required autofocus>
      <label for="inputPassword" class="sr-only mt-2">Senha</label>
      <input type="password" v-model="password" id="inputPassword" class="form-control" placeholder="Digite a sua senha" required>
      <button class="btn btn-primary btn-block mt-2" @click="login">Entrar</button>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import axios from "axios";

export default {
  name: 'Login',
  props: {
    msg: String
  },
  methods:{
    ...mapActions(['action_login']),
    login(){
      axios.post(process.env.VUE_APP_API_URL+'/api/user/login',{
        email: this.email,
        password: this.password
      }).then(response =>{
        localStorage.token_api = response.data.user.token_api
        localStorage.name = response.data.user.name
        this.$router.push({
          name: 'panel'
        })
        console.log(response.data.user)
      }).catch(() => {
        alert('Credenciais inválidas!')
      })
    }
  },
  mounted() {
    this.teste = 'start';
    if(localStorage.token_api){
      axios.post(process.env.VUE_APP_API_URL+'/api/user/checkToken',{
        token: localStorage.token_api
      }).then(response =>{
        if(response.data.expired === false){
          localStorage.token_api = response.data.user.token_api
          localStorage.name = response.data.user.name
          this.$router.push({
            name: 'panel'
          })
        }else{
          localStorage.clear()
        }
      }).catch(() => {
        alert('error!')
      })
    }
  },
  data(){
    return {
      email: '',
      password: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
