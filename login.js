function login() {
  var usermail = document.getElementById('email').value;
  var userpassword = document.getElementById('password').value;
  // alert(usermail +"" +userpassword)

  auth
    .signInWithEmailAndPassword(usermail, userpassword)
    .then(user => {
      // window.location.assign("index.html");
      console.log(usermail);
      window.location.href = 'index.html';
      alert('login');
      // alert("signin");
      // Signed in
      // ...
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert('error: ' + errorMessage);
    });
}
