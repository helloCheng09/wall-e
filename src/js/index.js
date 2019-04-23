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
        <div id="facebook">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>
        `
        // wall.loadingShow(loadingHtml)
        console.log(wall.myName)
        $.ajax({
            url: "http://localhost/mockDamai/mockdamai/public/index.php/damaiosadmin/User/adminlogin",
            type: "GET",
            dataType: "JSON",
            success: function (res) {
                console.log(res)
            }
        })
        /***************************** */
        $('.mokuai').click(function () {
            // wall.alert('111', {
            //     // animationDuratsion: 200,
            //     // animationDurClose: 200,
            //     delay: 1000,
            //     // alertHtml: loadingHtml,
            //     // marskbg: "black",
            //     // bg: "transparent",
            //     loadingAni: 1
            // })

            var index = wall.load({
                loadstyle: 6,
                // bg: "transparent",
            })

            setTimeout(() => {
               wall.close(index)  
            }, 200000);
           





            return false;
        })
    }





})(window.wall || (window.wall = {}))