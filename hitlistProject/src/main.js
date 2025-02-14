import './style.css'

import { Client, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67afce56002e9f87f347');

const databases = new Databases(client);

const form = document.querySelector('form')

form.addEventListener('submit', addJob)

function addJob(e){
  e.preventDefault()
}

const promise = databases.createDocument(
    '67afcf0e000ab2f488e3',
    '67afcf2e0003c540a67c',
    ID.unique(),
    { "company-name": "100Devs",
      "date-added": new Date(),
      "role": "software engineer",
      "location": "Philly",
      "position-type": "full time",
      "source": "https://100devs.org"
     }
);

promise.then(function (response) {
    console.log(response);
}, function (error) {
    console.log(error);
});
