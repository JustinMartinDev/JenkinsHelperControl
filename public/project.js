$(window).on("load", function () {
    $('.toggleClick').on("click", function (e) {
        let idToChange = $(this).attr("id");

        var action = $(this).attr("toggle-action");

        if(action==="show") {
            $('.table').find("[toggler-id='" + idToChange + "']").addClass("show left-border right-border");
            $(this).parent().addClass("top-border left-border right-border");
            $('.table').find("[toggler-id='" + idToChange + "']").last().addClass("bottom-border");

            $(this).attr("toggle-action", "hide");
        }
        else if(action === "hide"){
            $('.table').find("[toggler-id='" + idToChange + "']").removeClass("show");
            $(this).parent().removeClass("left-border top-border right-border");
            $(this).attr("toggle-action", "show");
        }
        else{
            alert(Error + " * " + action);
        }
    });
});
