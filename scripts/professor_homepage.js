function Professor_Homepage()
{
    var apiUrl = 'https://bee-myy-taa.herokuapp.com/api/';
    var profID = $(".profID");
    var profName = $(".page_title_profName");
    var logged_in_id = "2";

    var makeGetRequest = function(url, onSuccess, onFailure) 
    {
        $.ajax({
            type: 'GET',
            url: apiUrl + url,
            dataType: "json",
            success: onSuccess,
            error: onFailure
        });
    };

    var makePostRequest = function(url, data, onSuccess, onFailure) 
    {
        $.ajax({
            type: 'POST',
            url: apiUrl + url,
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success: onSuccess,
            error: onFailure
        });
    };

    var getProfessor = function()
    {
        var onSuccess = function(data) 
        {
            console.log("getProfessor: onSuccess");
            data.result.forEach(element => {
                if (element.Iid == logged_in_id)
                {
                    profID[0].innerText = element.Iid;
                    profName[0].innerText = element.Iname;
                }
            });
        };
        var onFailure = function() { 
            console.error('getProfessor - Failed'); 
        };
        profID[0].innerText = "";
        makeGetRequest("instructor", onSuccess, onFailure);
    }

    var start = function()
    {
        // grab professor info from backend
        getProfessor();
    };
    
    return {start: start};
}