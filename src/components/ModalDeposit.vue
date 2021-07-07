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
          <div>
            <div class="d-flex ">
              <div>
                <label >Agência <input size="9" v-model="agency" maxlength="9" type="text" style="width: 120px"></label>
              </div>
              <div class="mx-1">
                <label>DV <input type="text" v-model="agency_dv" style="width: 40px"></label>
              </div>
            </div>

            <div class="d-flex mt-3">
              <div class="">
                <label >Número da conta <input size="9" v-model="number_account" maxlength="9" type="text" style="width: 120px"></label>
              </div>
              <div class="mx-1">
                <label>DV <input type="text" v-model="number_account_dv" style="width: 40px"></label>
              </div>
            </div>

            <div class="d-flex mt-3">
              <div>
                <label>
                  Valor para depósito
                  <input type="number" v-model="value" class="text-end">
                </label>
              </div>
            </div>

          </div>

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
  name: 'ModalDeposit',
  props: {
    balance: String,
  },
  data(){
    return {
      data:{
        value: 0,
        agency: '',
        agency_dv: '',
        number_account: '',
        number_account_dv: '',
      }
    }
  },
  methods:{
    deposit(){
      if(this.value === 0 || this.value === undefined || this.agency === ''|| this.agency_dv === '' || this.number_account === ''|| this.number_account_dv === undefined || this.agency === undefined || this.agency_dv === undefined || this.number_account === undefined|| this.number_account_dv === undefined){
        alert('Preencha todos os campos!')
        return
      }else{
        axios.post(process.env.VUE_APP_API_URL+'/api/bank_account/deposit',{
          token: localStorage.token_api,
          value: this.value,
          agency: this.agency,
          agency_dv: this.agency_dv,
          number_account: this.number_account,
          number_account_dv: this.number_account_dv,
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
