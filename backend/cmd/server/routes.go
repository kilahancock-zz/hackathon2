package main

import (
	"encoding/json"
	"fmt"
	"github.com/rs/zerolog/log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

type ExistingUser struct {
	Username string
	Password string
}

type Person struct {
	Username string
	Email  string
	Password string
	Zipcode string
}

type Resources struct {
	// pid int
	// zipcode int
	Request bool
	Rtype string
	Dsc string
	Adnotes string
}

func Health(w http.ResponseWriter, r *http.Request) {
	enableCors(&w);
	_ = json.NewEncoder(w).Encode(map[string]interface{}{
		"healthy": "ok",
	})
}

func Login(w http.ResponseWriter, r *http.Request) {
	// Enable response for all access
	enableCors(&w);

	// Declare a new User struct.
	var user ExistingUser;

	// Try to decode the request body into the struct. If there is an error,
	// respond to the client with the error message and a 400 status code.
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error() + fmt.Sprintf("User: %+v", user), http.StatusBadRequest)
		return
	}

	// TODO: Pull from DB and see if User Exists
	log.Info().Msg(fmt.Sprintf("User: %+v", user))

	// ! Do need to send back response in order for information to work right
	_ = json.NewEncoder(w).Encode(map[string]interface{}{
		"login": "ok",
	})
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

	// Enable response for all access
	enableCors(&w)
	log.Info().Msg(r.Method);

	switch r.Method {
		case http.MethodPost:
			// Declare a new Person struct.
			var p Person

			// Try to decode the request body into the struct. If there is an error,
			// respond to the client with the error message and a 400 status code.
			err := json.NewDecoder(r.Body).Decode(&p)
			if err != nil {
				http.Error(w, err.Error(), http.StatusBadRequest)
				return
			}

			x, err := SavePerson(p)
			log.Info().Msg(string(x))

			if err != nil{
				log.Info().Msg("Wasn't able to save person " + err.Error())
			}
			// idk why this isn't getting sent back properly
			_ = json.NewEncoder(w).Encode(map[string]interface{}{
				"personCreate": "wait, this actually worked?",
			})
		case http.MethodGet:
			_ = json.NewEncoder(w).Encode(map[string]interface{}{
				"personCreate": "ik this should work",
			})
	}
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
    (*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
    (*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}