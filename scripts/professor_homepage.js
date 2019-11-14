function Professor_Homepage()
{
    var apiUrl = 'http://127.0.0.1:5000/api/';
    

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

    var start = function()
    {
        var i = 0;
    };
    
    return {start: start};
}