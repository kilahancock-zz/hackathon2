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

func (d *DataStore)SavePerson(p Person) (int64, error) {

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

