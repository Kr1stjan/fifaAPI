# FifaAPI
This API is going to provide updated data of teams for developers to create fun applications or just develop something for personal use. Teams are fetched from online and stored in MongoDB.

## Usage
For the app to work properly, MongoDB needs to be installed locally or an external mongo service used. Insert url into config/db.js. To populate the database call out GET /scrape route of the app.
```bash

# Install dependencies listed in package.json
$ npm install

# Run
$ node server.js

```
# API
----

| Route        | HTTP Verb           | Description  |
| ------------- |:-------------:| :-----|
| /teams      | GET | Get teams based on name, league, min rating or max rating |
| /teams      | POST      |   Post a team to database |

***Get Teams***
----
  Gets teams from the database
* **URL**
  /teams
* **Method:**
  `GET`
*  **URL Params**
   **Optional:**
    `name=[string]`
    `league=[string]`
    `min_rating=[integer]`
    `max_rating=[integer]`
* **Data Params**
    
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `{"filterdTeams": [{"name": "Bristol City","league": "FL Championship","overallRating": 70}]}`
* **Error Response:**
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/teams",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

**Add Team**
----
  Adds a single team to the database
* **URL**
  /teams
* **Method:**
  `POST`
*  **URL Params**
   None
* **Data Params**
  `name=[string]`
  `league=[string]`
  `rating=[integer]`
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `{ message : "Team created!" }`
* **Error Response:**
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
* **Sample Call:**

  ```javascript
  var team = { "name": "Manchester United", "league": "Barclays PL", "rating": 83 };
    $.ajax({
      url: "/teams",
      data: JSON.stringify(team),
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
  ```
