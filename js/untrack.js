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
    $("#untrackBtn").click(function() {
        var sourceurl = "http://140.115.87.204:8000/Demo/unfollow_vegetable/";
        console.log("取消追蹤");
        var uid = sessionStorage.uid;
        var vid = urlVars.vid;
        var aid = urlVars.aid;
        var xhr = new XMLHttpRequest();
        var senddata = "uid=" + uid + "&vid=" + vid + "&aid=" + aid;
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
                    alert("已經取消追蹤！");
                    window.location.reload();
                }
            }
        }
    });
});