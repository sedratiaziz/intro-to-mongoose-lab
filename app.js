const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const PromptSync = require("prompt-sync");

const customerSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Customer = mongoose.model("Customer", customerSchema);

async function connect() {
  await mongoose.connect(process.env.MONGODB_URI);

  await runQueries();

  await mongoose.disconnect();

  process.exit();
}

async function createCustomer(newName, newAge) {
  try {
    const newCustomer = {
      name: newName,
      age: newAge,
    };
    await Customer.create(newCustomer);
  } catch (error) {
    console.log(error);
  }
}

async function getAllCustomers() {
  const all = await Customer.find();
  console.log(all);
}

async function updateCustomer(newId, newName, newAge) {
  try {
    await Customer.findByIdAndUpdate(newId, { name: newName, age: newAge });
  } catch (error) {
    console.log(error);
  }
}

async function deleteCustomer(id) {
  try {
    await Customer.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
}

async function deleteAllCustomer() {
  await Customer.deleteMany();
}

async function quit() {
  console.log("Exiting...");
  await mongoose.connection.close();
}

const prompt = require("prompt-sync")();

async function runQueries() {
  let userChoice;
  do {
    console.log("\n\n***************  Welcome!  ***************\n\n");
    console.log("Choose an option to edit the DB \n");
    console.log(
      " 1. Create a customer \n 2. View all customers \n 3. Update a customer \n 4. Delete a customer \n 5. Delete ALL customer \n 6. quit \n\n"
    );

    userChoice = parseInt(prompt("Your Choice: "));

    switch (userChoice) {
      case 1:
        const name = prompt("Enter the NAME of the customer: ");
        const age = prompt("Enter the AGE of the customer: ");
        await createCustomer(name, age);
        break;
      case 2:
        console.log("List of current customers: ");
        await getAllCustomers();
        break;

      case 3:
        console.log("List current customers: ");
        await getAllCustomers();

        const userIdChoice = prompt("Enter id of a customer to update it");
        const custNewName = prompt("What's the customer's new name?");
        const custNewAge = prompt("What's the customer's new age?");

        updateCustomer(userIdChoice, custNewName, custNewAge);
        break;

      case 4:
        const custIdToDelete = prompt(
          "Enter the id of the customer to delete it: "
        );
        await deleteCustomer(custIdToDelete);
        break;

      case 5:
        console.log("**DANGER ZONE**");
        console.log(
          "You're attempting to delete ALL the customers, do you want to proceed?"
        );
        const userYesNoChoice = prompt("Y / N \n");
        if (userYesNoChoice === "Y" || userYesNoChoice === "y") {
          await deleteAllCustomer();
        } else {
          await quit();
        }

        break;
      case 6:
        await quit();
        break;

      default:
        console.log("Please enter a valid choice (A number from 1-5)");
    }
  } while (userChoice != 6);
}

connect();
