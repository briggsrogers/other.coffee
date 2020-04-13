import axios from "axios";

const AIRTABLE_URL = 'https://api.airtable.com/v0/appSZqziDUsRsJFv6/pourover-db?maxRecords=100&view=Grid%20view'

export const getEntries = (onSuccess) => {
  axios
    .get(AIRTABLE_URL, 
      { 
        headers: {
          "Authorization": "Bearer key7QpnzX5Kw0bc6V"
        } 
      })
    .then(function(response) {
      // handle success
      if (response.status === 200) {
        onSuccess(response.data.records);
      }

    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .then(function() {
      // always executed
    });

  
};
