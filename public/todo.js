
$("#list").on("click", "p" ,function(){
    var id = $(this).attr("id");
    $(this).toggleClass("completed");
    var isChecked=$(this).attr("class")==""?false:true;
    $.ajax({
        url:"/update",
        type:"post",
        contentType:"application/json",
        data : JSON.stringify({"id":id,"isChecked":isChecked})

    })

});

$("#list").on("click", "span" ,function(event){
    var val = $(this).parent()[0].id;
    $(this).parent().fadeOut(500,function(){
        $(this).remove();
    });
    event.stopPropagation();
    $.ajax({
        url:"/delete",
        type:"post",
        contentType:"application/json",
        data : JSON.stringify({id:val})
    })

});

$("input[type='text']").keypress(function(event){
    if(event.which==13)
        {
            /*var data1={
                test:'test1',
                test1:'test2'
            }
            var data = JSON.stringify(data1);
            console.log(data)
            var new_todo=$(this).val();
            $(this).val("");
            $.ajax({
                type:"post",
                url : "/newTodo",
                contentType: "application/json",
                data:data
            })*/
            var new_todo=$(this).val();
            $(this).val("");
            $.ajax({
                url:"/newTodo",
                type:"post",
                contentType: "application/json",
                data : JSON.stringify({name:new_todo})
            });
            $("#list").append("<p><span><i class='fa fa-trash'></i></span> " + new_todo + "</p>");
        }
});

$(".fa-plus").click(function(){
    $("input").fadeToggle();
})

$.ajax({
    url:"/data",
    type:"GET",
    dataType: "text",
success: function (data, status, xhr) {// success callback function
   // console.log(data);
    //alert(data);
    var data1=JSON.parse(data);
    for (const key in data1) {
        $("#list").append("<p id="+data1[key]._id+"><span><i class='fa fa-trash'></i></span> " + data1[key].name + "</p>");
        if(data1[key].isChecked)
        $("#"+data1[key]._id).toggleClass("completed");
    }

},
error: function (jqXhr, textStatus, errorMessage) {
    $('p').append('Error' + errorMessage);
    console.log("error");
    $("#list").append("<p id='123455'><span><i class='fa fa-trash'></i></span> Nitesh </p>");
}}
);