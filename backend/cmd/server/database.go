package main

import (
	"database/sql"
	"fmt"
)

func newDB(user, pass string) (*sql.DB, error) {
	dsn := fmt.Sprintf("%s:%s@tcp(mysql:3306)/?parseTime=true", user, pass)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	return db, nil
}
