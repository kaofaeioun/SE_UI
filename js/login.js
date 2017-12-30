$(document).ready(function() {
    $("#login_btn").click(function() {
        var loginurl = "http://140.115.87.204:8000/Demo/WhoamI/";
        var username = document.getElementById('login-name').value;
        var password = document.getElementById('password').value;
        $.post(loginurl, {
                uid: username,
                psw: password
            },
            function(data, status) {
                console.log(data);
                var getUser = JSON.parse(data);
                console.log(getUser);
                if (data === "[]") {
                    alert("登入失敗，帳號密碼錯誤");
                } else {
                    sessionStorage.setItem('uid', getUser[0][0])
                    sessionStorage.setItem('user', getUser[0][1]);
                    sessionStorage.setItem('role', getUser[0][5]);
                    $('#close').trigger("click");
                    location.reload();
                }
            });
    });

    console.log(sessionStorage.user);
    if (sessionStorage.role === "0") {
        document.getElementById("enrollLink").remove();
        document.getElementById("loginLink").remove();
        $("#navbarTool").append('<li><h3 class="welcomeUser"><span class="label label-info">' + sessionStorage.user + '</span></a></li>');
        $("#navbarTool").append('<li><a href="dashboard.html?uid=' + sessionStorage.uid + '" >個人頁面</a></li>');
        $("#navbarTool").append('<li><a href="javascript:window.location.reload()" onclick="logout();" id="logoutLink">登出</a></li>');
    } else if (sessionStorage.role === "1") {
        document.getElementById("mainJavascript").remove();
        document.getElementById("enrollLink").remove();
        document.getElementById("loginLink").remove();
        $("#htmlHead").append('<script src="js/indexM.js"></script>')
        $("#navbarTool").append('<li><h3 class="welcomeManager"><span class="label label-primary">' + sessionStorage.user + '</span></h3></li>');
        $("#navbarTool").append('<li><a href="javascript:window.location.reload()" onclick="logout()" id="logoutLink">登出</a></li>');
    } else {}
});

function logout() {
    sessionStorage.clear();
}