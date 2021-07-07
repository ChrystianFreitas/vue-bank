<template>
  <div>
    <img style="width: 200px" src="@/assets/images/capgemini.png" alt="">
  </div>
  <div class="hello">
    <h1>{{ name }} <button class="btn btn-danger" @click="logout">Sair</button></h1>
    <h2 class="mt-3">Saldo <span class="alert-success">{{ balanceFormatted }}</span></h2>
    <div class="mt-5 container-fluid w-100 p-lg-5 d-flex justify-content-around">
      <button class="btn btn-lg btn-primary" @click="showModalWithdraw=true">Sacar</button>
      <button class="btn btn-lg btn-primary" @click="showModalDepositOwnAccount=true">Depositar para essa conta</button>
      <button class="btn btn-lg btn-primary" @click="showModalDeposit=true">Depositar em outra conta</button>

    </div>

  </div>
  <modal-withdraw v-bind:balanceFormatted= "balanceFormatted" v-bind:balance= "balance"  v-if="showModalWithdraw" @close="updateBalance(); showModalWithdraw = false;" name="Umesh">
  </modal-withdraw>
  <modal-deposit-own-account v-if="showModalDepositOwnAccount" @close="updateBalance(); showModalDepositOwnAccount = false;" name="Umesh">
  </modal-deposit-own-account>
  <modal-deposit v-if="showModalDeposit" @close="updateBalance(); showModalDeposit = false;" name="Umesh">
  </modal-deposit>
</template>

<script>
import axios from "axios";
import ModalWithdraw from "@/components/ModalWithdraw"
import ModalDepositOwnAccount from "@/components/ModalDepositOwnAccount";
import ModalDeposit from "@/components/ModalDeposit";

export default {
  name: 'Panel',
  components: {ModalWithdraw, ModalDepositOwnAccount, ModalDeposit},
  props: {
    msg: String
  },
  data(){
    return {
      name: localStorage.name,
      balance: '',
      balanceFormatted: '',
      showModalWithdraw:false,
      showModalDepositOwnAccount:false,
      showModalDeposit:false,
    }
  },
  methods:{
    updateBalance(){
      axios.post(process.env.VUE_APP_API_URL+'/api/bank_account/balance',{
        token: localStorage.token_api
      }).then(response =>{
        this.balanceFormatted = response.data.balance.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        this.balance = response.data.balance;
        console.log(response.data)
      }).catch(() => {
        console.log('error')
      })
    },
    logout(){
      axios.post(process.env.VUE_APP_API_URL+'/api/user/logout',{
        token: localStorage.token_api
      }).then(response =>{
        console.log(response)
        localStorage.clear()
        this.$router.push({
          name: 'login'
        })
      }).catch(() => {
        localStorage.clear()
        this.$router.push({
          name: 'login'
        })
      })
    }
  },
  mounted() {
    this.updateBalance()
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
.modal-active{
  display:block;
}
</style>
