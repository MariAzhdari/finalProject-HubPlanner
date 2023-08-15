drop table if exists users;
drop table if exists Attendance;
drop table if exists Calendar;
drop table if exists SESSION;
drop table if EXISTS CLASS;
drop table if exists LOCATION;

CREATE DATABASE hubplanner;

CREATE TABLE users ( UserID SERIAL PRIMARY KEY, Name VARCHAR(255) NOT NULL, Role VARCHAR(50), LoginEmail VARCHAR(100) UNIQUE NOT NULL, EncryptedPassword VARCHAR(255) NOT NULL, City VARCHAR(100), CONSTRAINT chk_role CHECK (Role IN ('Volunteers', 'Trainees')));
CREATE TABLE Attendance ( UserID INTEGER REFERENCES User(UserID), MeetingID INTEGER REFERENCES Calendar(MeetingID), AttendanceStatus VARCHAR(20) NOT NULL CHECK (AttendanceStatus IN ('online', 'in person', 'not attending')), PRIMARY KEY (UserID, MeetingID) );
CREATE TABLE Calendar ( MeetingID SERIAL PRIMARY KEY, Date timestamp NOT NULL, Location VARCHAR(255) NOT NULL, Topic VARCHAR(255) NOT NULL, Time TIME DEFAULT '00:00:00', WeekNumber INTEGER GENERATED ALWAYS AS (EXTRACT(WEEK FROM Date)) STORED );
CREATE TABLE session (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NULL  NULL,
    session_date timestamp NOT NULL,
    class_id INT NOT NULL,
    WeekNumber INTEGER,
    is_holday BOOLEAN
);
CREATE TABLE class (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NULL  NULL,
    location_id INT NOT NULL
);
CREATE TABLE location (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NULL  NULL
);



INSERT INTO users(UserID,Name,Role,LoginEmail,EncryptedPassword,City) VALUES ('1','Guy Crawford','volunteer','guy.crawford@email.com','password',London);
INSERT INTO users(UserID,Name,Role,LoginEmail,EncryptedPassword,City) VALUES ('2','jamal','trainee','jamal@email.com','password',London);
INSERT INTO users(UserID,Name,Role,LoginEmail,EncryptedPassword,City) VALUES ('3','sara','volunteer','sara2@email.com','password',London);
INSERT INTO users(UserID,Name,Role,LoginEmail,EncryptedPassword,City) VALUES ('4','zina','trainee','zina.zimana@email.com','password',London);




INSERT INTO Attendance(user_id,Meeting_id,AttendanceStatus) VALUES(1,11,'onliine');
INSERT INTO Attendance(user_id,Meeting_id,AttendanceStatus) VALUES(2,12,'in person');
INSERT INTO Attendance(user_id,Meeting_id,AttendanceStatus) VALUES(3,13,'not attending');
INSERT INTO Attendance(user_id,Meeting_id,AttendanceStatus) VALUES(4,14,'not attending');


INSERT INTO Calender ( MeetingID, Date, Location, Topic, Time, WeekNumber) VALUES(11, timestamp, London, 'CSS1',CURRENT_TIMESTAMP,TIME, 1);
INSERT INTO Calender ( MeetingID, Date, Location, Topic, Time, WeekNumber) VALUES(12, timestamp, London, 'javascript',CURRENT_TIMESTAMP,TIME, 2);
INSERT INTO Calender ( MeetingID, Date, Location, Topic, Time, WeekNumber) VALUES(13, timestamp, London, 'React',CURRENT_TIMESTAMP,TIME, 3);
INSERT INTO Calender ( MeetingID, Date, Location, Topic, Time, WeekNumber) VALUES(14, timestamp, London, 'HTML',CURRENT_TIMESTAMP,TIME, 4);


INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('Git/GitHub',TO_TIMESTAMP('14/01/2023', 'DD/MM/YYYY'),1,1, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('HTML/CSS1',TO_TIMESTAMP('21/01/2023', 'DD/MM/YYYY'),1,2, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('HTML/CSS2',TO_TIMESTAMP('28/01/2023', 'DD/MM/YYYY'),1,3, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('HTML/CSS3',TO_TIMESTAMP('04/02/2023', 'DD/MM/YYYY'),1,4, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('F2F-HTML/CSS(social event)',TO_TIMESTAMP('11/02/2023', 'DD/MM/YYYY'),1,5, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('JSS/core1',TO_TIMESTAMP('18/02/2023', 'DD/MM/YYYY'),1,6, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('JSS/core1',TO_TIMESTAMP('25/02/2023', 'DD/MM/YYYY'),1,7, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('JSS/core1',TO_TIMESTAMP('04/03/2023', 'DD/MM/YYYY'),1,8, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('JSS/core1',TO_TIMESTAMP('11/03/2023', 'DD/MM/YYYY'),1,9, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('JSS/core2',TO_TIMESTAMP('18/03/2023', 'DD/MM/YYYY'),1,10, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('JSS/core2',TO_TIMESTAMP('25/03/2023', 'DD/MM/YYYY'),1,11, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('JSS/core2',TO_TIMESTAMP('01/04/2023', 'DD/MM/YYYY'),1,12, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('Holiday/Easter',TO_TIMESTAMP('08/04/2023', 'DD/MM/YYYY'),1,13, TRUE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('JSS/core2',TO_TIMESTAMP('15/04/2023', 'DD/MM/YYYY'),1,14, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('JSS/core3',TO_TIMESTAMP('22/04/2023', 'DD/MM/YYYY'),1,15, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('Holiday/Spring Bank Holiday',TO_TIMESTAMP('29/04/2023', 'DD/MM/YYYY'),1,16, TRUE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('Holiday/May Bank Holiday',TO_TIMESTAMP('06/05/2023', 'DD/MM/YYYY'),1,17, TRUE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('JSS/core3',TO_TIMESTAMP('13/05/2023', 'DD/MM/YYYY'),1,18, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('JSS/core3',TO_TIMESTAMP('20/05/2023', 'DD/MM/YYYY'),1,19, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('JSS/core3',TO_TIMESTAMP('27/05/2023', 'DD/MM/YYYY'),1,20, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('Holiday/Spring Bank Holiday',TO_TIMESTAMP('03/06/2023', 'DD/MM/YYYY'),1,21, TRUE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('JSS/core3',TO_TIMESTAMP('10/06/2023', 'DD/MM/YYYY'),1,22, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('React1',TO_TIMESTAMP('17/06/2023', 'DD/MM/YYYY'),1,23, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('React2',TO_TIMESTAMP('24/06/2023', 'DD/MM/YYYY'),1,24, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('React3',TO_TIMESTAMP('01/07/2023', 'DD/MM/YYYY'),1,25, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('React4',TO_TIMESTAMP('08/07/2023', 'DD/MM/YYYY'),1,26, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('Node1',TO_TIMESTAMP('15/07/2023', 'DD/MM/YYYY'),1,27, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('Node2',TO_TIMESTAMP('22/07/2023', 'DD/MM/YYYY'),1,28, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('Node3',TO_TIMESTAMP('29/07/2023', 'DD/MM/YYYY'),1,29, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('Node4',TO_TIMESTAMP('05/08/2023', 'DD/MM/YYYY'),1,30, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('SQL1/Database',TO_TIMESTAMP('12/08/2023', 'DD/MM/YYYY'),1,31, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('Holiday/Summer',TO_TIMESTAMP('19/08/2023', 'DD/MM/YYYY'),1,32, TRUE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('Holiday/Summer',TO_TIMESTAMP('26/08/2023', 'DD/MM/YYYY'),1,33, TRUE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('SQL2/Database',TO_TIMESTAMP('02/09/2023', 'DD/MM/YYYY'),1,34, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('SQL3/Database',TO_TIMESTAMP('09/09/2023', 'DD/MM/YYYY'),1, 35, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('SQL4/Database',TO_TIMESTAMP('23/09/2023', 'DD/MM/YYYY'),1, 36, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('Final/project',TO_TIMESTAMP('30/09/2023', 'DD/MM/YYYY'),1, 37, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('Final/project',TO_TIMESTAMP('07/10/2023', 'DD/MM/YYYY'),1, 38, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('Final/project',TO_TIMESTAMP('14/10/2023', 'DD/MM/YYYY'),1, 39, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('Final/project',TO_TIMESTAMP('21/10/2023', 'DD/MM/YYYY'),1, 40, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('Internal/Demo',TO_TIMESTAMP('28/10/2023', 'DD/MM/YYYY'),1, 41, FALSE);
INSERT INTO session(name,session_date,class_id, WeekNumber, is_holday) VALUES('External/Demo',TO_TIMESTAMP('4/11/2023', 'DD/MM/YYYY'),1, 42, FALSE);





INSERT INTO class(name,location_id) VALUES('London',1);
INSERT INTO class(name,location_id) VALUES('WestMidland',2);
INSERT INTO class(name,location_id) VALUES('Manchester',3);
INSERT INTO class(name,location_id) VALUES('Scotland',4);


INSERT INTO location(name) VALUES('London');
INSERT INTO location(name) VALUES('WestMidland');
INSERT INTO location(name) VALUES('Manchester');
INSERT INTO location(name) VALUES('Scotland');