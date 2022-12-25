import axios from "axios";

export class ContactsService{

    static baseUrl = `https://localhost/api/customer`;
    static baseUrlProducts = `https://localhost/api/product`;

    // https://localhost/api/Customer/GetAll?pagesize=4
    static getAllContacts(){
        let dataUrl = `${this.baseUrl}/getall?pagesize=20`
        return axios.get(dataUrl);
      }
      
      static getContact(userid){
        let dataUrl = `${this.baseUrl}/get/${userid}`;
        return axios.get(dataUrl);
      }

    static createContact(contact){
      let dataUrl = `${this.baseUrl}/create`;
      return axios.post(dataUrl, contact);
    }
    static updateContact(contact, contactid){
      let dataUrl = `${this.baseUrl}/update/${contactid}`;
      return axios.patch(dataUrl, contact);
    }
    static deleteContact(contactid){
      console.log("contact id is : " + contactid);
      
      let dataUrl = `${this.baseUrl}/delete/${contactid}`;
      return axios.delete(dataUrl);
    }
    static getProducts(){
      let dataUrl = `${this.baseUrlProducts}/getall`
        return axios.get(dataUrl);
    }

}