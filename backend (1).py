from flask import Flask, jsonify, request
from flask_cors import CORS
import flask_sqlalchemy as sqlalchemy

import datetime

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sqlalchemy-backend.db'

db = sqlalchemy.SQLAlchemy(app)

# student database
class Student(db.Model):
    sid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    wsuid = db.Column(db.String(255))
    email = db.Column(db.String(255))
    password = db.Column(db.String(255))
    # courses = db.relationship('TAAplication',backref='applicant', lazy='dynamic')

# courses database
class Course(db.Model):
    cid = db.Column(db.Integer, primary_key=True)
    ctitle = db.Column(db.String(255))
    cdescription = db.Column(db.String(255))

# Application database
class TAAplication(db.Model):
    sid = db.Column(db.Integer, db.ForeignKey('student.sid'), primary_key=True)
    cid = db.Column(db.Integer, db.ForeignKey('course.cid'), primary_key=True)
    status = db.Column(db.String(255))

# Professor database
class Instructor(db.Model):
    Iid = db.Column(db.Integer, primary_key=True)
    Iname = db.Column(db.String(255))
    Iemail = db.Column(db.String(255))
    Ipassword = db.Column(db.String(255))



base_url = '/api/'

@app.route(base_url + 'studentCourses', methods=["GET"])
def addApplication(sid, cid):
    query = Course.query.join(TAAplication, Course.cid == TAAplication.cid).filter(TAAplication.sid == 2).all():

    result = []
    for row in query:
        result.append(
            row_to_obj_studentapplies(row)
        )

    return jsonify({"status": 1, "result": result})



# get student with specific id -- sid -- example url: /api/student?sid=1
@app.route(base_url + 'student', methods=["GET"])
def getStudent():

    curr_id = request.args.get('sid', None)

    row = Student.query.filter_by(sid=curr_id).first()

    return jsonify({"status": 1, "student": row_to_obj_student(row)}), 200


# get all student data
@app.route(base_url + 'students', methods=["GET"])
def getAllStudents():

    query = Student.query.all()
    

    result = []
    for row in query:
        result.append(
            row_to_obj_student(row)
        )
    return jsonify({"status": 1, "student": result})

#get all course data
@app.route(base_url + 'courses', methods=["GET"])
def getCourses():
    query = Course.query.all()

    result = []
    for row in query:
        result.append(
            row_to_obj_course(row)
        )
    return jsonify({"status": 1, "result": result})

# get all instructor data
@app.route(base_url + 'instructor', methods=["GET"])
def getInstructor():
    query = Instructor.query.all()

    result = []
    for row in query:
        result.append(
            row_to_obj_instructor(row)
        )
    return jsonify({"status": 1, "result": result})


#join of Student and TAApplication
# @app.route(base_url + 'studentapplies', methods=["GET"])
# def student_applies():
#     query = Student.query.join(TAAplication, Student.sid==TAAplication.sid).join(Course, TAAplication.cid==Course.cid).join(Instructor,TAAplication.Iid==Instructor.Iid).all()

#     result = []
#     for row in query:
#         result.append(
#             row_to_obj_studentapplies(row)
#         )
#     return jsonify({"status": 1, "result": result})

# creates a student
@app.route(base_url + 'addStudent', methods=['POST'])
def add2Student(student):
    student = Student(**student)
    db.session.add(student)
    db.session.commit()
    db.session.refresh(student)

    return jsonify({"status": 1, "student": row_to_obj_student(student)}), 200


# creates a course
@app.route(base_url + 'addCourse', methods=['POST'])
def add2Course(request):
    newcourse = Course(**request)
    db.session.add(newcourse)
    db.session.commit()
    db.session.refresh(newcourse)

    return jsonify({"status": 1, "course": row_to_obj_course(newcourse)}), 200

# creates TA-application
@app.route(base_url + 'addTAApplication', methods=['POST'])
def add2TAApplication(request):
    application = TAAplication(**request)
    db.session.add(application)
    db.session.commit()
    db.session.refresh(application)

    return jsonify({"status": 1, "application": row_to_obj_applies(application)}), 200

# creates instructor
@app.route(base_url + 'addInstructor', methods=['POST'])
def add2Instructor():
    instructor = Instructor(**request.json)
    db.session.add(instructor)
    db.session.commit()
    db.session.refresh(instructor)

    return jsonify({"status": 1, "instructor": row_to_obj_instructor(instructor)}), 200

# delete student given an id
@app.route(base_url + 'deleteStudent', methods=['DELETE'])
def delete_student():
    curr_id = request.args.get('sid', None)

    #delete the student
    Student.query.filter_by(sid=curr_id).delete()

    db.session.commit()

    return jsonify ({"status": 1}), 200

# delete professor given an id
@app.route(base_url + 'deleteInstructor', methods=['DELETE'])
def delete_professor():
    myid = request.args.get('id', None)

    #delete the professor
    Instructor.query.filter_by(Iid=myid).delete()

    db.session.commit()

    return jsonify ({"status": 1}), 200

# delete courses given an id
@app.route(base_url + 'deleteCourse', methods=['DELETE'])
def delete_course():
    myid = request.args.get('id', None)

    #delete the course
    Course.query.filter_by(cid=myid).delete()

    db.session.commit()

    return jsonify ({"status": 1}), 200


# delete TAAplication given an id
@app.route(base_url + 'removeStudent', methods=['DELETE'])
def delete_application():
    myid = request.args.get('id', None)

    #delete the application
    TAAplication.query.filter_by(id=myid).delete()

    db.session.commit()

    return jsonify ({"status": 1}), 200


def row_to_obj_student(row):
    row = {
            "sid": row.sid,
            "name": row.name,
            "wsuid": row.wsuid,
            "email": row.email,
            "password": row.password
        }
    return row

def row_to_obj_course(row):
    row = {
            "cid": row.cid,
            "ctitle": row.ctitle,
            "cdescription": row.cdescription
        }
    return row

def row_to_obj_applies(row):
    row = {
            "sid": row.sid,
            "cid": row.cid,
            "status": row.status
    }
    return row

def row_to_obj_studentapplies(row):
    # coursesApplied = []
    # for row in row.courses.all():
    #     coursesApplied.append(row_to_obj_applies(c))
        
    row = {
        "sid": row.sid,
        "cid": row.cid,
        "status": row.status
    }
    return row

def row_to_obj_instructor(row):
    row = {
            "Iid": row.Iid,
            "Iname": row.Iname,
            "Iemail": row.Iemail,
            "Ipassword": row.Ipassword
        }
    return row

def main():
    db.create_all()
    app.run()

if __name__ == '__main__':
    app.debug = True
    main()
