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

func Resource(w http.ResponseWriter, r *http.Request) {

	switch r.Method {
	case http.MethodPost:
		// TODO
	case http.MethodGet:
		// TODO
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
