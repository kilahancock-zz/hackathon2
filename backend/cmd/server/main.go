package main

import (
	"net/http"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

func main() {

	// Sleep to give enough time for SQL to start running
	time.Sleep(2*time.Second)

	server := NewServer()

	server.Logger.Info().Msg("server running on port 3000")
	err := http.ListenAndServe(":3000", server.Handler)
	if err != nil {
		server.Logger.Fatal().Err(err).Msg("unable to start server")
	}

	defer server.ds.db.Close()
}
