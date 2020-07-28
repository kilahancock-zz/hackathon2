package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/kelseyhightower/envconfig"
	"github.com/rs/zerolog"
	"io/ioutil"
	"log"
	"net/http"
	"os"
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
	API struct {
		Id string `required:"true" split_words:"true"`
		Key string `required:"true" split_words:"true"`
	}
}

func main() {

	if err := envconfig.Process("", &cfg); err != nil {
		l.Fatal().Err(err).Msg("error parsing config")
	}

	printIDsFromTable("Test_Table")
	//hitAPI()

}

func hitAPI(){
	state := "NC"
	response, err := http.Get(fmt.Sprintf("https://api.data.charitynavigator.org/v2/Organizations" +
		"?app_id=%s&app_key=%s&causeID=18&state=%s",cfg.API.Id, cfg.API.Key, state))

	if err != nil {
		fmt.Print(err.Error())
		os.Exit(1)
	}

	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(string(responseData))
}

func printIDsFromTable(name string){

	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(localhost:3306)/testDB",cfg.DB.User,cfg.DB.Pass))
	if err != nil {
		panic(err)
	}

	defer db.Close()

	// TODO SQL injection prone
	rows, err := db.Query("SELECT * from " + name)
	if err != nil{
		panic(err)
	}

	defer rows.Close()

	var id int

	for rows.Next() {
		rows.Scan(&id)
		fmt.Printf("%d\n", id)
	}
}