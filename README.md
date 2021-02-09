#  API Front-end App

This application fetches numbers from reporting API and shows totals for time range on top of the page, daily numbers on middle table, and statistics graph in the below of the page. 

## Demo
The application is running in AWS S3, and it is available at
.


## Run locally

```
npm install
npm start
```

Before `npm start`, `npm install` should be done first to install dependant packages. Once `npm start` is executed successfully, application is running in http://localhost:3000.

## Used libraries

- react-bootstrap-table-next
- react-dates
- chart.js
- react-chartjs-2
- All the icons were imported from https://www.flaticon.com/

## Things to know
- To access reporting API, authorization token should be input in "access token" field.
- If you click on the title of the graph legend, you can activate/deactivate showing a certain graph.
- Table can be sorted according to Date by clicking the arrow next to table title Date
- If you come back to application later time, start date, end date and tokens that you typed as last are populated.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
