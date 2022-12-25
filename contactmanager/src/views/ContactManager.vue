<template>
    <div>
        <div class="row">
            <div class="col">
                <p class="h4 fw-bold text-danger">Contacts Manager
                    <router-link to="/contact/add" class="btn btn-primary btn-sm ps-3 pe-3">
                        <i class="fa fa-plus-circle" aria-hidden="true"></i> New </router-link>
                </p>
                <p class="fst-italic">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis sunt consequuntur,
                    deleniti magnam facere repellendus eius praesentium dolore, sit nesciunt dolores totam aspernatur
                    iusto
                    impedit tempora! Modi cupiditate repellat eos.</p>
                <form>
                    <div class="row">
                        <div class="col-md-6">
                            <input type="input" placeholder="Search by name " class="form-control form-control-sm" />
                        </div>
                        <div class="col">
                            <input type="submit" class="btn btn-outline-dark btn-sm" value="Search" />
                        </div>
                    </div>

                </form>

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



        <div class="row mt-2 mb-5">
            <div class="col-md-6" v-for="cont in contacts" :key="cont.id">
                <div class="card my-2 list-group-item-success shadow-lg">
                    <div class="card-body m-1">
                        <div class="row align-items-center">
                            <div class="col-sm-4">
                              

                                <!-- <img :src="require('@/assets/contacts/usercontacticon-v4.png')"/> -->
                                 <!-- <img :src="require(`${cont.addressLine1}`)"/>  -->
                                 <!-- <img :src="getImgUrl(cont.addressLine1)" />                   -->

                                <!-- <img :src="String(cont.addressLine1)" alt="no-img" class="contact-img" />  -->
                                <!-- <img :src="require(`@/assets/img/${project.img}`)"> -->
                                <img :src="require(`@/assets/contactsimg/${cont.addressLine1}`)" class="contact-img"/>
                            </div>
                            <div class="col-sm-7">
                                <ul class="list-group">
                                    <li class="list-group-item">Name:<span class="fw-bold ms-2">{{ cont.firstName
                                    }}</span></li>
                                    <li class="list-group-item">Email:<span class="fw-bold ms-2"> {{ cont.email
                                    }}</span>
                                    </li>
                                    <li class="list-group-item">Phone:<span class="fw-bold ms-2"> {{ cont.phone
                                    }}</span>
                                    </li>

                                </ul>
                            </div>
                            <div class="col-sm-1 d-flex flex-column justify-content-center align-items-center ">
                                <router-link :to="`/contact/view/${cont.id}`" class="btn btn-warning mb-1">
                                    <i class="fa fa-eye" aria-hidden="true"></i> </router-link>

                                <router-link :to="`/contact/edit/${cont.id}`" class="btn btn-primary mb-1 ">
                                    <i class="fa fa-pencil" aria-hidden="true"></i> </router-link>

                                <button class="btn btn-danger" @click="DeleteContact(cont.id)">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                </button>

                            </div>


                        </div>

                    </div>

                </div>

            </div>
        </div>


    </div>

</template>
<script>


import { ContactsService } from '@/service/ContactsService'
import Spinner from '@/components/Spinner.vue'

export default {


    name: 'ContactManager',
    components: {
        Spinner,
    },
    data: function () {
        return {
            IsLoading: false,
            ErrorMessage: null,
            contacts: [],
            loadDelayTime: 10,
            publicPath: process.env.BASE_URL,
            

        }
    },
    created: async function () {
        try {

            this.IsLoading = true;
            await this.sleep(this.loadDelayTime);
            let response = await ContactsService.getAllContacts()
            this.contacts = response.data.items;
            this.IsLoading = false;

        }
        catch (error) {
            this.ErrorMessage = error;
            this.IsLoading = false;
        }
    },
    methods: {
        async sleep(milliseconds) {
            return new Promise((resolve) => setTimeout(resolve, milliseconds));
        },
        DeleteContact: async function (contactid) {
            console.log("function called.... ");
            try {
                this.IsLoading = true;
                let response = await ContactsService.deleteContact(contactid)
                if (response) {
                    let response = await ContactsService.getAllContacts()
                    this.contacts = response.data.items;
                }
                else{
                    this.ErrorMessage = response;
                }
                this.IsLoading = false;

            }
            catch (error) {
                this.ErrorMessage = error;
                this.IsLoading = false;
            }

        },
        getImgUrl(img) {
                
           // return require('@/assets/contacts/'  +img); 
           let a = '../../public/img/contactsimg/';
           return require( a+"'" +img);    
                //let pp ='http://127.0.0.1:8080/public/img/contactsimg/usercontacticon-v2.png';
               // return require(pic)
            }


    }

}
</script>
<style scoped>

</style>