# Twitter Express Server API

This repository provides the code for a Twitter-like Express server.

The server features several routes that mimic core Twitter functionalities like listing all users, fetching a specific user by their ID, adding new tweets, and fetching tweets.

## Routes

The following routes are available:

| Method | Path                          | Description                                 |
| ------ | ----------------------------- | ------------------------------------------- |
| GET    | /users/list                   | Lists all users                             |
| GET    | /users/listone?id=userid      | Lists a specific user by their ID           |
| POST   | /posts/add                    | Adds a tweet with text and owner            |
| GET    | /posts/list                   | Lists all tweets                            |
| GET    | /posts/listone?id=postid      | Lists a specific tweet by its ID            |
| GET    | /posts/search?text=sometext   | Lists tweets that match the search criteria |
| GET    | /posts/listbyuser?user=userid | Lists all tweets for a specific user        |

## Sample Outputs

Here are some example outputs from these endpoints:

1. GET /users/list

   ```
   [
   {
   "\_id": "615cefd72b3e8272f6c87510",
   "username": "user10",
   "email": "user10@example.com",
   "age": 26,
   "city": "Johannesburg",
   "country": "South Africa",
   "gender": "Female",
   "hobbies": ["dancing", "traveling"]
   },
   // more users
   ]
   ```

2. GET /users/listone?id=615cefd72b3e8272f6c87510

```
{
    "_id": "615cefd72b3e8272f6c87510",
    "username": "user10",
    "email": "user10@example.com",
    "age": 26,
    "city": "Johannesburg",
    "country": "South Africa",
    "gender": "Female",
    "hobbies": ["dancing", "traveling"]
}
```

3. POST /posts/add
   Request body:

```
{
    "owner": "615cefd72b3e8272f6c87510",
    "text": "Just finished reading a great book!"
}
```

4. GET /posts/list

```
[
    {
        "_id": "615cf0362b3e8272f6c87511",
        "owner": "615cefd72b3e8272f6c87501",
        "text": "Just finished reading a great book!",
        "date": "2023-05-19T10:00:00Z"
    },
    // more tweets
]
```

5. GET /posts/listone?id=615cf0362b3e8272f6c87511

```
{
    "_id": "615cf0362b3e8272f6c87511",
    "owner": "615cefd72b3e8272f6c87501",
    "text": "Just finished reading a great book!",
    "date": "2023-05-19T10:00:00Z"
}
```

6. GET /posts/search?text=book

```
[
    {
        "_id": "615cf0362b3e8272f6c87511",
        "owner": "615cefd72b3e8272f6c87501",
        "text": "Just finished reading a great book!",
        "date": "2023-05-19T10:00:00Z"
    },
    // more tweets
]
```

7. GET /posts/listbyuser?user=615cefd72b3e8272f6c87510

```
[
    {
        "_id": "615cf0362b3e8272f6c87511",
        "owner": "615cefd72b3e8272f6c87510",
        "text": "Just finished reading a great book!",
        "date": "2023-05-19T10:00:00Z"
    },
    // more tweets
]
```

## Sample Usage

You can use these endpoints in your code using the fetch API, Axios or any other method of making HTTP requests.

Here is an example using the fetch API in JavaScript:

`fetch('http://localhost:3000/users/list')`
