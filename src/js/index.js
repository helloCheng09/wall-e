(function (wall) {
    /**
     * Limit Public
     * Bind wall
     */
    wall.extend({
        show: function () {
            console.log('hello world')
        },
        myName: "xiaoxoxo"
    })

    // 入口
    if (document.getElementById('wallE')) {
        // 登录
        login()

        // 首页
        fangfa()
    }

    /**
     * Functions
     * #1 login
     * #2 register
     */

    // login
    function login() {

    }

    // index

    function fangfa() {
        console.log(wall)
        wall.show()

        /**************************** */
        var loadingHtml = `
            <div id="ajaxloader3">
                <div class="outer"></div>
                <div class="inner"></div>
            </div>
        `
        // wall.loadingShow(loadingHtml)
        wall.alert();
        console.log(wall.myName)
        $.ajax({
            url: "http://localhost/mockDamai/mockdamai/public/index.php/damaiosadmin/User/adminlogin",
            type: "GET",
            dataType: "JSON",
            success: function (res) {
                console.log(res)
            }
        })

    }





})(window.wall || (window.wall = {}))