package main

import (
	"encoding/json"
	"fmt"
	"github.com/rs/zerolog/log"
	"net/http"
)

type Resource struct{
	id int64
	pid int64
	rname string
	rtype string
	request bool
	dsc string
	zipcode string
}

type ExistingUser struct {
	Username string
	Password string
}

type Person struct {
	id int64
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

//func Resource(w http.ResponseWriter, r *http.Request) {
//
//	switch r.Method {
//	case http.MethodPost:
//		// TODO
//	case http.MethodGet:
//		// TODO
//	}
//
//}

func (s *Server) PersonCreate(w http.ResponseWriter, r *http.Request){
	// Enable response for all access
	enableCors(&w)

	// Declare a new Person struct.
	var p Person

	// Try to decode the request body into the struct. If there is an error,
	// respond to the client with the error message and a 400 status code.
	err := json.NewDecoder(r.Body).Decode(&p)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	pid, err := s.ds.SavePerson(p)
	if err != nil{
		// TODO fatalize
		log.Info().Msg("Wasn't able to save person " + err.Error())
	}
	// int64 or int for Person?
	p.id = pid

	log.Info().Msg(fmt.Sprintf("Person: %+v", p))

	_ = json.NewEncoder(w).Encode(map[string]interface{}{
		"personCreate": pid,
	})
}

func (s *Server) ResourceHandler(w http.ResponseWriter, r *http.Request) {

	// Enable response for all access
	enableCors(&w)

	switch r.Method {
	case http.MethodPost:
		// Declare a new Resource struct.
		var resource Resource

		// Try to decode the request body into the struct. If there is an error,
		// respond to the client with the error message and a 400 status code.
		err := json.NewDecoder(r.Body).Decode(&resource)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		s.Logger.Info().Msg(fmt.Sprintf("We're adding this resource to the db: %+v", r))
		id, err := s.ds.SaveResource(resource)
		if err != nil {
			// TODO fatalize
			log.Info().Msg("Wasn't able to save resource " + err.Error())
		}
		resource.id = id
	case http.MethodGet:
		zipCode := "00727"
		res, err := s.ds.GetResourceByZip(zipCode)
		if err != nil {
			// TODO fatalize
			log.Info().Msg("Wasn't able to read resources " + err.Error())
		}
		// TODO json encode
		_ = json.NewEncoder(w).Encode(res)
	}

}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type")
	(*w).Header().Set("Content-Type", "application/json")
}
