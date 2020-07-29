package main

import (
	"database/sql"
	"fmt"
	"github.com/rs/zerolog/log"
)

func newDB(user, pass string) (*sql.DB, error) {
	dsn := fmt.Sprintf("%s:%s@tcp(mysql:3306)/testDB?parseTime=true", user, pass)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	return db, nil
}

func SavePerson(p Person) (int64, error) {

	log.Info().Msg(fmt.Sprintf("Person: %+v", p))
	res, err := DB.Exec(`INSERT INTO Person(username,password,email,zipcode)
		VALUES ($1,$2,$3,$4)`, p.Username, p.Password, p.Email, p.Zipcode)

	// This error is triggering with 'No database selected'
	if err != nil{
		return 0, err
	}
	pid, err := res.LastInsertId()

	return pid, err
}

//func SaveCustomer(username string) error {
//	db := GetDB()
//	_, err := db.Exec("INSERT INTO customer (username) VALUES($1)", username)
//	return err
//}

