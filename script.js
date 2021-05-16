window.onload = function(){
    var cart ={};
    var goods = {};
    function showDate(){
    var  str = '';
    var now = new Date();
    str = now.toLocaleTimeString();
    document.querySelector('.date').innerHTML = str;
    }
    showDate()
    setInterval(showDate, 1000);
    $.getJSON("https://spreadsheets.google.com/feeds/list/1Kz3odiTXIbWoEq7PR4GIhLeyeT0RdoNqL7FOcYH8IZg/od6/public/values?alt=json",
        function (data) {
            console.log(data);
            data = data['feed']['entry'];
            console.log(data);
            goods=arrayHelper(data);
            console.log(goods)
            showProduct(data);


        }
    );
    function showProduct(data){
        var out = ''
        console.log(data.length);
        for (var i = 0; i < data.length; i++){
             out += `<div class="card">`;
             out += `<h3 class="title">${data[i]['gsx$name']['$t']}</h3>`;
             out += `<img src="${data[i]['gsx$image']['$t']}"`;
             out += `<p class="price">Цена: ${data[i]['gsx$price']['$t']}</p>`;
             out += ` <button name="add_to_cart" data="${data[i]['gsx$article_2']['$t']}">Покупайте лошары,а то мои друзья из чечни придут морду вам набьют!!!</button>;`
             out += `</div>;`
        }
        document.querySelector('.product_field').innerHTML = out;
        // $('.product_field').html(out);
    }
    document.onclick = function(e){
     console.log(e.target.attributes.name.nodeValue,e.target.attributes.data.nodeValue);
    if(e.target.attributes.name.nodeValue == 'add_to_cart'){
        addToCart(e.target.attributes.data.nodeValue);
       }
    }
function addToCart(elem){
    if(cart[elem] !== undefined){
        cart[elem]++;
    }
    else{
        cart[elem]=1;
    }
    console.log(cart)
}
function arrayHelper(arr){
    var out ={}
    for(var i = 0; i < arr.length; i++){   
        var temp = {}
        temp['articul'] = arr[i]['gsx$article_2']['$t'];
        temp['name'] = arr[i]['gsx$name']['$t'];
        temp['count'] = arr[i]['gsx$count']['$t'];
        temp['price'] = arr[i]['gsx$price']['$t'];
        temp['image'] = arr[i]['gsx$image']['$t'];
        out[arr[i]['gsx$article_2']['$t']] = temp;
  }
  return out;
}
}
