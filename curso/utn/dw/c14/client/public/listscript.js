var page = 0;
var pageCount = 0;
var itemsCount = 0;
var order = ''
var filter = '';

$(function() {
    page = parseInt($(".pagination li.active").text());
    pageCount = parseInt($("#pageCount").val());
    getsCount();
});

function pageCountChange() {
    pageCount = parseInt($("#pageCount").val());
    updateData();
};

function pageChange(value) {
    page += value;
    $("#page").text(page);
    updateData();
}

function gotoPage(value) {
    page = value;
    $("#page").text(page);
    updateData();
}

function getsCount() {
    $.ajax({
        url: "/api/movie/count?filter=" + filter,
        type: "GET",
        dataType: "json",
        success: function(resp) {
            itemsCount = parseInt(resp);
            $("#itemscount").text("total: " + itemsCount + " regs.");
            updateData();
        },
        error: function(jqXHR, status, error) {
            console.log("Error: " + error);
        }
    })
}


function updateData() {
    var skip = (page - 1) * pageCount;
    $.ajax({
        url: "/api/movie?skip=" + skip + "&limit=" + pageCount + "&order=" + order + "&filter=" + filter,
        type: "GET",
        dataType: "json",
        success: function(resp) {
            renderItems(resp)
        },
        error: function(jqXHR, status, error) {
            console.log("Error: " + error);
        }
    })
}

function renderItems(data) {
    $('.movieList').html("");
    data.forEach(element => {
        $('.movieList').append(
            $("<tr/>").append(
                $("<td/>").append(element.title)
            ).append(
                $("<td/>").append(element.genre)
            ).append(
                $("<td/>").append(element.year)
            ).append(
                $("<td/>").append(
                    $("<a/>").attr("href", "./detail/" + element._id).html("detalles")
                )
            )
        );
    });
    calcPages();
}

function calcPages() {
    $(".pagination").html("");
    var cantPages = parseInt(Math.ceil(itemsCount / pageCount));
    for (i = 0; i < cantPages; i++) {
        var itemPage = i + 1;
        $(".pagination").append(
            $("<li/>").attr("name", "page" + itemPage).attr("class", (page == itemPage) ? "active" : "").append(
                $("<a/>").attr("onclick", "gotoPage(" + itemPage + ");").text(itemPage)
            )
        );
    }

    $(".pagination").prepend(
        $("<li/>").append(
            $("<a/>")
            .attr("onclick", (page != 1 ? "pageChange(-1);" : ""))
            .html("&laquo;")
        ).addClass((page == 1 ? "disabled" : ""))
    );

    $(".pagination").append(
        $("<li/>").append(
            $("<a/>")
            .attr("onclick", (page != cantPages ? "pageChange(1);" : ""))
            .html("&raquo;")
        ).addClass((page == cantPages ? "disabled" : ""))
    );
}

function setOrder(value, elem) {
    $("thead tr").removeClass("reverse");
    $("th").removeClass("active");
    if (order == value) {
        order = "-" + value;
        $(elem).addClass("active");
        $("thead tr").addClass("reverse");
    } else if (order == "-" + value) {
        order = "none";
    } else if (order != value) {
        order = value;
        $(elem).addClass("active");
    }
    updateData();
}

function filterData() {
    filter = $("#filter").val();
    getsCount();
}