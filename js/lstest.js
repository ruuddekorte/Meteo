// The Solution – LocalStorage & JavaScript
// =======================================================
// I decided on a simple solution using JavaScript and the 
// LocalStorage API for storing the relevant information 
// within the end users browser. The app I added this too 
// uses jQuery, as does this tutorial.

// Before we use the LocalStorage API we first need to test 
// that it’s available. Following the principles of progressive 
// enhancements, this form should function without the need 
// for JavaScript or modern API’s. After getting inspiration 
//   (ahem) from the feature detection in Modenizr I used this 
// function, which will return a boolean for use in an if 
// statement later on.

// Open up your JavaScript file and add the following function.


function lsTest(){
  var test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch(e) {
    return false;
  }
}

// Here we’re trying to write and remove an item from LocalStorage. 
// The function will return true if the catch block is not entered. 
// Next we need to write a function to save the user’s details into 
// LocalStorage. Add the following function to your js file.

function saveUserDetails() {
  var user = {
    'first': $('#user_event_first_name').val(),
    'last': $('#user_event_last_name').val(),
    'email': $('#user_event_user_email').val()
  };
  
  localStorage.setItem('wceUser', JSON.stringify(user));
}

// The first few lines creates an object of the values the user entered 
// into the appropriate inputs before saving the object to LocalStorage. 
// As the object is a fairly simple one, I’ve used JSON.stringify to 
// convert the details to a string to allow easy conversion when 
// retrieving back from storage.

// Speaking of which we need another function to retrieve the users 
// details and placing them back into the form.

function fetchUserDetails() {
  var lsUser = localStorage.getItem('wceUser');
  var user = JSON.parse(lsUser);

  if (isRealValue(user)){
    $('#user_event_first_name').val(user.first);
    $('#user_event_last_name').val(user.last);
    $('#user_event_user_email').val(user.email);
  }
}

// Here we fetch the item from storage, using the same key, and parse 
// it back into a user object.  The if statement checks that the stored 
// values have successfully been converted back into an object (we’ll 
// get to that). If it has we then insert the retrieved values back into 
// the form. The following function is how we check that an object is 
// actually an object, not undefined, by returning true or false.

function isRealValue(obj){
  return obj && obj !== "null" && obj!== "undefined";
}

// Simples. Now it’s time to put it all together. Within your document 
// eady function add the following.

if(lsTest() === true){
  if (localStorage.getItem("wceUser") !== null){
    fetchUserDetails();
  }

  $("#submission-btn").hover(saveUserDetails);
}


