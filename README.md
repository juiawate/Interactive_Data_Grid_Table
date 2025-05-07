# Interactive Data Grid

This is an interactive data grid component where based on provided data, the cell renders the corresponding display.
Framework used: `node.js`, `ReactJS`, `Typescript`, `Bootstrap`, `react-select`

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
- Currently, it is static data stored in a json file in `backend` folder.
- The json data should also provide the columnSchema in order to have the columns render automatically.
- The users list is populated based on users.json which should also be provided by backend.
- The cellRenderer function is supported for `string`, `number`, `date`, `list` types.

# Future Enhancements

- More types can be added in cellRenderer based on customer's requirement.
- Tables can have more capabilities like `sorting`, `filtering`, `column visibility`.
- Provide `delete` functionality with popup modal.
