package main

import (
	"database/sql"
	"net/http"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/kelseyhightower/envconfig"
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

// To refactor
var DB *sql.DB

type Summary struct {
	Username string `json:"username"`
	Email string `json:"email"`
}

func main() {

	if err := envconfig.Process("", &cfg); err != nil {
		l.Fatal().Err(err).Msg("error parsing config")
	}

	// Sleep to give enough time for SQL to start running
	time.Sleep(2*time.Second)
	// initialize database
	var err error
	DB, err = newDB(cfg.DB.User, cfg.DB.Pass)
	if err != nil {
		l.Fatal().Err(err).Msg("could not create db connection")
	}
	err = DB.Ping()
	if err != nil {
		l.Fatal().Err(err).Msg("unable to ping")
	}

	router := mux.NewRouter()

	router.HandleFunc("/health", Health)
	router.HandleFunc("/login", Login)
	router.HandleFunc("/signup",PersonCreate)
	router.HandleFunc("/resource", Resource)

	l.Info().Msg("server running on port 3000")
	err = http.ListenAndServe(":3000", router)
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
