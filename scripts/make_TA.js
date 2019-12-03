function Make_TA()
{
    var apiUrl = 'https://bee-myy-taa.herokuapp.com/api/';
    var profID = $(".profID");
    var profName = $(".page_title_profName");
    var retrievedProfInfo;  // set in getProfessor
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
            retrievedProfInfo = data.result;
            retrievedProfInfo.forEach(prof_backend => {
                if (prof_backend.Iid == logged_in_id)
                {
                    profID[0].innerText = prof_backend.Iid;
                    profName[0].innerText = prof_backend.Iname;
                }
            });
        };
        var onFailure = function() { 
            console.error('getProfessor - Failed'); 
        };
        profID[0].innerText = "";
        profName[0].innerText = "";
        makeGetRequest("instructor", onSuccess, onFailure);
    }


    var start = function()
    {
        // grab professor info from backend
        getProfessor();
    };
    
    return {start: start};
}