<template>
  <div class="modal modal-active show">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <!--button type="button" @click="$emit('close')" class="close"><span >&times;</span></button-->
          <h4 class="modal-title">
            Depositar
          </h4>
        </div>
        <div class="modal-body">
          <slot></slot>
          <label>
            Valor para depósito
            <input type="number" v-model="value" class="text-end">
          </label>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" @click="$emit('close')">Cancelar</button>
          <button type="button" @click="deposit" class="btn btn-primary">Depositar</button>
        </div>
      </div>
    </div>
  </div>`
  <div class="modal-backdrop fade show"></div>
</template>

<script>
import axios from "axios";

export default {
  name: 'ModalDepositOwnAccount',
  props: {
    balance: String,
  },
  data(){
    return {
      data:{
        value: 0
      }
    }
  },
  methods:{
    deposit(){
      if(this.value === 0 || this.value === undefined){
        alert('Preencha um valor válido!');
      }else{
        axios.post(process.env.VUE_APP_API_URL+'/api/bank_account/depositOwnAccount',{
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
label{
  text-align: left;
}
.modal-active{
  display:block;
}
</style>
