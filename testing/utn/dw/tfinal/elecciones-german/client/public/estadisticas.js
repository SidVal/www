function contar1() {
    
    $.ajax({
        url: "/api/votante/contar1" ,
        type: "GET",
        dataType: "json",
        success: function(data){
            const datos1 = data;
            $("#bar1").css("width", datos1 + "%").text(datos1 + " %");
        },
        error: function(jqXHR, status, error){
            console.log("Error" + error);
        }
        
        
    })
};
function contar2() {
    
    $.ajax({
        url: "/api/votante/contar2" ,
        type: "GET",
        dataType: "json",
        success: function(data){
            const datos2 = data;
            $("#bar2").css("width", datos2 + "%").text(datos2 + " %");
        },
        error: function(jqXHR, status, error){
            console.log("Error" + error);
        }
        
        
    })
};
function contar3() {
    
    $.ajax({
        url: "/api/votante/contar3?" ,
        type: "GET",
        dataType: "json",
        success: function(data){
            const datos3 = data;
            $("#bar3").css("width", datos3 + "%").text(datos3 + " %");
            
        },
        error: function(jqXHR, status, error){
            console.log("Error" + error);
        }
        
        
    })
};
function contar4() {
    
    $.ajax({
        url: "/api/votante/contar4?" ,
        type: "GET",
        dataType: "json",
        success: function(data){
            const datos4 = data;
            $("#bar4").css("width", datos4 + "%").text(datos4 + " %");
        },
        error: function(jqXHR, status, error){
            console.log("Error" + error);
        }
        
        
    })
};
