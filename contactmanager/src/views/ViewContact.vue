<template>
    <div>
        <div class="row">
            <div class="col">
                <p class="h3 text-success fw-bold">Add Contacts </p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi numquam aperiam facilis, laborum
                    porro impedit fugiat debitis fugit deleniti consequuntur saepe omnis nisi qui molestiae beatae
                    suscipit, eius quas expedita!</p>
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

            <div class="row">
                <div class="col-md-4">
                    <img src="../../public/img/contactsimg/userimg.png" alt="conactimg.png" class="contact-img-lg" />
                </div>
                <div class="col-md-6">
                    <ul class="list-group ">
                        <li class="list-group-item ">Name: <span class="fw-bold"> {{this.contact.firstName}}</span></li>
                        <li class="list-group-item">Email: <span class="fw-bold"> {{this.contact.email}}</span></li>
                        <li class="list-group-item">Phone: <span class="fw-bold"> {{this.contact.phone}}</span></li>
                        <li class="list-group-item">Company: <span class="fw-bold"> {{this.contact.city}}</span></li>
                        <li class="list-group-item">Title: <span class="fw-bold"> {{this.contact.lastName}}</span></li>
                        <li class="list-group-item">Picture url: <span class="fw-bold"> {{this.contact.addressLine1}}</span></li>
                        <li class="list-group-item">Group: <span class="fw-bold"> {{this.contact.country}}</span></li>
                    </ul>

                </div>
            </div>
        </div>
        <div class="row">
            <div class="col mt-3 ">
                <router-link to="/" class="btn btn-primary btn-sm">
                    <i class="fa fa-arrow-alt-circle-left" aria-hidden="true"></i> Contacts</router-link>
            </div>

        </div>

    </div>
</template>
<script>
import { ContactsService } from '@/service/ContactsService'
import Spinner from '@/components/Spinner.vue'


export default {
    name: 'ViewContact',
    components:{
        Spinner,
    },
    data: function () {
        return {
            ContactId: this.$route.params.contactid,
            IsLoading: false,
            ErrorMessage: null,
            contact:{},
        }
    },
    created: async function () {
        try {                
            this.IsLoading = true;            
            let response = await ContactsService.getContact(this.ContactId);
            this.contact = response.data;
            this.IsLoading = false;

        }
        catch (error) {
            this.ErrorMessage = error;
            this.IsLoading = false;
        }

    },
    method:{
        isDone:function(){
            return Object.keys(this.contact).length > 0 && Object.keys(this.product).length > 0 ;
        }
    },

}
</script>
<style scoped>

</style>