import { useState, useEffect } from 'react';
import axios from "axios";

const GetUserInformation = (length) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      axios.get(`http://localhost:8081/user/allUserInformation`)
            .then((response) => {
              setData(response.data);
              setLoading(false);
            }).catch(error => {
              console.log(error);
              setError(error);
            });
          }, [length]);

    if(error) return `Error: ${error.message}`;
    return [data, loading]

}

export default GetUserInformation;