window.full_name;
var wsu_email;
var std_id;


function BeMyTA () {

    // PRIVATE VARIABLES

    var apiUrl = 'https://bee-myy-taa.herokuapp.com';
    // var apiUrl = 'http://localhost:5000'; //local

    var add_student; // add_student form, value set in the "start" method below

    var std_homepage;

    var login; // login form

    var sid;


    var studentlist;
    var stdTemplateHtml;

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

            //1. search for username in the database
            //2. if exist, get the sid of the student
            //3. check to make sure the username and password match the entered username and password
            //4. save the sid globally, so when other page is navigated, populate the student homepage
            //   with the sid
            //5. if doesn't exist, give error message

            var onSuccess = function(data) {
                var students = data.student; //student object retrieved from the server
      
                for (var i = 0; i < students.length; i++) {
                    //insertReview(all_reviews[i], true)
                    if (username == students[i].email) { //username exists
                        if (password == students[i].password) { //password match
                            sid = students[i].sid;
                            

                            full_name = students[i].name;
                            wsu_email = students[i].email;
                            std_id = students[i].wsuid;

                            localStorage.setItem('name', full_name);
                            localStorage.setItem('id', std_id);

                            insertStudent(full_name, std_id, true);

                            //navigate to new page
                            window.location.href = "student_homepage.html";
                            
                            //console.log("username and password match");

                        } else {
                            alert("Incorrect password");
                        }
                    } 
                    // else {
                    //     alert("Incorrect username! Try again!");
                    // }

                }
                var user = data.email;
                var pass = data.password;

                if (username == user && password == pass) {
                    //navigate to account homepage
                    window.location.href = "student_homepage.html";
                    console.log("username and password match");
                }
            };
            var onFailure = function() { 
                console.error('retrieving student data - Failed');
                alert("Error login in! Try again!");
            };

            if (username == "" && password == "") {
                alert("Both username and password field empty! Please enter your username and password!");
            }
            else if (username == "") {
                alert("Username field empty! Enter your username!");
            } 
            else if (password == "") {
                alert("Password field empty! Enter your password!");
            } 
            else
            {
                let requestURL = '/api/students';
                makeGetRequest(requestURL, onSuccess, onFailure);
            }

            //let selected_prof_id = $('header .selected_prof').attr('id');
            //let sample_sid = 8;
               
        });
    };
    
    // //populates the student homepage with the correct information
    // var displayStudentHomepage = function() {
    //     // Prepare the AJAX handlers for success and failure
    //      var onSuccess = function(data) {
    //          var jsondata = data.student;
    //          insertStudent(jsondata, true);

    //      };
    //      var onFailure = function() { 
    //          console.error('List all students - Failed'); 
    //      };
    //      let requestUrl = '/api/student?sid='+sid;
    //      makeGetRequest(requestUrl, onSuccess, onFailure);
 
    // };

    // var insertStudent = function(name, id) {
    //     var student_name = $(".std_name");
    //     var student_id = $(".wsu_id");

    //     // student_name[0].innerText = "Hello";
    //     // student_id[0].innerText = "Sup";

    //     student_name[0].innerText = name;
    //     student_id[0].innerText = id;
 
    // };

    var insertStudent = function(name, id, beginning) {
        // Start with the template, make a new DOM element using jQuery
        //window.location.href = "student_homepage.html";
        // studentlist = $(".studentlist");
        // stdTemplateHtml = $(".studentlist .student_box")[0].outerHTML;
        // studentlist.HTML('');


        var newElem = $(stdTemplateHtml);
  
        newElem.find('.std_name').text(name);
        newElem.find('.wsu_id').text(id);

        // if (beginning) {
        //     studentlist.prepend(newElem);
        // } else {
        //     studentlist.append(newElem);
        // }

 
    };

    /**
     * Add event handlers for submitting the create student form.
     * @return {None}
     */
    var attachStudentHandler = function(e) {   
        add_student.on('click', '.cancel_create_std_button', function (e) {
            e.preventDefault();
            window.location.href = "login.html";
            console.log("Cancel button clicked -- Student!");
        });
        
        // The handler for the Create button in the form
        add_student.on('click', '.create_account_button', function (e) {
            e.preventDefault (); // Tell the browser to skip its default click action

            var std = {}; // Prepare the student object to send to the server

            std.name = add_student.find('.name_input').val();
            std.wsuid = add_student.find('.id_input').val();
            std.email = add_student.find('.email_input').val();
            std.password = add_student.find('.password_input').val();

            var onSuccess = function(data) {
                //navigate to the next page upon successful creation of account -- to student homepage
                window.location.href = "student_homepage.html";

                //populate the student homepage with correct info
                //can locally do it first -- send the info above to the new page and display the info

                Console.log('Inside onSuccess function for creating student account!');
            };
            var onFailure = function() { 
                console.error('Add new Student- Failed'); 
            };
            
            let postRequestURL = '/api/addStudent';
            console.log(postRequestURL);
            console.log(std);
            makePostRequest(postRequestURL, std, onSuccess, onFailure);
        });

    };

    /**
     * Add event handlers for submitting the create professor form.
     * @return {None}
     */
    var attachProfessorHandler = function(e) {   
        add_professor.on('click', '.cancel_create_prof_button', function (e) {
            e.preventDefault();
            window.location.href = "login.html";
            console.log("Cancel button clicked -- Professor!");
        });
        
        // The handler for the Create button in the form
        add_professor.on('click', '.create_prof_account_button', function (e) {
            e.preventDefault (); // Tell the browser to skip its default click action

            var prof = {}; // Prepare the student object to send to the server

            prof.Iname = add_professor.find('.professor_name_input').val();
            prof.Iemail = add_professor.find('.professor_email_input').val();
            prof.Ipassword = add_professor.find('.professor_password_input').val();

            var onSuccess = function(data) {
                //navigate to the next page upon successful creation of account -- to student homepage
                window.location.href = "professor_homepage.html";

                //populate the professor homepage with correct info
                //can locally do it first -- send the info above to the new page and display the info

                Console.log('Inside onSuccess function for creating professor account!');
            };
            var onFailure = function() { 
                console.error('Add new professor- Failed'); 
            };
            
            let postRequestURL = '/api/addInstructor';
            makePostRequest(postRequestURL, prof, onSuccess, onFailure);
        });

    };
    
    /**
     * Start the app by displaying the list of the professors and attaching event handlers.
     * @return {None}
     */
    var start = function() {

        login = $("form#loginForm");

        
        attachLoginHandler();

        //add_student = $(".student_info_inputs form#addStudentForm");
        add_student = $("form#addStudentForm");
        add_student = $(".student_info_inputs form#addStudentForm");
        // studentlist = $(".studentlist");
        // stdTemplateHtml = $(".studentlist .student_box")[0].outerHTML;
        // studentlist.HTML('');

        
        
        //add_student = $("form#addStudentForm");
        attachStudentHandler();

        add_professor = $("form#addProfessorForm");
        attachProfessorHandler();

        //stdTemplateHtml = $(".studentlist")[0].outerHTML;
        //insertStudent();
        
        //insertStudent(full_name, std_id);

    };
    

    // PUBLIC METHODS
    // any private methods returned in the hash are accessible via RateProfessor.key_name, e.g. RateProfessor.start()
    return {
        start: start
    };
    
};

function StudentHomePage() {


    var insertStudent = function(name, id, beginning) {
        // Start with the template, make a new DOM element using jQuery


        var newElem = $(stdTemplateHtml);

        newElem.find('.std_name').text(name);
        newElem.find('.wsu_id').text(id);

        if (beginning) {
            studentlist.prepend(newElem);
        } else {
            studentlist.append(newElem);
        }


    };

    
    var start = function() {


        studentlist = $(".studentlist");
        stdTemplateHtml = $(".studentlist .student_box")[0].outerHTML;
        studentlist.html('');
        var name = localStorage.getItem('name');
        var id = localStorage.getItem('id');
        insertStudent(name, id, true);
        //attachLoginHandler();


        
        
        //add_student = $("form#addStudentForm");
        // attachStudentHandler();

        //stdTemplateHtml = $(".studentlist")[0].outerHTML;
        //insertStudent();
        
        //insertStudent(full_name, std_id);

    };


// PUBLIC METHODS
// any private methods returned in the hash are accessible via RateProfessor.key_name, e.g. RateProfessor.start()
    return {
        start: start
    };

};


