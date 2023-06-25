<h2>Important API Information</h2>

<h3>API Links</h3>
<a>https://mnmuslims-api.onrender.com/api/businesses</a>
<br/>
<a>https://mnmuslims-api.onrender.com/api/masjids</a>
<br/>
<a>https://mnmuslims-api.onrender.com/api/carousel</a>
<br/>
<a>https://mnmuslims-api.onrender.com/uploads</a>
<br/>
<a>https://mnmuslims-api.onrender.com/uploads2</a>
<br/>
<a>https://mnmuslims-api.onrender.com/uploads3</a>

<h3>Install Dependencies</h3>

```
npm install
```

<h3>Run Node API</h3>
First remember to cd into your directory and then write this command:

```
nodemon server.js
```

<h3>Hosting Service:</h3>
Currently the API is being hosted using onrender which is a free hosting service. Onrender is connected to my forked repo of the API and that is how it is currently being hosted but if you want to host it yourself or if you want to make some changes to the API then here I will discuss a few things you will need to know.

<h3>Deploy API</h3>
All of the steps for deployment can be found in this video: https://www.youtube.com/watch?v=bnCOyGaSe84&ab_channel=CodeBrah

<h3>Add any features:</h3>
If you want to add any new features which will involve the installation of a package then make sure that you dont have your node_modules folder in your .gitignore file. This is because when you deploy your changes Onrender will not recognise any new packages that you have added because the .gitingore file will make Onrender ignore everything within that file like the node_modules folder so make sure to commit/push your changes to onrender before putting the folder in .gitignore and only add the node_modules folder after you have completed your changes.

<h3>Upload excel data to MongoDB Atlas:</h3>
In order to put the masjid data from the excel sheet onto MongoDB Atlas I first converted the excel file into JSON data which can be done by using any converter online and then created a folder with the json file in the root directory of this API. Below is the code I used to send the JSON data to my MongoDB Collection.

<!-- <br /> -->
<br />

Please make sure to setup a MongoDB cluster before you execute this code. Here is an informative tutorial on how you can do this: https://www.youtube.com/watch?v=s0anSjEeua8&ab_channel=TheNetNinja

<br />

<h3>Code for JSON upload to MongoDB:</h3>

```
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

const excelData = fs.readFileSync('./Data/masjid.json');

const jsonData = JSON.parse(excelData);

const uri = 'mongodb+srv://noor:9ZNgRpjbdcUy7o3C@cluster0.ncrsngi.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

 const getMasjids = async (req, res) => {
     try {
     await client.connect();
     const database = client.db('test');
     const collection = database.collection('masjids');
     const result = await collection.insertMany(jsonData);
     console.log(`${result.insertedCount} documents inserted.`);
   } finally {
     await client.close();
   }
 }

 getMasjids().catch(console.error);
```