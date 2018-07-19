$(window).on("load", function () {
    $('.toggleClick').on("click", function (e) {
        let idToChange = $(this).attr("id");

        var action = $(this).attr("toggle-action");

        if(action==="show") {
            $('.table').find("[toggler-id='" + idToChange + "']").addClass("show");
            $(this).attr("toggle-action", "hide");
        }
        else if(action === "hide"){
            $('.table').find("[toggler-id='" + idToChange + "']").removeClass("show");
            $(this).attr("toggle-action", "show");
        }
        else{
            alert(Error + " * " + action);
        }
    });
});
