package main

import (
	"database/sql"
	"github.com/gorilla/mux"
	"github.com/kelseyhightower/envconfig"
	"github.com/rs/zerolog"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

type Server struct {
	ds DataStore
	http.Handler
	zerolog.Logger
}

type DataStore struct {
	db *sql.DB
	zerolog.Logger
}

var cfg struct {
	DB struct {
		Host string `required:"true" split_words:"true"`
		User string `required:"true" split_words:"true"`
		Pass string `required:"true" split_words:"true"`
	}
}

func NewServer() *Server{
	s := new(Server)
	s.Logger = zerolog.New(os.Stderr).With().Timestamp().Logger()

	// Populate config (cfg)
	if err := envconfig.Process("", &cfg); err != nil {
		s.Logger.Fatal().Err(err).Msg("error parsing config")
	}

	s.ds = DataStore{db:initDB(&s.Logger),Logger:s.Logger}

	router := mux.NewRouter()

	router.HandleFunc("/health", s.Health)
	router.HandleFunc("/login", s.Login)
	router.HandleFunc("/signup", s.PersonCreate)
	router.HandleFunc("/getCharities", s.GetCharities)
	router.HandleFunc("/postCharity", s.PostCharity)
	router.HandleFunc("/getResources", s.GetResources)
	router.HandleFunc("/postResource", s.PostResource)

	s.Handler = router

	return s
}

func initDB(logger *zerolog.Logger) *sql.DB{

	// initialize database
	db, err := newDB(cfg.DB.User, cfg.DB.Pass)
	if err != nil {
		logger.Fatal().Err(err).Msg("could not create db connection")
	}
	err = db.Ping()
	if err != nil {
		logger.Fatal().Err(err).Msg("unable to ping")
	}

	return db
}