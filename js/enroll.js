function checkUid(formElement) {
    var re = /^[A-Za-z0-9]{3,10}$/;
    if (!re.test(formElement.value)) {
        $("#uidDiv").addClass("has-error");
        if (!document.getElementById("uidHelp")) {
            $("#uidDiv").append("<span id='uidHelp' class='help-block'>帳號格式錯誤！</span>");
        }
    } else {
        $("#uidDiv").removeClass("has-error");
        $("#uidDiv").addClass("has-success");
        if (document.getElementById("uidHelp")) {
            document.getElementById("uidHelp").remove();
        }
    }
}

function checkName(formElement) {
    if (formElement.value == "") {
        $("#nameDiv").addClass("has-error");
        if (!document.getElementById("nameHelp")) {
            $("#nameDiv").append("<span id='nameHelp' class='help-block'>請記得填寫你的姓名喔！</span>");
        }
    } else {
        $("#nameDiv").removeClass("has-error");
        $("#nameDiv").addClass("has-success");
        if (document.getElementById("nameHelp")) {
            document.getElementById("nameHelp").remove();
        }
    }
}

function checkPassword(formElement) {
    var re = /^[A-Za-z0-9]{3,10}$/;
    if (!re.test(formElement.value)) {
        $("#passwordDiv").addClass("has-error");
        if (!document.getElementById("passwordHelp")) {
            $("#passwordDiv").append("<span id='passwordHelp' class='help-block'>密碼格式錯誤！</span>");
        }
    } else {
        $("#passwordDiv").removeClass("has-error");
        $("#passwordDiv").addClass("has-success");
        if (document.getElementById("passwordHelp")) {
            document.getElementById("passwordHelp").remove();
        }
    }
}

function doubleCheck(formElement) {
    if (document.getElementById("checkHelp")) {
        document.getElementById("checkHelp").remove();
    }
    var password = document.getElementById("inputPassword").value;
    if (formElement.value == "") {
        $("#checkDiv").addClass("has-error");
        if (!document.getElementById("checkHelp")) {
            $("#checkDiv").append("<span id='checkHelp' class='help-block'>請重新填寫密碼喔！</span>");
        }
    } else if (formElement.value != password) {
        $("#checkDiv").addClass("has-error");
        if (!document.getElementById("checkHelp")) {
            $("#checkDiv").append("<span id='checkHelp' class='help-block'>跟上面的密碼不一樣喔！</span>");
        }
    } else {
        $("#checkDiv").removeClass("has-error");
        $("#checkDiv").addClass("has-success");
        if (document.getElementById("checkHelp")) {
            document.getElementById("checkHelp").remove();
        }
    }
}

function checkSelect(formElement) {
    if (document.getElementById("selectHelp")) {
        document.getElementById("selectHelp").remove();
    }
    if (formElement.value == "") {
        $("#selectDiv").addClass("has-error");
        $("#selectDiv").append("<span id='selectHelp' class='help-block'>請選擇居住地！</span>");
    } else {
        $("#selectDiv").removeClass("has-error");
        $("#selectDiv").addClass("has-success");
    }
}