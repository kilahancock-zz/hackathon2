package nutrishare

import (
	"encoding/json"
	"net/http"
)

func main() {
	
}

func Stuff(){

}

func Health(w http.ResponseWriter, r *http.Request) {
	_ = json.NewEncoder(w).Encode(map[string]interface{}{
		"healthy": "ok",
	})
}

func Login(w http.ResponseWriter, r *http.Request) {
	var p []byte

	r.Body.Read(p)

	_ = json.NewEncoder(w).Encode(map[string]interface{}{
		"got": string(p),
	})
}
