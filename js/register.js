var but = document.getElementsByClassName("buttn")
var flex1 = true;
var flex2 = true;
var su = ""
but[0].onclick = function() {
    var name = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    if (name == "") {
        alert("用户名不能为空");
        flex1 = false
    } else {
        flex1 = true
    }
    if (pass == "") {
        alert("用户密码不能为空");
        flex2 = false
    } else {
        flex2 = true
    }
    if (flex1 && flex2) {
        axios.post("http://localhost:3000/user", {
            username: name,
            password: pass

        }).then(res => {
            su = res.data.length
            if (su == 0) {
                alert("用户名已存在")
            } else {
                alert("注册成功")
                window.location.href = "lognIn.html"
            }
        })

    }
}