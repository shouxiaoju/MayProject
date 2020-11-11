axios.get("http://localhost:3000/cart", {}).then(res => {
    var str = ''
    for (let i in res.data) {
        str += `
                <li >
                    <input type="checkbox" class="ck">
                     <img src="${res.data[i].img}" alt="">
                     <h3>商品名:${res.data[i].nem}</h3>
                     </br>
                     <span class="perPrice">${res.data[i].jag}</span>
                     </br>
                     <span id='minus'>-</span><input type="text" value="${res.data[i].num}" class="num"><span id="pius">+</span>
                     </br>
                     <span>单个总价<span>
                     <span class="perTotalPrice">${res.data[i].jag*res.data[i].num}</span>
                     </br>
                    <span class="del" uid="${res.data[i].id}" > 删除x</span>
                    </br>
                </li>
           `;
    }

    var odiv = document.getElementById("cartList")
    odiv.innerHTML = str
    let checkAll = document.getElementById("checkAll");
    let cks = document.querySelectorAll(".ck");
    let perTotalPrice = document.querySelectorAll(".perTotalPrice");
    let num = document.querySelectorAll(".num");
    let list = document.querySelectorAll("li");

    console.log(list)
    let minus = document.querySelectorAll("#minus");
    let plus = document.querySelectorAll("#pius");
    let del = document.querySelectorAll(".del");
    let perPrice = document.querySelectorAll(".perPrice");
    checkAll.onclick = () => {
            //让所有单个复选框的选中状态和全选复选框的状态一致
            for (let i = 0; i < cks.length; i++) {
                cks[i].checked = checkAll.checked;
            }
            getTotalPrice()
        }
        //在点击单个复选框时，判断选中的数量和总数量是否相同
    for (let i = 0; i < cks.length; i++) {
        cks[i].onclick = () => {
            var count = 0; //计数
            for (let j = 0; j < cks.length; j++) {
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
        }
    }

    for (let i = 0; i < minus.length; i++) {
        //减
        minus[i].onclick = () => {
                num[i].value--;
                if (num[i].value < 1) {
                    num[i].value = 1;

                }

                updateData(i);

            }
            //加
        plus[i].onclick = () => {
                num[i].value++;
                updateData(i);
            }
            //改input
        num[i].onchange = () => {
            if (num[i].value < 1) {
                num[i].value = 1;
            }
            updateData(i);
        }

    }

    function updateData(i) {
        //改单个总价
        perTotalPrice[i].innerText = Number(num[i].value) * Number(perPrice[i].innerText);
        getTotalPrice()
    }

    function getTotalPrice() {
        let totalPrice = document.getElementById("totalPrice");
        let price = "总价:";
        for (let i = 0; i < cks.length; i++) {
            if (cks[i].checked) {
                price += +perTotalPrice[i].innerText + "元";
            }
        }
        totalPrice.innerText = price;
    }

    $(".del").click(function() {
        axios.delete(`http://localhost:3000/cart/${$(this).attr("uid")}`, location.reload())
    })

})