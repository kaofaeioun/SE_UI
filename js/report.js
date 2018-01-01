$(document).ready(function() {
    function getUrlVars() { //接上一頁的get
        var vars = [],
            hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;

    }
    var urlVars = getUrlVars();
    $("#report_btn").click(function() {
        var sourceurl = "http://140.115.87.204:8000/Demo/report_vegetable_price/";
        var uid = sessionStorage.uid;
        var vid = urlVars.vid;
        var aid = sessionStorage.area;
        var price = document.getElementById('report_price').value;
        if (price <= 0) {
            alert("請輸入正整數喔！");
        } else if (price == "") {
            alert("請輸入價錢喔！");
        } else {
            var xhr = new XMLHttpRequest();
            var senddata = "uid=" + uid + "&vid=" + vid + "&aid=" + aid + "&price=" + price;
            xhr.open("POST", sourceurl);
            //Send the proper header information along with the request
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            console.log(senddata);
            xhr.send(senddata);
            xhr.onreadystatechange = function() { //Call a function when the state changes.
                if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                    getdata = JSON.parse(xhr.responseText);
                    console.log(getdata.result);
                    if (getdata.result == "success") {
                        alert("回報成功！");
                        window.location.reload();
                    } else if (getdata.result == "failed") {
                        alert("回報失敗！請重新填寫！");
                        window.location.reload();
                    }
                }
            }
        }

    });

});