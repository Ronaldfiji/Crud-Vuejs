<template>
    <div>
    <div class="row">
        <div class="col">
            <p class="h3 text-success fw-bold">Add Contacts </p>            
        </div>
    </div>

    <div>           
            <!-- Display error message -->
            <div class="row mt-3" v-if="!this.IsLoading && this.ErrorMessage">
                <div class="col">
                    <p class="fw-bold text-danger"> {{ this.ErrorMessage }} </p>
                </div>
            </div>
        </div>

    <div class="row mt-5">
        <div class="col-md-3">
            <form @submit.prevent="submitCreate()">
                <div class="mb-2">
                    <input v-model="this.customer.firstName" type="text" class="form-control" placeholder="Your name" />
                </div>
                <div class="mb-2">
                    <input v-model="this.customer.email" type="email" class="form-control" placeholder="Your email" />
                </div>
                <div class="mb-2">
                    <input v-model="this.customer.addressLine1" type="text" class="form-control" placeholder="Your Photo" />
                </div>
                <div class="mb-2">
                    <input v-model="this.customer.phone" type="number" class="form-control" placeholder="Your mobile" />
                </div>
                <div class="mb-2">
                    <input v-model="this.customer.city" type="text" class="form-control" placeholder="Your company" />
                </div>
                <div class="mb-2">
                    <input v-model="this.customer.lastName" type="text" class="form-control" placeholder="Your job title" />
                </div>
                <div class="mb-2">
                   <select  v-model="this.customer.country" type="text" class="form-control" v-if="this.Products.length > 0">
                        <option value=""> Your group </option>
                        <option  v-for="product of this.Products" :key="product.id" :value="product.id">{{product.name}}</option>
                   </select>
                </div>
                <div class="mb-2 text-end">
                    <input type="submit" class="btn btn-primary btn-sm" value="Save"  />
                </div>
            </form>

        </div>
       
        <div class="col-md-4">
            <img src="../../public/img/contactsimg/userimg.png" alt="conactimg" class="contact-img"/>

        </div>
        <pre>{{customer}}</pre>
    </div>
</div>

</template>
<script>


import { ContactsService } from '@/service/ContactsService'
//import Spinner from '@/components/Spinner.vue'

export default {
    name:'AddContact',
    components: {
       // Spinner,
    },
    data: function(){
        return{
            customer:{
                firstName: '',
                lastName:'', /*title*/
                email:'',
                phone:'',
                addressLine1:'', /* picture url */
                city:'',
                state:'teststate',
                postalCode:'00101',
                country:''
            },
            Products:[],
            IsLoading: false,
            ErrorMessage:null,
        }
    },
    created: async function () {
        try {

            this.IsLoading = true;            
            let response = await ContactsService.getProducts();
            this.Products = response.data;
            this.IsLoading = false;

        }
        catch (error) {
            this.ErrorMessage = error;
            this.IsLoading = false;
        }
    },
    methods:{
        submitCreate: async function(){
            try{
                this.customer.phone = String(this.customer.phone);               
                this.customer.country=String(this.customer.country);

                    let response = await ContactsService.createContact(this.customer);
                    if(response)
                    {
                        return this.$router.push('/');
                    }else{
                        return this.$router.push('/contact/add');

                    }
            }
            catch (error) {
            this.ErrorMessage = error;
            this.IsLoading = false;
        }

        }
    }
}
</script>
<style scoped>

</style>