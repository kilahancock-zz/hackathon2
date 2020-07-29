create table Test_Table (
    id INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE Person (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(15),
    password CHAR(64),
    email VARCHAR(50),
    zipcode char(5)
);

CREATE TABLE Resource (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pid INT,
    rname VARCHAR(15),
    rtype VARCHAR(15),
    request BOOLEAN,
    dsc VARCHAR(100),
    zipcode char(5)
);

INSERT INTO Person (id,username,password,email,zipcode)
VALUES (1, "javi", "passwd","ja@upr.edu","00727");

INSERT INTO Resource (id,pid,rname,rtype,request,dsc,zipcode)
VALUES (1,1,"Dinner","Veggie", false,"Food for those who don't eat meat.", "00727");
