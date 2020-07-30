create table Test_Table (
    id INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE Person (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(15),
    email VARCHAR(50),
    password CHAR(64),
    zipcode char(5)
);

CREATE TABLE Resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rname VARCHAR(15),
    pid INT,
    request BOOLEAN,
    rtype VARCHAR(15),
    dsc VARCHAR(100),
    adnotes VARCHAR (100),
    zipcode char(5)
);

CREATE TABLE Charities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pid INT,
    cname VARCHAR(100),
    cURL VARCHAR(100),
    ccity VARCHAR(100),
    cstate VARCHAR(100)
);

INSERT INTO Person (id,username,password,email,zipcode)
VALUES (1, "javi", "passwd","ja@upr.edu","00727");

INSERT INTO Resources (id,pid,rname,rtype,request,dsc,zipcode)
VALUES (1,1,"Dinner","Veggie", false,"Food for those who don't eat meat.", "00727");

INSERT INTO Charities (id, pid, cname, cURL, ccity, cstate)
VALUES (1,1,"Meals on Wheels","https://www.mealsonwheelsamerica.org/","Charlotte","NC");
