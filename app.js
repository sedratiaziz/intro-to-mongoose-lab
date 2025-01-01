const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const PromptSync = require("prompt-sync");


const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
})


const Customer = mongoose.model("Customer", customerSchema)



async function connect() {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("connected to the DB")

    await runQueries()

    await mongoose.disconnect()
    console.log("disconnected from the DB")

    process.exit()
}













  async function createCustomer(newName, newAge) {
    const newCustomer = {
        name: newName,
        age: newAge,
    }

    await Customer.create(newCustomer)    
  }


  async function getAllCustomers() {
    const all = await Customer.find()
    console.log(all)
  }


  async function updateCustomer(newName, newAge) {
    await Customer.findByIdAndUpdate("677526e5404668de3111aea9", {name: newName, age: newAge})
  }










// const prompt = require("prompt-sync")();

// console.log("\n\n***************  Welcome!  ***************\n\n")
// console.log("Choose an option to edit the DB \n")
// console.log(" 1. Create a customer \n 2. View all customers \n 3. Update a customer \n 4. Delete a customer \n 5. quit \n\n")

// const userChoice = prompt("Your Choice: ")
// console.log(`Your name is ${userChoice}`);






async function runQueries() {
    console.log("queries Running!")

    // await createCustomer("ahmed", 24)
    // await updateCustomer("aziz", 54)

await getAllCustomers()






}

connect()