window.onload = function(){
    $.getJSON("https://spreadsheets.google.com/feeds/list/1Kz3odiTXIbWoEq7PR4GIhLeyeT0RdoNqL7FOcYH8IZg/od6/public/values?alt=json",
        function (data) {
            console.log(data);
            data = data['feed']['entry'];
            console.log(data);
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
             out += `</div>;`
        }
        document.querySelector('.product_field').innerHTML = out;
        // $('.product_field').html(out);
    }
}