var elText = $(".text");
var num = 0;
$("#btn").on("click", function (){
	elText.text(num++);
})
$.get("/api/getuserinfo", {"name": "donglegend"},function (data){
	console.log(data.name);
	elText.text( data.age )
}, "json")

$.post("/api/login", {"name": "dongsheng", "pwd": "123456"}, function (data){
	console.log(data);
})