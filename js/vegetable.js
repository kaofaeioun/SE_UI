$(document).ready(function() {
    $('#Loading').trigger("click");

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


    function getRawData(getdata) { //取得該作物資料
        var Today = new Date();
        var day = Today.getDate();
        var sourceurl = "http://140.115.87.204:8000/Demo/search/";
        var xhr = new XMLHttpRequest();
        var senddata = "vid=" + urlVars.vid + "&aid=" + urlVars.aid + "&today=" + day;
        xhr.open("POST", sourceurl);
        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(senddata);
        xhr.onreadystatechange = function() { //Call a function when the state changes.
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {

                getdata = JSON.parse(xhr.responseText);
                $("#title").append(getdata.result[0][1]);
                $("#titlename").append(getdata.result[0][1]);
                var img = document.getElementById("vegetable-img");
                if (getdata.result[0][2] == null) {
                    img.setAttribute("src", "http://140.115.87.204/vegetable/img/00000.jpg");
                } else {
                    img.setAttribute("src", getdata.result[0][2]);
                }
                $("#area").append(getdata.result[0][3]);
                $("#top_price").append("<h5><p>上價 " + getdata.result[0][4] + "元</p></h5>");
                $("#mid_price").append("<h5><p>中價 " + getdata.result[0][5] + "元</p></h5>");
                $("#low_price").append("<h5><p>下價 " + getdata.result[0][6] + "元</p></h5>");
                $("#avg_price").append("<h4><p>平均 " + getdata.result[0][7] + "元</p></h4>");
            }
        }
    }

    function getReportData(getdata) { //取得回報資料
        var sourceurl = "http://140.115.87.204:8000/Demo/get_reported_price/";
        var xhr = new XMLHttpRequest();
        getdata = new Object();
        var sendquery = "vid=" + urlVars.vid + "&aid=" + urlVars.aid;
        xhr.open("POST", sourceurl, true);
        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() { //Call a function when the state changes.
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                // Request finished. Do processing here.
                getdata = JSON.parse(xhr.responseText);

                function getData() {
                    var data = [];
                    for (var i = 0; i < getdata.result.length; i++) {
                        if (getdata.result[i][4] == 1) {
                            data.push({
                                report_time: getdata.result[i][0],
                                reporter: getdata.result[i][1],
                                area: getdata.result[i][2],
                                price: getdata.result[i][3],
                            });
                        }
                    }
                    return data;
                }
                $('#report_table').bootstrapTable({
                    columns: [ //欄位設定
                        {
                            field: 'report_time',
                            title: '回報時間',
                            align: 'center',
                            width: 80,
                            visible: true,
                            sortable: true
                        }, {
                            field: 'reporter',
                            title: '回報者',
                            align: 'center',
                            width: 80,
                            visible: true,
                            sortable: true
                        }, {
                            field: 'area',
                            title: '回報地區',
                            align: 'center',
                            width: 240,
                            visible: true,
                            sortable: true
                        }, {
                            field: 'price',
                            title: '回報價格',
                            align: 'center',
                            width: 120,
                            visible: true,
                            sortable: true
                        }
                    ],
                    classes: 'table',
                    data: getData(), //所有資料
                    sortName: 'report_time', //依照那個欄位排序
                    sortOrder: 'desc',
                    height: 350,
                    pagination: true, //使否要分頁

                    //可於ToolBar上顯示的按鈕
                    showColumns: true,
                    search: true, //查詢
                    onPageChange: function(currentPage, pageSize) {},
                    pageSize: 5, //一頁顯示幾筆
                    pageList: [5, 10, 25, 50], //一頁顯示幾筆的選項

                    formatRecordsPerPage: function(pageSize) {
                        return '&nbsp;&nbsp;每頁顯示' + pageSize + '筆';
                    },
                    formatShowingRows: function(fromIndex, toIndex, totalSize) {
                        //目前第幾頁
                        var currentPage = Math.ceil(fromIndex / this.pageSize);
                        //總共幾頁
                        var totalPageCount = Math.ceil(totalSize / this.pageSize);
                        return '第' + currentPage + '頁&nbsp;&nbsp;共' + totalPageCount + '頁';
                    }
                });
            }
        }
        xhr.send(sendquery);
    }

    var delay = function(s) {
        return new Promise(function(resolve, reject) {
            setTimeout(resolve, s);
        });
    };
    var urlVars = getUrlVars();
    delay().then(function() {
        return delay(250); // 延遲ㄧ秒
    }).then(function() {
        getRawData();
        return delay(250); // 延遲一秒
    }).then(function() {
        getReportData();
    });
});