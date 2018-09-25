$(function() {
    var path = location.pathname.split("/");
    if (path[path.length - 1] != "addmovie") {
        $.ajax({
            url: "/api/movie/" + path[path.length - 1],
            type: "GET",
            dataType: "json",
            success: function(resp) {
                $("[name='_id']").val(resp._id);
                $("[name='title']").val(resp.title);
                $("[name='genre']").val(resp.genre);
                $("[name='year']").val(resp.year);
                $("[name='country']").val(resp.country);
                $("[name='seasons']").val(resp.seasons);
                $("[name='summary']").val(resp.summary);
                $("[name='poster']").val(resp.poster);
                $("[name='posterFile']").val(resp.posterFile);
            }
        })
    }
});

function onFileselected(event) {
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        const fileName = event.target.files[0].name;

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = () => { // called once readAsDataURL is completed
            $("[name='poster']").val(reader.result);
            $("[name='posterFile']").val(fileName);
        };
    }
}