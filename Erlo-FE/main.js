function sendRegisterRequest() {
  let user = {
      username: $("#username").val(),
      email: $("#email").val(),
      password: $("#password").val()
  }
  $.ajax({
      type: "POST",
      url: "http://localhost:8085/save",
      contentType : 'application/json; charset=utf-8',
      dataType: "text",
      data: JSON.stringify(user),
      async: true,
      success: function(response) {
        if(response == "registered") {
        window.location.href = 'http://127.0.0.1:5500/succesfull-registration.html';
        }
        if(response == "Invalid info") {
          $("#info-error").show();
        }
        if(response == "Email already taken") {
          $("#email-error").show();
        }
      },
      error: function() {
        $("#info-error").show();
      }
    
  })
}

function sendLoginRequest() {

  let user = {
    email: $("#email").val(),
    password: $("#password").val(),
  };
  $.ajax({
    type: "POST",
    url: "http://localhost:8085/login",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(user),
    success: function (response) {
      window.location.href = 'http://127.0.0.1:5500/profile.html';
      localStorage.setItem("token", response.token);
    },
    error: function () {
      $("#info-error").show();
    },
  });
}
function getInfo() {
  $.ajax({
    type: "GET",
    url: "http://localhost:8085/info",
    headers: {"Authorization": 'Bearer ' + localStorage.getItem('token')},
    dataType: "json",
    success: function (response) {
      $("#username").val(response.username);
      $("#email").val(response.email);
      $("#profile").text(response.username);
      response.course.forEach(course => {
        if(course == "COURSE_MATH") {
          var element = document.createElement("img");
          element.setAttribute("src", "img/icons8-math-book-100.png");
          element.setAttribute("width", "35");
          element.setAttribute("title", "Math");
          document.getElementById('courses').appendChild(element);
        }
        if(course == "COURSE_HISTORY") {
          var element = document.createElement("img");
          element.setAttribute("src", "img/icons8-history-book-100.png");
          element.setAttribute("width", "35");
          element.setAttribute("title", "History");
          document.getElementById('courses').appendChild(element);
        }
        if(course == "COURSE_CHEMISTRY") {
          var element = document.createElement("img");
          element.setAttribute("src", "img/icons8-chemistry-book-100.png");
          element.setAttribute("width", "35");
          element.setAttribute("title", "Chemistry");
          document.getElementById('courses').appendChild(element);
        }
        if(course == "COURSE_BIOLOGY") {
          var element = document.createElement("img");
          element.setAttribute("src", "img/icons8-biology-book-100.png");
          element.setAttribute("width", "35");
          element.setAttribute("title", "Biology");
          document.getElementById('courses').appendChild(element);
        }
      })
    },
    error: function () {
      alert("error");
    },
  });
}

function enrollForCourse() {

  $.ajax({
    type: "POST",
    url: "http://localhost:8085/enroll",
    headers: {"Authorization": 'Bearer ' + localStorage.getItem('token')},
    dataType: "text",
    contentType: "text/plain",
    data: $("#courses").val(),
    success: function (response) {
      if(response == "ok") {
        $("#course-error").hide();
        alert("You have enrolled for course " + $("#courses").val().toLowerCase().slice(7));
      }
      if(response == "error") {
      $("#course-error").show();
      }
    },
    error: function () {
      alert("ne");
    },
  });
}

function checkForAuth() {

  $.ajax({
    type: "GET",
    url: "http://localhost:8085/checkForAuth",
    headers: {"Authorization": 'Bearer ' + localStorage.getItem('token')},
    dataType: "text",
    data: $("#courses").val(),
    success: function (response) {
      if(response == "ok") {
        window.location.href = 'http://127.0.0.1:5500/enroll.html';
      }
    },
    error: function () {
      window.location.href = 'http://127.0.0.1:5500/login.html';
    },
  });
}

function checkIfUserIsLogged() {
  if(localStorage.getItem('token') != null) {
  $.ajax({
    type: "GET",
    url: "http://localhost:8085/info",
    headers: {"Authorization": 'Bearer ' + localStorage.getItem('token')},
    dataType: "json",
    success: function (response) {
      if(response != null) {
        $("#profile").text(response.username);
        $("#register").hide();
        $("#login").hide();
        $("#profile").show();
        $("#logout").show();
      }
    },
    error: function () {
    },
  });
}
}

function logout() {
  localStorage.clear();
  window.location.href = 'http://127.0.0.1:5500/login.html';
}

function verify() {
  var code = window.location.href.slice(48);
  $.ajax({
    type: "POST",
    url: "http://localhost:8085/verify",
    dataType: "text",
    contentType: "text/plain",
    data: code,
    success: function (response) {
      if(response == "ok") {
        window.location.href = 'http://127.0.0.1:5500/account-verified.html';
      }
    },
    error: function () {
      window.location.href = 'http://127.0.0.1:5500/login.html';
    },
  });
}