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

    function getTrackData(getdata) {
        var Today = new Date();
        var day = Today.getDate();
        var sourceurl = "http://140.115.87.204:8000/Demo/get_follow/";
        var xhr = new XMLHttpRequest();
        var senddata = "uid=" + sessionStorage.uid + "&today=" + day;;
        xhr.open("POST", sourceurl);
        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(senddata);
        xhr.onreadystatechange = function() { //Call a function when the state changes.
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                getdata = JSON.parse(xhr.responseText);

                function getData() {
                    var data = [];
                    for (var i = 0; i < getdata.result.length; i++) {
                        data.push({
                            id: getdata.result[i][0],
                            name: getdata.result[i][1],
                            area: getdata.result[i][2],
                            t_p: getdata.result[i][3],
                            m_p: getdata.result[i][4],
                            l_p: getdata.result[i][5],
                            avg_p: getdata.result[i][6],
                            link: "<a class='btn btn-primary btn-xs' href='vegetable.html?vid=" + getdata.result[i][0] + "&aid=" + getdata.result[i][7] + "' role='button'>比價去</a>",
                            unfollow: "<a class='btn btn-danger btn-xs' href='vegetable.html?vid=" + getdata.result[i][0] + "&aid=" + getdata.result[i][7] + "' role='button'>取消追蹤</a>"
                        });
                    }
                    return data;
                }
                $('#vegetable_table').bootstrapTable({
                    columns: [ //欄位設定
                        {
                            field: 'id',
                            title: '作物代號',
                            align: 'center',
                            width: 80,
                            visible: true,
                            sortable: true
                        }, {
                            field: 'name',
                            title: '作物名稱',
                            align: 'center',
                            width: 240,
                            visible: true,
                            sortable: true
                        }, {
                            field: 'area',
                            title: '市場',
                            align: 'center',
                            width: 120,
                            visible: true,
                            sortable: true
                        }, {
                            field: 't_p',
                            title: '上價',
                            align: 'center',
                            width: 80,
                            visible: true,
                            sortable: true
                        }, {
                            field: 'm_p',
                            title: '中價',
                            align: 'center',
                            width: 80,
                            visible: true,
                            sortable: true
                        }, {
                            field: 'l_p',
                            title: '下價',
                            align: 'center',
                            width: 80,
                            visible: true,
                            sortable: true
                        }, {
                            field: 'avg_p',
                            title: '平均價',
                            align: 'center',
                            width: 80,
                            visible: true,
                            sortable: true
                        }, {
                            field: 'link',
                            title: '作物頁面',
                            align: 'center',
                            width: 100,
                            visible: true

                        }, {
                            field: 'unfollow',
                            title: '管理',
                            align: 'center',
                            width: 100,
                            visible: true

                        }
                    ],
                    classes: 'table',
                    data: getData(), //所有資料
                    sortName: 'id', //依照那個欄位排序
                    height: 737,
                    pagination: true, //使否要分頁

                    //可於ToolBar上顯示的按鈕
                    showColumns: true,
                    search: true, //查詢
                    onPageChange: function(currentPage, pageSize) {},
                    pageSize: 15, //一頁顯示幾筆
                    pageList: [15, 20, 50, 100], //一頁顯示幾筆的選項

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
    }
    getTrackData();

});