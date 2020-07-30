package main

import (
	"encoding/json"
	"fmt"
	"github.com/rs/zerolog/log"
	"net/http"
)

type Resource struct {
	id      int64
	Pid     int64
	Rname   string
	Rtype   string
	Request bool
	Dsc     string
	Zipcode string
}

type Charity struct {
	id int64
	Pid int64
	Cname string
	CURL string
	Ccity string
	Cstate string
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

func (s *Server) Health(w http.ResponseWriter, r *http.Request) {
	enableCors(&w);
	err := s.ds.db.Ping()

	var dbStatus string
	if dbStatus = "ok"; err!=nil {
		dbStatus = "not ok"
	}
	_ = json.NewEncoder(w).Encode(map[string]interface{}{
		"healthy": "ok",
		"db": dbStatus,
	})
}

func (s *Server) Login(w http.ResponseWriter, r *http.Request) {
	// Enable response for all access
	enableCors(&w);

	// Declare a new User struct.
	var p Person;

	// Try to decode the request body into the struct. If there is an error,
	// respond to the client with the error message and a 400 status code.
	err := json.NewDecoder(r.Body).Decode(&p)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	s.ds.GetPerson("username", "password")
	log.Info().Msg(fmt.Sprintf("Person: %+v", p))

	// ! Do need to send back response in order for information to work right
	_ = json.NewEncoder(w).Encode(map[string]interface{}{
		"login": "ok",
	})
}

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

		id, err := s.ds.SaveResource(resource)
		if err != nil {
			// TODO fatalize
			log.Info().Msg("Wasn't able to save resource " + err.Error())
		}
		resource.id = id
	case http.MethodGet:
		// TODO read zipCode from body
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

func (s *Server) CharityHandler(w http.ResponseWriter, r *http.Request) {

	// Enable response for all access
	enableCors(&w)

	// Declare a new Charity struct.
	var charity Charity

	switch r.Method {
	case http.MethodPost:
		// Try to decode the request body into the struct. If there is an error,
		// respond to the client with the error message and a 400 status code.
		err := json.NewDecoder(r.Body).Decode(&charity)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		s.Logger.Info().Msg(fmt.Sprintf("We're adding this charity to the db: %+v", charity))
		id, err := s.ds.SaveCharity(charity)
		if err != nil {
			// TODO fatalize
			log.Info().Msg("Wasn't able to save charity " + err.Error())
		}
		charity.id = id
	case http.MethodGet:
		pid := 1
		res, err := s.ds.GetCharityByUser(pid)
		if err != nil {
			// TODO fatalize
			log.Info().Msg("Wasn't able to read charities " + err.Error())
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
