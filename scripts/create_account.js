
function BeMyTA () {

    // PRIVATE VARIABLES
        
    // The backend we'll use for Part 2. For Part 3, you'll replace this 
    // with your backend.
    var apiUrl = 'http://localhost:5000';
    //var apiUrl = 'https://rateprofessor.herokuapp.com';

    var studentlist;
    var studentTempleteHtml;

    // PRIVATE METHODS
      
   /*
    * HTTP GET request 
    * @param  {string}   url       URL path, e.g. "/api/allprofs"
    * @param  {function} onSuccess   callback method to execute upon request success (200 status)
    * @param  {function} onFailure   callback method to execute upon request failure (non-200 status)
    * @return {None}
    */
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
    
// /**
//      * Insert student into studentlist container in UI
//      * @param  {Object}  student       professor JSON
//      * @param  {boolean} beginning   if true, insert professor at the beginning of the list of professorlist
//      * @return {None}
//      */
//     var insertStudent = function(student, beginning) {
//         // Start with the template, make a new DOM element using jQuery
//         var newElem = $(studentTempleteHtml); //student_info_inputs
//         // Populate the data in the new element
//         // Set the "id" attribute 
//         //newElem.attr('id', student.id); 
//         // Now fill in the data that we retrieved from the server
//         newElem.find('.name').text(student.name);

//         newElem.find('.email').text(student.email);
//         newElem.find('.password').text(student.password);
//         //newElem.find('.verifypassword').text(student.verifypassword);

//         // if (password == verify) {
//         //     var finalpassword = password;
//         // }

//         if (beginning) {
//             studentlist.prepend(newElem);
//         } else {
//             studentlist.append(newElem);
//         }
//     };

    /**
     * Add event handlers for submitting the create review form.
     * @return {None}
     */
    var attachStudentHandler = function() {
        var create_account = $('.student_info_inputs');
        var create_account_button = $('.student_info_inputs .create_account_button');
        create_account.on('click', '.cancel_button', function (e) {
            e.preventDefault(); // Tell the browser to skip its default click action
            // TODO: go back to login page
        });
        
        create_account.on('click', create_account_button, function (e) {
            e.preventDefault(); // Tell the browser to skip its default click action

            var student = {}; // Prepare the review object to send to the server
            //student.std_id =  $('header .selected_prof').attr('id');
            student.name = create_account.find('.name_input').val();
            student.wsuid = create_account.find('.id_input').val();
            student.email = create_account.find('.email_input').val();  
            student.password = create_account.find('.password_input').val();          
            
            console.log("Create account for student button is clicked!");

            var onSuccess = function(data) {
                var dataReceived = data.student;

            };
            var onFailure = function() { 
                console.error('Add Student - Failed');
            };
            let postRequestURL = '/api/addStudent';
            console.log(postRequestURL);
            makePostRequest(postRequestURL, student, onSuccess, onFailure);
        });
    };

    /**
     * Start the app by displaying the list of the professors and attaching event handlers.
     * @return {None}
     */
    var start = function() {

        //studentlist = $(".student_info_inputs")

        //studentTempleteHtml = $(".student_info_inputs").outerHTML;

        //create_account = $("form#create_account");
        attachStudentHandler();
    };
    

    // PUBLIC METHODS
    // any private methods returned in the hash are accessible via RateProfessor.key_name, e.g. RateProfessor.start()
    return {
        start: start
    };
    
};
