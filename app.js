/*
Build all of your functions for displaying and gathering information below (GUI).
*/
//variables 
let foundGenderPerson = [];
var newGenderArray = [];
let foundHeightPerson = [];
var newHeightArray = [];
let foundWeightPerson = [];
var newWeightArray = [];
let foundEyePerson = [];
var newEyeArray = [];
//variables

var metricPeople = data.map(convertToMetric)
function convertToMetric(data) {
  data.weight = weight/2.54
  data.height =  height/39.37
}

console.log(metricPeople);

for (i = 0; i < data.length; i++) {
  var dob = data[i].dob
  // console.log("date of birth: " + " " + dob);
  let currentYear = new Date().getFullYear();
  var age;
  age = Math.abs(new Date(dob).getFullYear() - currentYear);
  // console.log(age);
  data[i].currentAge = age;
}
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
    var unfoundPerson = searchByTrait(people); //
    break;
    default:
    app(people); // restart app
    break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire 
  original dataset of people. We need people in order to find descendants 
  and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'spouse', 'siblings', 'parents', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
      displayPerson(person);
    break;
    case "spouse":
    // TODO: get person's family
      findSpouse(person, people);
    break;
    case "parents":
      findParents(person, people);
    break;
    case "siblings": 
      findSiblings(person, people);
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

      return true;
    }
    else{
      return false;
    }
  })
  displayPerson(foundPerson[0]);
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
  personInfo += "id: " + person.id + "\n";
  personInfo += "Age: " + person.currentAge + "\n";
  personInfo += "DOB: " + person.dob + "\n"; 
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  // TODO: finish getting the rest of the information to display
  console.log(personInfo);
  alert(personInfo);
  mainMenu(person, data);

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

function searchByTrait(people){
  var selectedTrait = promptFor("Which trait would you like to search by? (age, gender, height, weight, eye color)", chars);
  if (selectedTrait == "age"){
    searchByAge(data);
  }
  else if (selectedTrait == "gender"){
    searchByGender(data);
  }
  else if (selectedTrait == "height"){
    searchByHeight(data);
  }
  else if (selectedTrait == "weight"){
    searchByWeight(data);
  }
  else if (selectedTrait == "eye color"){
    searchByEyeColor(data);
  }
}


function searchByAge(people){
  var personAge = promptFor("What is the person's age?", chars);
  personAge = parseInt(personAge);
  for (i = 0; i < data.length; i++){
    var foundPerson = people.filter(function(person){
    if(person.currentAge === personAge){
      // window.alert ("We found" + " " + person.firstName + " " + person.lastName);
      document.getElementById('theResult').innerHTML = "We found" + " " + person.firstName + " " + person.lastName;
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

function searchByGender(people){
  var personGender = promptFor("What is the person's gender?", chars);
  // for (i = 0; i < data.length; i++){
    foundGenderPerson = people.map(function(person){
    if(person.gender === personGender){
      //foundGenderPerson.push(person.firstName + " " + person.lastName);
      return person;
      console.log(foundGenderPerson);
    }
    else{
      console.log(" ");
    }
  })
  alert(foundGenderPerson[0].firstName);/*So this syntax kind of works, but it is not 
  universally functional. Right now, it just lists Billy since he is at the 0th index.
  However, using i or leaving the brackets empty does not work because the positions that had a
  female populating them are undefined in the new array. No clue how to fix. */
  app(data);
  // TODO: find the person using the name they entered
   return foundGenderPerson;
}

function searchByHeight(people){
  var personHeight = promptFor("What is the person's height?", chars);
  personHeight = parseInt(personHeight);
  for (i = 0; i < data.length; i++){
    foundHeightPerson = people.filter(function(person){
    if(person.height === personHeight){
      foundHeightPerson.push(person.firstName + " " + person.lastName);
      console.log(foundHeightPerson);
      newHeightArray = foundHeightPerson;
      return newHeightArray;
    }
    else{
      console.log("else");
    }

  })
  // alert ("We found" + "\n" + newHeightArray.join('\n'));
  document.getElementById('theResult').innerHTML = newHeightArray;
  // TODO: find the person using the name they entered
  return foundHeightPerson;
  }
}

function searchByWeight(people){
  var personWeight = promptFor("What is the person's Weight?", chars);
  personWeight = parseInt(personWeight);
  for (i = 0; i < data.length; i++){
    foundWeightPerson = people.filter(function(person){
    if(person.weight === personWeight){
      foundWeightPerson.push(person.firstName + " " + person.lastName);
      console.log(foundWeightPerson);
      newWeightArray = foundWeightPerson;
      return newWeightArray;
    }
    else{
      console.log("else");
    }

  })
  // alert ("We found" + "\n" + newWeightArray.join('\n'));
  document.getElementById('theResult').innerHTML = newWeightArray;
  // TODO: find the person using the name they entered
  return foundWeightPerson;
  }
}

function searchByEyeColor(people){
  var personEye = promptFor("What is the person's eye color?", chars);
  for (i = 0; i < data.length; i++){
    foundEyePerson = people.map(function(person){
    if(person.eyeColor === personEye){
      foundEyePerson.push(person.firstName + " " + person.lastName);
      console.log(foundEyePerson);
      newEyeArray = foundEyePerson;
      return newEyeArray;
    }
    else{
      console.log("else");
    }

  })
  // alert ("We found" + "\n" + newEyeArray.join('\n'));
  document.getElementById('theResult').innerHTML = newEyeArray;
  // TODO: find the person using the name they entered
  return foundEyePerson;
  }
}

/*function fully works through start button/main menu navigation 
courtesy of Nevin */
function findSpouse(person, people){
  var foundPerson = people.filter(function(el){
    if(el.id == person.currentSpouse){
      alert("Spouse: " + el.firstName + " " + el.lastName);
      return true;
    }
    else{
      return false;
    }
})
  mainMenu(person, data);
}

function findParents(person, people){
  var foundPerson = people.filter(function(el){
    if(el.id == person.parents[0] || el.id==person.parents[1]){
      alert("Parents: " + el.firstName + " " + el.lastName);
      return true;
    }
    else{
      return false;
    }
})
  mainMenu(person, data);
}

function findSiblings(person, people){
  var foundPerson = people.filter(function(el){
    if(el.parents[0] == person.parents[0] || el.parents[1]==person.parents[1]){
      alert("Siblings: " + el.firstName + " " + el.lastName);
      return true;
    }
    else{
      return false;
    }
})
  mainMenu(person, data);
}