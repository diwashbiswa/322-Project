function StudentHomepage()
{
    var apiUrl = 'https://bee-myy-taa.herokuapp.com/api/';

    // Boxes of course data in HTML
    var box1 = document.getElementById("box1");
    var box2 = document.getElementById("box2");
    var box3 = document.getElementById("box3");

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
        var x = box1.firstElementChild;
        var xText = x.innerHTML;
        x = x.nextElementSibling;
        xText = x.innerHTML;
    }

    return {start: start};
}