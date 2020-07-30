package nutrishare

import (
	"encoding/json"
	"fmt"
	"github.com/rs/zerolog/log"
	"net/http"
)

type Person struct {
	Username string
	Email  string
}

type Resource struct{
	id int,
	pid int,
	rname string,
	rtype string,
	request bool,
	dsc string,
	zipcode string
}

func Health(w http.ResponseWriter, r *http.Request) {
	_ = json.NewEncoder(w).Encode(map[string]interface{}{
		"healthy": "ok",
	})
}

func Login(w http.ResponseWriter, r *http.Request) {
	type person struct{
		id int
		pid int
		rname string
		rtype string
		request bool
		dsc string
		zipcode string
	}
	p := person{id: 1, pid: 1, rname: "Tacos", rtype: "dinner",request: false,dsc: "Good food.", zipcode: "00727"}

	err := json.NewEncoder(w).Encode(p)
	if err != nil{
		fmt.Sprintf("We blew up...")
	}

	w.Header().Set("content-type", "application/json")

	w.WriteHeader(http.StatusOK)

}

func Resource(w http.ResponseWriter, r *http.Request) ([]*Resource, error) {

	switch r.Method {
	case http.MethodPost:
		re := `INSERT INTO Resource (pid, rname, rtype, request, dsc, zipcode) VALUES (?, ?, ?, ?, ?, ?)`
		res, err := DB.Exec(re, 1, "Tacos", "dinner", false, "good food", "00727")
		if err != nil {
			http.Error(w, err.Error() + fmt.Sprintf("bad"), http.StatusBadRequest)
			return
		}
	case http.MethodGet:
		re := `SELECT * FROM Resource WHERE pid='1'`
		rows, err := DB.Query(re)
		if err != nil {
			return nil, err
		}
		res := make([]*Resource, 0)
		for rows.Next() {
			rs := new(Resource)
			err := rows.Scan(&rs.id, &rs.pid, &rs.rname, &rs.rtype, &rs.request, &rs.dsc, &rs.zipcode)
			if err != nil {
				return nil, err
			}
			res = append (res, rs)
		}
		if err = rows.Err(); err != nil {
			return nil, err
		}
		return res, nil
	}

}

func PersonCreate(w http.ResponseWriter, r *http.Request){
	// Declare a new Person struct.
	var p Person

	// Try to decode the request body into the struct. If there is an error,
	// respond to the client with the error message and a 400 status code.
	err := json.NewDecoder(r.Body).Decode(&p)
	if err != nil {
		http.Error(w, err.Error() + fmt.Sprintf("Person: %+v", p), http.StatusBadRequest)
		return
	}

	// Do something with the Person struct...
	log.Info().Msg(fmt.Sprintf("Person: %+v", p))
	log.Info().Msg(fmt.Sprintf("Username: %+v", p.Username))
	log.Info().Msg(fmt.Sprintf("Username: %+v", p.Email))

}
