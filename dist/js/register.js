"use strict";

var but = document.getElementsByClassName("buttn");
var flex1 = true;
var flex2 = true;
/* username.onchange = function() {
    if (username.value == "") {
        alert("用户名不能为空");
    }
}
password.onchange = function() {
    if (password.value == "") {
        alert("用户名不能为空");
    }
} */

/* but[0].onclick = function() {

} */

var su = "";

but[0].onclick = function () {
  var name = document.getElementById("username").value;
  var pass = document.getElementById("password").value;

  if (name == "") {
    alert("用户名不能为空");
    flex1 = false;
  } else {
    flex1 = true;
  }

  if (pass == "") {
    alert("用户密码不能为空");
    flex2 = false;
  } else {
    flex2 = true;
  }

  if (flex1 && flex2) {
    axios.post("http://localhost:3000/user", {
      /*  params: {
           username: name,
           password: pass
       } */
      username: name,
      password: pass
    }).then(function (res) {
      console.log(res.data);
      console.log(res.data.length);
      su = res.data.length;
      /*  if (su == 0) {
           alert("用户名或密码错误")
       } */
    });
  }
};