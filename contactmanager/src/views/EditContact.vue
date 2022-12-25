<template>
    <div>
        <div class="row">
            <div class="col">
                <p class="h3 text-success fw-bold">Edit Contacts </p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam tenetur veniam nam, explicabo fugit
                    facere voluptatem sit non iste magni dignissimos eius vitae expedita aspernatur provident qui
                    accusamus magnam rem.</p>
            </div>
        </div>
        <div>
            <!-- Display spinner -->
            <div class="row" v-if="this.IsLoading">
                <div class="col">
                    <spinner />
                </div>
            </div>
            <!-- Display error message -->
            <div class="row mt-3" v-if="!this.IsLoading && this.ErrorMessage">
                <div class="col">
                    <p class="fw-bold text-danger"> {{ this.ErrorMessage }} </p>
                </div>
            </div>
        </div>

        <div class="row mt-5">
            <div class="col-md-3">
                <form @submit.prevent="submitUpdate()"  @reset="onReset">
                    <div class="mb-2">
                        <label class="form-label">First name</label>
                        <input type="text" class="form-control" placeholder="Your name" v-model="contact.firstName" />
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" placeholder="Your email" v-model="contact.email" />
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Picture</label>
                        <input type="text" class="form-control" placeholder="Your Photo"
                            v-model="contact.addressLine1" />
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Phone</label>
                        <input type="number" class="form-control" placeholder="Your mobile" v-model="contact.phone" />
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Company name</label>
                        <input type="text" class="form-control" placeholder="Your company" v-model="contact.city" />
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Job Title</label>
                        <input type="text" class="form-control" placeholder="Your job title"
                            v-model="contact.lastName" />
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Product</label>
                        <select v-model="contact.country" class="form-control" v-if="Products.length > 0">
                            <option value=""> Your product</option>
                            <option :value="product.id" v-for="product of Products" :key="product.id">{{ product.name }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-2 text-end">
                        <input type="submit" class="btn btn-primary btn-sm me-1" value="Update" />
                        <input type="reset" class="btn btn-success btn-sm" value="Cancel" />
                    </div>
                </form>

            </div>
            <div class="col-md-4">
                <img src="../../public/img/contactsimg/userimg.png" alt="conactimg" class="contact-img" />

            </div>
            <pre>{{contact}}</pre>
        </div>
    </div>

</template>
<script>
import { ContactsService } from '@/service/ContactsService'
import Spinner from '@/components/Spinner.vue'

export default {
    name: 'EditContact',
    components: {
        Spinner,
    },
    data: function () {
        return {
            ContactId: this.$route.params.contactid,
            IsLoading: false,
            ErrorMessage: null,
            contact: {},
            Products: [],
        }
    },
    created: async function () {
        try {
            this.IsLoading = true;

            let response = await ContactsService.getContact(this.ContactId);
            this.contact = response.data;

            let productResponse = await ContactsService.getProducts();
            this.Products = productResponse.data;

            this.IsLoading = false;
        }
        catch (error) {
            this.ErrorMessage = error;
            this.IsLoading = false;
        }

    },
    methods: {
        submitUpdate: async function () {
            console.log("Id is "+ this.ContactId) ; 
            this.contact.phone = String(this.contact.phone);               
            this.contact.country=String(this.contact.country);

            try {
                this.IsLoading = true;
                let response = await ContactsService.updateContact(this.contact, this.ContactId);
                this.IsLoading = false;
                if(response)
                    {
                        return this.$router.push('/');
                    }else{
                        this.ErrorMessage = response;
                        return this.$router.push(`/contact/edit/${this.ContactId}`);

                    }

                
            }
            catch (error) {
                this.ErrorMessage = error;
                this.IsLoading = false;
            }
        },
        onReset: function(){
            this.contact={};
            this.Products=[];
            this.ContactId=null;
            return this.$router.push('/');
        }
    }
}
</script>
<style scoped>

</style>