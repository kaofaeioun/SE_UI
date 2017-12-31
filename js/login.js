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
                    sessionStorage.setItem('uid', getUser[0][0]);
                    sessionStorage.setItem('user', getUser[0][1]);
                    sessionStorage.setItem('area', getUser[0][4]);
                    sessionStorage.setItem('role', getUser[0][5]);
                    $('#close').trigger("click");
                    if (sessionStorage.role === "0") { //一般使用者
                        document.getElementById("enrollLink").remove();
                        document.getElementById("loginLink").remove();
                        $("#navbarTool").append('<li><h3 class="welcomeUser"><span class="label label-info">' + sessionStorage.user + '</span></a></li>');
                        $("#navbarTool").append('<li><a href="dashboard.html" >個人頁面</a></li>');
                        $("#navbarTool").append('<li><a href="javascript:window.location.reload()" onclick="logout();" id="logoutLink">登出</a></li>');
                    } else { //管理者
                        location.assign("index.manage.html");
                    }
                }
            });
    });
    if (sessionStorage.role === "0") { //一般使用者
        document.getElementById("enrollLink").remove();
        document.getElementById("loginLink").remove();
        $("#navbarTool").append('<li><h3 class="welcomeUser"><span class="label label-info">' + sessionStorage.user + '</span></a></li>');
        $("#navbarTool").append('<li><a href="dashboard.html?uid=' + sessionStorage.uid + '" >個人頁面</a></li>');
        $("#navbarTool").append('<li><a href="index.html" onclick="logout();" id="logoutLink">登出</a></li>');
        $("#track").append('<button type="button" class="btn btn-default btn-lg" id="trackBtn"><span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>追蹤</button>');
        $("#reportform").append('<div class="form-report"><div class="form-group"><label for="text" class="control-label"></label><input type="text" class="form-control" placeholder="請填寫價錢" id="report_price"></div><div class="modal-footer"><button type="button" class="btn btn-primary" form="loginform" id="report_btn">回報</button></div></div>');
    } else if (sessionStorage.role === "1") { //管理者
        document.getElementById("enrollLink").remove();
        document.getElementById("loginLink").remove();
        $("#navbarTool").append('<li><h3 class="welcomeManager"><span class="label label-primary">' + sessionStorage.user + '</span></h3></li>');
        $("#navbarTool").append('<li><a href="index.html" onclick="logout()" id="logoutLink">登出</a></li>');
    } else {}
});

function logout() {
    sessionStorage.clear();
}