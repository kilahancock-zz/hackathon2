package main

import (
	"encoding/json"
	//"encoding/json"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/kelseyhightower/envconfig"
	"github.com/rs/zerolog"
	"github.com/kilahancock/hackathon2/backend/routes"

)

var (
	l = zerolog.New(os.Stderr).With().Timestamp().Logger()
)

var cfg struct {
	DB struct {
		Host string `required:"true" split_words:"true"`
		User string `required:"true" split_words:"true"`
		Pass string `required:"true" split_words:"true"`
	}
}

func main() {

	if err := envconfig.Process("", &cfg); err != nil {
		l.Fatal().Err(err).Msg("error parsing config")
	}

	router := mux.NewRouter()

	router.HandleFunc("/health", nutrishare.Health)

	router.HandleFunc("/login", nutrishare.Login)

	l.Info().Msg("server running on port 3000")
	err := http.ListenAndServe(":3000", router)
	if err != nil {
		l.Fatal().Err(err).Msg("unable to start server")
	}
}

func Login(w http.ResponseWriter, r *http.Request) {
	var p []byte

	r.Body.Read(p)

	_ = json.NewEncoder(w).Encode(map[string]interface{}{
		"got": string(p),
	})
}

func initDB(){
	// initialize database
	db, err := newDB(cfg.DB.User, cfg.DB.Pass)
	if err != nil {
		l.Fatal().Err(err).Msg("could not create db connection")
	}
	err = db.Ping()
	if err != nil {
		l.Fatal().Err(err).Msg("unable to ping")
	}
}
