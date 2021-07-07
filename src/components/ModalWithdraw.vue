<template>
  <div class="modal modal-active show">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <!--button type="button" @click="$emit('close')" class="close"><span >&times;</span></button-->
          <h4 class="modal-title">
            Sacar
          </h4>
        </div>
        <div class="modal-body">
          <slot></slot>
          <p>Disponível: {{balanceFormatted}}</p>
          <label>
            Valor para saque
            <input type="number" v-model="value" class="text-end">
          </label>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" @click="$emit('close')">Cancelar</button>
          <button type="button" @click="withdraw" class="btn btn-primary">Sacar</button>
        </div>
      </div>
    </div>
  </div>`
  <div class="modal-backdrop fade show"></div>
</template>

<script>
import axios from "axios";

export default {
  name: 'ModalWithdraw',
  props: {
    balance: String,
    balanceFormatted: String,
  },
  data(){
    return {
      data:{
        value: 0
      }
    }
  },
  methods:{
    withdraw(){
      if(this.value === 0 || this.value === undefined){
        alert('Preencha um valor válido!');
        return false;
      }else if(this.value > this.balance){
        alert('Saldo insuficiente');
        return false;
      }else{
        axios.post(process.env.VUE_APP_API_URL+'/api/bank_account/withdraw',{
          token: localStorage.token_api,
          value: this.value
        }).then(response =>{
          alert(response.data.message)
          this.$emit('close');
        }).catch(response => {
          alert(response)
        })
      }
    }
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-active{
  display:block;
}
</style>
