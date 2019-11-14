from flask import Flask, jsonify, request
from flask_cors import CORS
import flask_sqlalchemy as sqlalchemy

import datetime

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sqlalchemy-backend.db'

db = sqlalchemy.SQLAlchemy(app)


class Student(db.Model):
    sid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    GPA = db.Column(db.Float)
    major = db.Column(db.String(255))
    graduation_date = db.Column(db.String(255)) # mm/yyyy
    courses = db.relationship('TAAplication',backref='applicant', lazy='dynamic')

class Course(db.Model):
    cid = db.Column(db.Integer, primary_key=True)
    ctitle = db.Column(db.String(255))
    cdescription = db.Column(db.String(255))
    cmaxTA = db.Column(db.Integer)

class TAAplication(db.Model):
    sid = db.Column(db.Integer, db.ForeignKey('student.sid'), primary_key=True)
    cid = db.Column(db.Integer, db.ForeignKey('course.cid'), primary_key=True)
    statusDesc = db.relationship('Instructor',backref='statusDesc', lazy = 'joined')
    statusCode = db.Column(db.Integer, db.ForeignKey('instructor.Iid'))
    applied_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    lastupdated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    courseInfo = db.relationship('Course',backref='courseInfo', lazy = 'joined')

class Instructor(db.Model):
    Iid = db.Column(db.Integer, primary_key=True)
    Iname = db.Column(db.String(255))
    Iemail = db.Column(db.String(255))

base_url = '/api/'

# get all student data
@app.route(base_url + 'student', methods=["GET"])
def getStudents():
    query = Student.query.all()

    result = []
    for row in query:
        result.append(
            row_to_obj_student(row)
        )
    return jsonify({"status": 1, "result": result})

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


# #join of Student and TAApplication
# @app.route(base_url + 'studentapplies', methods=["GET"])
# def student_applies():
#     query = Student.query.join(TAAplication, Student.sid==TAAplication.sid).join(Instructor, TAAplication.cid==Course.cid).join(Instructor,TAAplication.cid==Instructor.fid).all()

#     result = []
#     for row in query:
#         result.append(
#             row_to_obj_studentapplies(row)
#         )
#     return jsonify({"status": 1, "result": result})

# creates a student
@app.route(base_url + 'addStudent', methods=['POST'])
def add2Student():
    student = Student(**request.json)
    db.session.add(student)
    db.session.commit()
    db.session.refresh(student)

    return jsonify({"status": 1, "student": row_to_obj_student(student)}), 200

# creates a course
@app.route(base_url + 'addCourse', methods=['POST'])
def add2Course():
    course = Course(**request.json)
    db.session.add(course)
    db.session.commit()
    db.session.refresh(course)

    return jsonify({"status": 1, "course": row_to_obj_course(course)}), 200

# # creates TA-application
# @app.route(base_url + 'addTAApplication', methods=['POST'])
# def add2TAApplication():
#     applies = TAAplication(**request.json)
#     db.session.add(applies)
#     db.session.commit()
#     db.session.refresh(applies)

#     return jsonify({"status": 1, "application": row_to_obj_applies(applies)}), 200

# creates instructor
@app.route(base_url + 'addInstructor', methods=['POST'])
def add2Instructor():
    instructor = Instructor(**request.json)
    db.session.add(instructor)
    db.session.commit()
    db.session.refresh(instructor)

    return jsonify({"status": 1, "instructor": row_to_obj_instructor(instructor)}), 200





def row_to_obj_student(row):
    row = {
            "sid": row.sid,
            "name": row.name,
            "major": row.major,
            "GPA": row.GPA,
            "graduation_date": row.graduation_date
        }
    return row

def row_to_obj_course(row):
    row = {
            "cid": row.cid,
            "ctitle": row.ctitle,
            "cdescription": row.cdescription,
            "cmaxTA": row.cmaxTA
        }
    return row

# def row_to_obj_applies(row):
#     row = {
#             "sid": row.sid,
#             "cid": row.cid,
#             "statusCode": row.statusCode,
#             "lastupdated_at": row.lastupdated_at,
#             "statusDesc": row.statusDesc.Iname,
#             "statusDesc": row.statusDesc.Iemail,
#             "courseInfo": row.courseInfo.ctitle,
#             "courseInfo": row.courseInfo.cdescription,
#             "courseInfo": row.courseInfo.cmaxTA
#         }
#     return row

# def row_to_obj_studentapplies(row):
#     collegesApplied = []
#     for c in row.colleges.all():
#         collegesApplied.append(row_to_obj_applies(c))
        
#     row = {
#             "sid": row.sid,
#             "name": row.name,
#             "lastname": row.lastname,
#             "highschool": row.highschool,
#             "GPA": row.GPA,
#             "SAT": row.SAT,
#             "colleges" : collegesApplied
#     }
#     return row

def row_to_obj_instructor(row):
    row = {
            "Iid": row.Iid,
            "Iname": row.Iname,
            "Iemail": row.Iemail
        }
    return row

def main():
    # db.create_all()
    app.run()

if __name__ == '__main__':
    app.debug = True
    main()
