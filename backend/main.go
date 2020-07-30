package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/kelseyhightower/envconfig"
	"github.com/rs/zerolog"
	"io/ioutil"
	_ "io/ioutil"
	"log"
	_ "log"
	"net/http"
	_ "net/http"
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

	//printIDsFromTable("Test_Table")
	//hitAPI()

}

func hitAPI(){

	//Write first line
	err := ioutil.WriteFile("temp.txt", []byte("first line\n"), 0644)
	if err != nil {
		log.Fatal(err)
	}

	//Append second line
	file, err := os.OpenFile("temp.txt", os.O_APPEND|os.O_WRONLY, 0644)
	if err != nil {
		log.Println(err)
	}
	defer file.Close()
	if _, err := file.WriteString("second line\n"); err != nil {
		log.Fatal(err)
	}

	// A handy map of US state codes to full names
	var usa = map[string]string{
		"AL": "Alabama",
		"AK": "Alaska",
		"AZ": "Arizona",
		"AR": "Arkansas",
		"CA": "California",
		"CO": "Colorado",
		"CT": "Connecticut",
		"DE": "Delaware",
		"FL": "Florida",
		"GA": "Georgia",
		"HI": "Hawaii",
		"ID": "Idaho",
		"IL": "Illinois",
		"IN": "Indiana",
		"IA": "Iowa",
		"KS": "Kansas",
		"KY": "Kentucky",
		"LA": "Louisiana",
		"ME": "Maine",
		"MD": "Maryland",
		"MA": "Massachusetts",
		"MI": "Michigan",
		"MN": "Minnesota",
		"MS": "Mississippi",
		"MO": "Missouri",
		"MT": "Montana",
		"NE": "Nebraska",
		"NV": "Nevada",
		"NH": "New Hampshire",
		"NJ": "New Jersey",
		"NM": "New Mexico",
		"NY": "New York",
		"NC": "North Carolina",
		"ND": "North Dakota",
		"OH": "Ohio",
		"OK": "Oklahoma",
		"OR": "Oregon",
		"PA": "Pennsylvania",
		"RI": "Rhode Island",
		"SC": "South Carolina",
		"SD": "South Dakota",
		"TN": "Tennessee",
		"TX": "Texas",
		"UT": "Utah",
		"VT": "Vermont",
		"VA": "Virginia",
		"WA": "Washington",
		"WV": "West Virginia",
		"WI": "Wisconsin",
		"WY": "Wyoming",
		// Territories
		"AS": "American Samoa",
		"DC": "District of Columbia",
		"FM": "Federated States of Micronesia",
		"GU": "Guam",
		"MH": "Marshall Islands",
		"MP": "Northern Mariana Islands",
		"PW": "Palau",
		"PR": "Puerto Rico",
		"VI": "Virgin Islands",
		// Armed Forces (AE includes Europe, Africa, Canada, and the Middle East)
		"AA": "Armed Forces Americas",
		"AE": "Armed Forces Europe",
		"AP": "Armed Forces Pacific",
	}

	for k, _ := range usa{
		response, err := http.Get(fmt.Sprintf("https://api.data.charitynavigator.org/v2/Organizations" +
			"?app_id=%s&app_key=%s&causeID=18&state=%s",cfg.API.Id, cfg.API.Key, k))

		if err != nil {
			fmt.Print(err.Error())
			os.Exit(1)
		}

		responseData, err := ioutil.ReadAll(response.Body)
		if err != nil {
			log.Fatal(err)
		}

		if _, err := file.WriteString(string(responseData) + "\n"); err != nil {
			log.Fatal(err)
		}

	}


}

func printIDsFromTable(name string){

	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(localhost:3306)/testDB",cfg.DB.User,cfg.DB.Pass))
	if err != nil {
		panic(err)
	}

	defer db.Close()

	// TODO SQL injection prone - SQL X
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