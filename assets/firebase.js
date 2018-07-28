var config = {
    apiKey: "AIzaSyCGyHFwsf3RxrQ8r_HkS5g_0G0LxZa5MxA",
    authDomain: "crimejam-ed537.firebaseapp.com",
    databaseURL: "https://crimejam-ed537.firebaseio.com",
    projectId: "crimejam-ed537",
    storageBucket: "crimejam-ed537.appspot.com",
    messagingSenderId: "526043922582"
  };
  firebase.initializeApp(config);

   var database = firebase.database();

   $("#submit").on("click", function(event){ 
   event.preventDefault();
   
   var name = $("#exampleInputName").val().trim();
   var email = $("#exampleInputEmail1").val().trim();

   database.ref().push({
    name: name,
    email: email,
   });
  });