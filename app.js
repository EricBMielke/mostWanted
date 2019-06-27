/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    // TODO: search by name
    
    var foundPerson = searchByName(people);
    break;
    case 'no':
    // TODO: search by traits
    //search by age for loop//
    for (i = 0; i < data.length; i++) {
          var dob = data[i].dob
          console.log("date of birth: " + " " + dob);
          let currentYear = new Date().getFullYear();
          var age;
          age = Math.abs(new Date(dob).getFullYear() - currentYear);
          console.log(age);
          data[i].currentAge = age;
          // console.log(data[2].currentAge);
    }
    //search by age//
    // let unfoundPerson = searchByAge(data);
    let unfoundPerson = searchByTrait();
    //
    break;
    default:
    app(people); // restart app
    break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original 
  dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){ //make understand upper and lowercase letters (idiot proofing)
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  var foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      window.alert ("We found" + " " + person.firstName + " " + person.lastName);
      console.log(foundPerson);
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
//

function searchByAge(people){
  var personAge = promptFor("What is the person's age?", chars);
  personAge = parseInt(personAge);
  for (i = 0; i < data.length; i++){
    var foundPerson = people.filter(function(person){
    if(person.currentAge === personAge){
      window.alert ("We found" + " " + person.firstName);
      console.log(foundPerson);
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
  }
}
function searchByTrait(trait) {
  if (document.getElementById('age').checked == true) {
    searchByAge(data);
  }
  else if (document.getElementById('gender').checked == true) {
    searchByGender(data);
  }
  else if (document.getElementById('height').checked == true) {
    searchByHeight(data);
  }
  else if (document.getElementById('weight').checked == true) {
    searchByWeight(data);
  }
  else if (document.getElementById('eyeColor').checked == true) {
    searchByEyeColor(data);
  }
}

let foundPerson = [];
var newArray = [];
function searchByGender(people){
  var personGender = promptFor("What is the person's gender?", chars);
  // personAge = parseInt(personAge);
  for (i = 0; i < data.length; i++){

    foundPerson = people.map(function(person){
    if(person.gender === personGender){
      foundPerson.push(person.firstName + " " + person.lastName);
      console.log(foundPerson);
      newArray = foundPerson;

      // window.alert ("We found" + " " + foundPerson);
      // console.log(foundPerson);
      // return true;
      return newArray;
    }
    else{
      console.log("else");
      // return false;
    }

  })
  alert ("We found" + " " + newArray.join('\n'));
  // TODO: find the person using the name they entered
  console.log(foundPerson);

  return foundPerson;
  }
}