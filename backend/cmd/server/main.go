package main

import (
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/kelseyhightower/envconfig"
	"github.com/kilahancock/hackathon2/backend/routes"
	"github.com/rs/zerolog"
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
type Summary struct {
	Username string `json:"username"`
	Email string `json:"email"`
}

func main() {

	if err := envconfig.Process("", &cfg); err != nil {
		l.Fatal().Err(err).Msg("error parsing config")
	}

	router := mux.NewRouter()

	router.HandleFunc("/health", nutrishare.Health)
	router.HandleFunc("/login", nutrishare.Login)
	router.HandleFunc("/signup", nutrishare.PersonCreate)
	router.HandleFunc("/resource", nutrishare.Resource)

	l.Info().Msg("server running on port 3000")
	err := http.ListenAndServe(":3000", router)
	if err != nil {
		l.Fatal().Err(err).Msg("unable to start server")
	}
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

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type")
	(*w).Header().Set("Content-Type", "application/json")
}