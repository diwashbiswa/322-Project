function BeMyTA () {

    // PRIVATE VARIABLES

    //var apiUrl = 'https://bee-myy-taa.herokuapp.com/';
    var apiUrl = 'http://localhost:5000'; //local

    var add_student; // add_student form, value set in the "start" method below

    var login; // login form

    //var logged_in_id = "2";

    // PRIVATE METHODS
      
   /*
    * HTTP GET request 
    * @param  {string}   url       URL path, e.g. "/api/allprofs"
    * @param  {function} onSuccess   callback method to execute upon request success (200 status)
    * @param  {function} onFailure   callback method to execute upon request failure (non-200 status)
    * @return {None}
    */
   var makeGetRequest = function(url, onSuccess, onFailure) {
       $.ajax({
           type: 'GET',
           url: apiUrl + url,
           dataType: "json",
           success: onSuccess,
           error: onFailure
       });
   };

    /**
     * HTTP POST request
     * @param  {string}   url       URL path, e.g. "/api/addStudent"
     * @param  {Object}   data      JSON data to send in request body
     * @param  {function} onSuccess   callback method to execute upon request success (200 status)
     * @param  {function} onFailure   callback method to execute upon request failure (non-200 status)
     * @return {None}
     */
    var makePostRequest = function(url, data, onSuccess, onFailure) {
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
    
    /**
     * Add event handlers for login page
     * @return {None}
     */
    var attachLoginHandler = function(e) {
        login.on('click', '.sign_in_button', function(e) {
            e.preventDefault();

            var username = login.find('.username_input').val();
            var password = login.find('.password_input').val();

            if (username == "test" && password == "test")
            {
                //navigate to account homepage
                window.location.href = "student_homepage.html";

                //function where it displays the student info in the student account page -- drew's function
            } else {
                console.log("Username/password don't match");
                alert("Incorrect username or password! Try again!");
            }
        })
    }
    

        //     var onSuccess = function(data) {

        //         data.result.forEach(element => {
        //             //navigate to the next page upon successful login -- to student/professor homepage
        //             if (element.email == username && element.password == password)
        //             {
        //                 //$('.nav a[href="#student_homepage"]').tab('show');
        //                 //window.location.pathname = "path/to/student_homepage.html/";
        //                 window.location.pathname = "http://www.google.com"

        //                 //function where it displays the student info in the student account page -- drew's function
        //             } else {
        //                 console.log("Username/password don't match");
        //                 alert("Incorrect username or password! Try again!");
        //             }
        //         });

        //     };
        //     var onFailure = function() { 
        //         //FINISH ME (Task 6): display an alert box to notify that the professor could not be created ; print the errror message in the console.
        //         console.error('Add new Student- Failed'); 
        //     };
            
        //     let requestURL = '/api/students';
        //     makeGetRequest(requestURL, onSuccess, onFailure);
        // })

    /**
     * Add event handlers for submitting the create review form.
     * @return {None}
     */
    var attachStudentHandler = function(e) {   
        // add_student.on('click', '.cancel_create_student_button', function (e) {
        //     $('.nav a[href="#login"]').tab('show');
        // });
        

        // The handler for the Post button in the form
        add_student.on('click', '.create_account_button', function (e) {
            e.preventDefault (); // Tell the browser to skip its default click action

            var std = {}; // Prepare the student object to send to the server

            std.name = add_student.find('.name_input').val();
            std.wsu_id = add_student.find('.id_input').val();
            std.email = add_student.find('.email_input').val();
            std.password = add_student.find('.password_input').val();

            var onSuccess = function(data) {
                //navigate to the next page upon successful creation of account -- to student homepage
                $('.nav a[href="#student_homepage"]').tab('show');

                Console.log('Inside onSuccess function for creating student account!');
            };
            var onFailure = function() { 
                //FINISH ME (Task 6): display an alert box to notify that the professor could not be created ; print the errror message in the console.
                console.error('Add new Student- Failed'); 
            };
            
            // FINISH ME (Task 6): make a POST request to add the professor
            let postRequestURL = '/api/addStudent';
            console.log(postRequestURL);
            console.log(std);
            makePostRequest(postRequestURL, std, onSuccess, onFailure);
        });

    };
    
    /**
     * Start of the app
     * @return {None}
     */
    var start = function() {

        //lets the user login
        login = $("form#loginForm");
        attachLoginHandler(); 


        //create student account
        add_student = $("form#addStudentForm");
        attachStudentHandler();

        //create professor account

    };
    

    // PUBLIC METHODS
    return {
        start: start
    };
    
};
