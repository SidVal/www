$(function() {
    var urlParam = location.pathname.split("/");
    $.ajax({
        url: "/api/movie/" + urlParam[urlParam.length - 1],
        type: "GET",
        dataType: "json",
        success: function(resp) {
            $("#btnedit").attr("href", "/editmovie/" + resp._id);
            $('#title').html(resp.title);
            $("#genre").html(resp.genre);
            $("#year").html(resp.year);
            $("#country").html(resp.country);
            $("#seasons").html(resp.seasons);
            $("#summary").html(resp.summary);
            $("#poster").attr({
                "src": resp.poster,
                "alt": resp.title
            });
            $("#posterFile").text(resp.imageFile);
        },
        error: function(jqXHR, status, error) {
            console.log("Error: " + error);
        }
    })
});

function deleteMovie() {
    $('#exampleModal').modal('hide').on("hidden.bs.modal", function() {
        var urlParam = location.pathname.split("/");
        $.ajax({
            url: "/api/movie/" + urlParam[urlParam.length - 1],
            type: "DELETE",
            dataType: "json",
            success: function(resp) {
                location.pathname = "/list";
            }
        });
    });
}