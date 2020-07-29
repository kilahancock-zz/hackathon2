package main

import (
	"encoding/json"
	"net/http"
	"os"
	"io/ioutil"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/kelseyhightower/envconfig"
	"github.com/rs/zerolog"
)

var (
	l = zerolog.New(os.Stderr).With().Timestamp().Logger()
)

type Summary struct {
	Username string `json:"username"`
	Email string `json:"email"`
}

func main() {
	var cfg struct {
		DB struct {
			Host string `required:"true" split_words:"true"`
			User string `required:"true" split_words:"true"`
			Pass string `required:"true" split_words:"true"`
		}
	}

	if err := envconfig.Process("", &cfg); err != nil {
		l.Fatal().Err(err).Msg("error parsing config")
	}

	// initialize database
	db, err := newDB(cfg.DB.User, cfg.DB.Pass)
	if err != nil {
		l.Fatal().Err(err).Msg("could not create db connection")
	}
	err = db.Ping()
	if err != nil {
		l.Fatal().Err(err).Msg("unable to ping")
	}

	router := mux.NewRouter()

	router.HandleFunc("/health", func(w http.ResponseWriter, rr *http.Request) {
		enableCors(&w);
		_ = json.NewEncoder(w).Encode(map[string]interface{}{
			"healthy": "ok",
		})
	})

	router.HandleFunc("/login", func(w http.ResponseWriter, rr *http.Request) {
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
		// var su Summary;
		// err3 := json.Unmarshal(b, &su)
		// if err3 != nil {
		// 	l.Info().Msg("Error #3");
		// 	http.Error(w, err.Error(), http.StatusBadRequest)
		// 	return
		// }

		_ = json.NewEncoder(w).Encode(map[string]interface{}{
			"login": "ok",
			"username": string(b),
		})
	})

	l.Info().Msg("server running on port 3000")
	err = http.ListenAndServe(":3000", router)
	if err != nil {
		l.Fatal().Err(err).Msg("unable to start server")
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