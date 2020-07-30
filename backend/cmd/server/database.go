package main

import (
	"database/sql"
	"fmt"
)

func newDB(user, pass string) (*sql.DB, error) {
	dsn := fmt.Sprintf("%s:%s@tcp(mysql:3306)/testDB?parseTime=true", user, pass)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	return db, nil
}

func (d *DataStore) SavePerson(p Person) (int64, error) {

	// TODO delete
	d.Logger.Info().Msg(fmt.Sprintf("We're adding this person to the db: %+v", p))

	res, err := d.db.Exec(`INSERT INTO Person (username,password,email,zipcode)
VALUES (?, ?, ?, ?)`,p.Username, p.Password, p.Email, p.Zipcode)

	if err != nil{
		return 0, err
	}
	pid, err := res.LastInsertId()

	return pid, err
}

func (d *DataStore) SaveResource(r Resource) (int64, error) {

	// TODO delete
	d.Logger.Info().Msg(fmt.Sprintf("We're adding this resource to the db: %+v", r))

	res, err := d.db.Exec(`INSERT INTO Resource (pid, rname, rtype, request, dsc, zipcode) VALUES (?, ?, ?, ?, ?, ?)`,
		r.pid, r.rname, r.rtype, r.request, r.dsc, r.zipcode)
	if err != nil {
		return 0, err
	}

	pid, err := res.LastInsertId()

	return pid, err
}

func (d *DataStore) GetResourceByZip(zipCode string) ([]Resource, error){
	res := make([]Resource, 0)

	rows, err := d.db.Query(`SELECT * FROM Resource WHERE zipcode=?`,zipCode)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		rs := new(Resource)
		err := rows.Scan(&rs.id, &rs.pid, &rs.rname, &rs.rtype, &rs.request, &rs.dsc, &rs.zipcode)
		if err != nil {
			return nil, err
		}
		res = append (res, *rs)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return res, err
}



