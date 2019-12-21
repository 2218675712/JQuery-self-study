$(function () {
    // 1.   全选/全不选功能模块
    // 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了
    // 事件可以使用change
    $(".checkall").change(function () {
        $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
    });
    // 2. 如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选。
    $(".j-checkbox").change(function () {
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
    });
    // 3. 增减商品数量模块 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
    //加运算
    $(".increment").click(function () {
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        // 3. 计算小计模块 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
        var p = $(this).parent().parent().siblings(".p-price").text();
        //根据下标进行截取
        p = p.substr(1);
        //保留2位小数
        var price = (p * n).toFixed(2);
        //.parents()寻找多个上级,里面可以写元素
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + price);
        getSum();
    });
    //减运算
    $(".decrement").click(function () {
        var n = $(this).siblings(".itxt").val();
        //如果为1,那么不让往下减了
        if (n == 1) {
            return false
        }
        n--;
        $(this).siblings(".itxt").val(n);
        // 3. 计算小计模块 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
        var p = $(this).parent().parent().siblings(".p-price").text();
        //根据下标进行截取
        p = p.substr(1);
        //保留2位小数
        var price = (p * n).toFixed(2);
        //.parents()寻找多个上级,里面可以写元素
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + price);
        getSum();
    });
    $(".itxt").change(function () {
        //先得到文本框里面的值,再乘以单价
        var n = $(this).val();
        //当前商品的单价
        var p = $(this).parent().parent().siblings(".p-price").text();
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + price);
        getSum();
    });


    // 计算总计和总额模块
    getSum();

    function getSum() {
        var count = 0;  //计算总件数
        var money = 0;  //计算总价格
        $(".itxt").each(function (i, ele) {
            count += Number($(ele).val());
        });
        $(".amount-sum em").html(count);
        $(".p-sum").each(function (i, ele) {
            money += Number($(ele).text().substr(1));
        });
        $(".price-sum em").html("￥"+money.toFixed(2));
    }
})