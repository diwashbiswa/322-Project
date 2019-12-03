function StudentHomepage()
{
    var apiUrl = 'https://bee-myy-taa.herokuapp.com/api/';

    // Boxes of course data in HTML
    var box1 = document.getElementById("box1");
    var courseList = $(".courseList");

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

    // reads courses from backend to UI
    var displayCourses = function()
    {
        // delete everything from coursebox
        courseList.html('');

        var onSuccess = function(data)
        {
            data.course_list.forEach(element =>
                {
                    insertCourse(element, true);
                });
        };

        var onFailure = function()
        {
            alert('displayCourses - Failed');
            console.error('displayCourses - Failed');
        };

        console.log("displayCourses: making GET request");
        makeGetRequest("/courses", onSuccess, onFailure);
    };

    // adds course to UI, beginning is bool to prepend
    var insertCourse = function(course, beginning)
    {
        var newElem = $(box1);

    }

    var start = function()
    {
        displayCourses();
    }

    return {start: start};
}