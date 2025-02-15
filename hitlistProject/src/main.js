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
  const job = databases.createDocument(
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
job.then(function (response) {
  //console.log(response);
  addJobsToDom()
}, function (error) {
  console.log(error);
});
form.reset()
}

async function addJobsToDom(){
  document.querySelector('ul').innerHTML = ""
  let response = await databases.listDocuments(
    '67afcf0e000ab2f488e3',
    '67afcf2e0003c540a67c',
  );
  //console.log(response.documents[1])

  response.documents.forEach((job)=>{
    const li = document.createElement('li')
    li.textContent = `${job['company-name']} ${job['date-added']} ${job['role']} ${job['location']} ${job['position-type']} ${job['source']} coffee chat? ${job['chat']} `

    li.id = job.$id

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Destroy'
    deleteBtn.onclick = () => removeJob(job.$id)
    li.appendChild(deleteBtn)

    const coffeeBtn = document.createElement('button')
    coffeeBtn.textContent = 'Coffee'
    coffeeBtn.onclick = () => updateChat(job.$id)

    li.appendChild(coffeeBtn)

    document.querySelector('ul').appendChild(li) 
  })

  async function removeJob(id){
    const result = await databases.deleteDocument(
      '67afcf0e000ab2f488e3',
      '67afcf2e0003c540a67c',
      id // documentId
  );
  document.getElementById(id).remove()
  }

  async function updateChat(id){
    const result = await databases.updateDocument(
      '67afcf0e000ab2f488e3',
      '67afcf2e0003c540a67c',
      id, // documentId
      {'chat': true} // data (optional)
      // permissions (optional)
  );
  result.then(function() {location.reload()})
  }
  // promise.then(function (response) {
//     console.log(response);
// }, function (error) {
//     console.log(error);
// });
}

addJobsToDom()

// promise.then(function (response) {
//     console.log(response);
// }, function (error) {
//     console.log(error);
// });
