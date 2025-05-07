# Interactive Data Grid

==========================

This is an interactive data grid component where based on provided data, the cell renders the corresponding display.

# To run the project locally

1. Clone the repository locally on your machine.
2. To run web server
   - `cd backend`
   - Run `npm install`
   - Run `npm run dev`
3. To start frontend
   - `cd frontend`
   - Run `npm install`
   - Run `npm start`
4. Go to `http://localhost:3000/`

# Current Assumptions

- The api hosted by node.js server will provide the required InputData.
- Currently, it is static data stored in a json file.
- The json data should also provide the columnSchema in order to have the columns render automatically
- The users list is populated based on users.json which should also be provided by backend.
