const signupForm = document.querySelector('#signup-form');
let contactInfo = firebase.database().ref("user_details");
    // let name_user = document.querySelector("#name").value;
    // let email = document.querySelector("#email").value;
    // let password = document.querySelector("#password").value;
    // let dob = document.querySelector("#conform-password").value;
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  

  const emails = signupForm['email'].value;
  const passwords = signupForm['password'].value;
  const name_user = signupForm['name'].value;
  const dob = signupForm['date-of-birth'].value;
  const address = signupForm['address'].value;
  const gender =signupForm['size'].value;
  
  auth.createUserWithEmailAndPassword(emails, passwords).then(cred => {
    saveContactInfo(name_user, emails,passwords ,dob ,address ,gender);
    console.log(cred.user);
    
    // alert("you have registered");
    window.location.href = '#popup';
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("error: "+errorMessage);
  });
});

   
function saveContactInfo(name_user, emails, passwords , dob ,address ,gender) {
  let newContactInfo = contactInfo.push();

  newContactInfo.set({
    name: name_user,
    emails: emails,
    password: passwords,
    date_of_birth :dob,
    address :address,
    gender :gender
  });
}
