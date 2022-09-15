const express = require('express');
const {MongoClient} = require('mongodb')
const app= express();
const cors = require("cors");

app.use(cors());

const url = 'mongodb://localhost:27017';
const dbName ="my_db-test"
const client = new MongoClient(url)

const quickSort=(list) =>{
  if (list.length<2)
  return list;
  let pivot = list[0];
  let left = [];
  let right =[];

  for (let i=1, total = list.length; i < total; i++){
    if (list[i].quantity < pivot.quantity)
           left.push(list[i]);
    else right.push(list[i])
  } 
  return [...quickSort(left),pivot,...quickSort(right)];
}

async function main(quickSort){
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection('productCollection');
  const findResult = await collection.find({}).toArray();

  console.log("FOund documnet ==>",quickSort(findResult));

  app.post('/search', (req, res) => {    
      const result = quickSort(findResult )  
    res.send(result);
  }); 

   return "done";
}

app.listen(5000, () => { 
    console.log('Express is listening on port 5000!')
  })

main(quickSort)
.then(console.log)
.catch(console.error)
.finally(()=>client.close());

