package nutrishare

import (
	"encoding/json"
	"fmt"
	"net/http"
)

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
