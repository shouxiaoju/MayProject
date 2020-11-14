"use strict";

axios.get("http://localhost:3000/cart", {}).then(function (res) {
  var str = '';

  for (var i in res.data) {
    var id1 = res.data[i].id;
    str += "\n                <li>\n                    <input type=\"checkbox\" class=\"ck\">\n                    <img src=\"".concat(res.data[i].img, "\" alt=\"\">\n                    <h3>\u5546\u54C1\u540D:").concat(res.data[i].nem, "</h3>\n                    <span>\u5355\u4EF7</span>\n                    <span class=\"perPrice\">").concat(res.data[i].jag, "</span>\n                    </br>\n                    <span id='minus'>-</span><input type=\"text\" value=\"").concat(res.data[i].num, "\" class=\"num\"><span id=\"pius\">+</span>\n                    </br>\n                    <span>\u5355\u4E2A\u603B\u4EF7<span>\n                    <span class=\"perTotalPrice\">").concat(res.data[i].jag * res.data[i].num, "</span>\n                    </br>\n                    <span class=\"del\" uid=\"").concat(res.data[i].id, "\" > \u5220\u9664x</span>\n                    </br>\n                </li>\n           ");
  }

  var odiv = document.getElementById("cartList");
  odiv.innerHTML = str;
  var checkAll = document.getElementById("checkAll");
  var cks = document.querySelectorAll(".ck");
  var perTotalPrice = document.querySelectorAll(".perTotalPrice");
  var num = document.querySelectorAll(".num");
  var list = document.querySelectorAll("li");
  console.log(list);
  var minus = document.querySelectorAll("#minus");
  var plus = document.querySelectorAll("#pius");
  var del = document.querySelectorAll(".del");
  var perPrice = document.querySelectorAll(".perPrice");

  checkAll.onclick = function () {
    //让所有单个复选框的选中状态和全选复选框的状态一致
    for (var _i = 0; _i < cks.length; _i++) {
      cks[_i].checked = checkAll.checked;
    }

    getTotalPrice();
  }; //在点击单个复选框时，判断选中的数量和总数量是否相同


  for (var _i2 = 0; _i2 < cks.length; _i2++) {
    cks[_i2].onclick = function () {
      var count = 0; //计数

      for (var j = 0; j < cks.length; j++) {
        if (cks[j].checked) {
          count++;
        }
      }

      if (count == cks.length) {
        checkAll.checked = true;
      } else {
        checkAll.checked = false;
      }

      getTotalPrice(); //改变总价
    };
  }

  var _loop = function _loop(_i3) {
    //减
    minus[_i3].onclick = function () {
      num[_i3].value--;

      if (num[_i3].value < 1) {
        num[_i3].value = 1;
      }

      axios.patch("http://localhost:3000/cart/".concat(id1), {
        num: num[_i3].value
      });
      updateData(_i3);
      console.log(id1);
    }; //加


    plus[_i3].onclick = function () {
      num[_i3].value++;
      updateData(_i3);
      axios.patch("http://localhost:3000/cart/".concat(id1), {
        num: num[_i3].value
      });
    }; //改input


    num[_i3].onchange = function () {
      if (num[_i3].value < 1) {
        num[_i3].value = 1;
      }

      updateData(_i3);
    };
  };

  for (var _i3 = 0; _i3 < minus.length; _i3++) {
    _loop(_i3);
  }

  function updateData(i) {
    //改单个总价
    perTotalPrice[i].innerText = Number(num[i].value) * Number(perPrice[i].innerText);
    getTotalPrice();
  }

  function getTotalPrice() {
    var totalPrice = document.getElementById("totalPrice");
    var price = 0;

    for (var _i4 = 0; _i4 < cks.length; _i4++) {
      if (cks[_i4].checked) {
        price += +perTotalPrice[_i4].innerText;
      }
    }

    totalPrice.innerText = price;
  }

  $(".del").click(function () {
    $(this).parents("li").remove();
    axios["delete"]("http://localhost:3000/cart/".concat($(this).attr("uid")), {}).then(function (arr) {
      getTotalPrice();
    });
  });
});