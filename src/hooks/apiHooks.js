import {useState, useEffect} from 'react';
import {fetchData} from '../utils/fetchData';

function useMedia() {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    async function getMedia() {
      try {
        const json = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');

        const newArray = await Promise.all(
          json.map(async (item) => {
            const user = await fetchData(
              import.meta.env.VITE_AUTH_API + '/users/' + item.user_id,
            );

            return {...item, username: user.username};
          }),
        );

        setMediaArray(newArray);
      } catch (error) {
        console.error(error);
      }
    }

    getMedia();
  }, []);

  return {mediaArray};
}

export {useMedia};
