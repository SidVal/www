$(function () {
    service = {};
    service.getConductores = function () {
        return $.ajax({
            url: "http://ergast.com/api/f1/2018/driverStandings.json",
            method: "GET",
            type: "JSON"
        });
    }

    service.getConductores().then(function(result) {
        if (result.MRData != null) {
            var conductores = result.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            conductores.forEach(element => {
                $("tbody").append(
                    $("<tr/>").append(
                        $("<td/>").append(element.position)
                    ).append(
                        $("<td/>").append(element.Driver.givenName)
                    ).append(
                        $("<td/>").append(element.Driver.familyName)
                    ).append(
                        $("<td/>").append(element.Constructors[0].name)
                    ).append(
                        $("<td/>").append(element.points)
                    )
                )
            });
        }
    });
});