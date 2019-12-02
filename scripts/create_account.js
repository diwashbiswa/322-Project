function BeMyTA () {

    // PRIVATE VARIABLES

    var apiUrl = 'https://bee-myy-taa.herokuapp.com/';


    var add_student; // add_professor form, value set in the "start" method below


    // PRIVATE METHODS
      
//    /*
//     * HTTP GET request 
//     * @param  {string}   url       URL path, e.g. "/api/allprofs"
//     * @param  {function} onSuccess   callback method to execute upon request success (200 status)
//     * @param  {function} onFailure   callback method to execute upon request failure (non-200 status)
//     * @return {None}
//     */
//    var makeGetRequest = function(url, onSuccess, onFailure) {
//        $.ajax({
//            type: 'GET',
//            url: apiUrl + url,
//            dataType: "json",
//            success: onSuccess,
//            error: onFailure
//        });
//    };

    /**
     * HTTP POST request
     * @param  {string}   url       URL path, e.g. "/api/allprofs"
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
     * Add event handlers for submitting the create review form.
     * @return {None}
     */
    var attachStudentHandler = function(e) {   
        // FINISH ME (Task 6): add a handler for the 'Cancel' button to cancel the review and go back to "FIND YOUR PROFESSOR" (#list) tab
        // add_student.on('click', '.cancel_button', function (e) {
        //     //activate and show the #list tab
        //     $('.nav a[href="#login"]').tab('show');
        // });
        
        // add a handler to the 'Add Professor' (.submit_prof_input) button to
        // create a new professor

        // The handler for the Post button in the form
        add_student.on('click', '.create_account_button', function (e) {
            //e.preventDefault (); // Tell the browser to skip its default click action

            var std = {}; // Prepare the student object to send to the server

            std.name = add_student.find('.name_input').val();
            std.wsu_id = add_student.find('.id_input').val();
            std.email = add_student.find('.email_input').val();
            std.password = add_student.find('.password_input').val();

            var onSuccess = function(data) {
                // FINISH ME (Task 6): activate and show the #list tab
                // $('.nav a[href="#student_homepage"]').tab('show');
                var student = data.std;

                Console.log('Inside onSuccess funciton for creating student account!');
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
     * Start the app by displaying the list of the professors and attaching event handlers.
     * @return {None}
     */
    var start = function() {

        //add_student = $(".student_info_inputs form#addStudentForm");
        add_student = $("form#addStudentForm");
        attachStudentHandler();

    };
    

    // PUBLIC METHODS
    // any private methods returned in the hash are accessible via RateProfessor.key_name, e.g. RateProfessor.start()
    return {
        start: start
    };
    
};
