const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        type:String,
        set:(v)=>
            v===""? "https://search.brave.com/images?q=villas+pics&context=W3sic3JjIjoiaHR0cHM6Ly9jZG4uY3JlYXRlLnZpc3RhLmNvbS9hcGkvbWVkaWEvc21hbGwvMjA3OTI0MTEwL3N0b2NrLXBob3RvLXZpbGxhcy1wb29sLXZpZXctc2t5IiwidGV4dCI6IlZpbGxhcyBieSB0aGUgcG9vbCB3aXRoIGEgdmlldyBvZiB0aGUgc2t5IC0gUGhvdG8sIEltYWdlIiwicGFnZV91cmwiOiJodHRwczovL2NyZWF0ZS52aXN0YS5jb20vcGhvdG9zL1ZpbGxhcy8ifV0%3D&sig=4314a7bba40431e00125cd70a4e49957d7a2d5b86318505793435477aada2c74&nonce=20a1ba4d4084afd4e3a8d75cc34eca17&source=imageCluster":v,
    },
    price:Number,
    location:String,
    country:String,

});

const Listing =mongoose.model("Listing",listingSchema);
modules.export=Listing;