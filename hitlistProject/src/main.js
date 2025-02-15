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
  const promise = databases.createDocument(
    '67afcf0e000ab2f488e3',
    '67afcf2e0003c540a67c',
    ID.unique(),
    { "company-name": e.target.companyName.value,
      "date-added": e.target.dateAdded.value,
      "role": e.target.role.value,
      "location": e.target.location.value,
      "position-type": e.target.positionType.value,
      "source": e.target.source.value
     }
);
promise.then(function (response) {
  console.log(response);
}, function (error) {
  console.log(error);
});
form.reset()
}



// promise.then(function (response) {
//     console.log(response);
// }, function (error) {
//     console.log(error);
// });
