# froker-submission-2129158
 
## Technology used
- **Frontend:** React.js, NextJs,TailwindCSS,Axios
- **Backend:** Node.js, Express.js, PostmanAPI(tool)
- **Database:** MongoDb
- **Authentication:** JSON Web Tokens (JWT)
- **Communication:** RESTful API
- **Version Control:** Git & Github

## Contributing

- Fork the repository.
- Create a new branch (git checkout -b feature/your-feature).
- Make your changes.
- Commit your changes (git commit -m 'your_message').
- Push to the branch (git push origin feature/your-feature).
Create a new Pull Request.

## Installation

Prerequisites:

- Node.js should be installed on your machine
- Postgres should be installed on your machine

### Steps:
- Fork the Repo to your account
- Clone the Repo
```bash
git clone https://github.com/<username>/froker.git
```
- Install dependencies for frontend and run
```bash
  cd my-app
  npm install
  npm run dev
```
the frontend will start running on http://localhost:3000/blog

- Install dependencies for backend and run
```bash
  cd backend
  npm install
  npm start
```
the backend will start running on http://localhost:4000/

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- Inside backend Directory

`POSTGRES_URL`
`JWT_SECRET`
`JWT_EXPIRES_IN`  
`JWT_COOKIE_EXPIRES_IN` 
`CLIENT_ID`
`CLIENT_SECRET`
`CLIENT_URL`

## Checkout the backend directory for more
