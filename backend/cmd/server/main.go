package main

import (
	"encoding/json"
	"net/http"
	"os"
	"io/ioutil"

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

	router.HandleFunc("/healthk", func(w http.ResponseWriter, rr *http.Request) {
		enableCors(&w);
		_ = json.NewEncoder(w).Encode(map[string]interface{}{
			"healthy": "ok",
		})
	})

	router.HandleFunc("/logink", func(w http.ResponseWriter, rr *http.Request) {
		enableCors(&w);
		// var test_summary Summary;
		// err := json.NewDecoder( rr.Body ).Decode( &test_summary );
		// if err != nil {
		// 	l.Info().Msg( "failed decoder" );
		// 	panic(err);
		// }
		// l.Info().Msg( test_summary.Username );
		// l.Info().Msg( test_summary.Email );

		// ! This here worked, but couldn't unmarshall correctly
		b, err := ioutil.ReadAll(rr.Body)
		if err != nil {
			panic(err)
		}
		// "message":"{\"username\":\"b\",\"email\":\"a@gmail.com\"}"}
		l.Info().Msg(string(b));

		// TODO: Figure out how to write body into a struct
		var data map[string]interface{}
		err3 := json.Unmarshal(b, &data)
		if err3 != nil {
			l.Info().Msg("Error #3");
			panic(err3)
		}

		_ = json.NewEncoder(w).Encode(map[string]interface{}{
			"login": "ok",
			"username": data,
		})
	})

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

// ! New Implementation
/*
decoder := json.NewDecoder( rr.Body );
decoder.DisallowUnknownFields();

var test_summary Summary;
err2 := decoder.Decode( &test_summary );
if err2 != nil {
	l.Info().Msg( "failed decoder" );
	panic(err2);
}
l.Info().Msg( test_summary.Username );
l.Info().Msg( test_summary.Email );
*/