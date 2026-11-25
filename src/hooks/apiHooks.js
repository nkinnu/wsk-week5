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

function useAuthentication() {
  async function postLogin(inputs) {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions,
    );

    return loginResult;
  }

  return postLogin;
}

function useUser() {
  async function getUserByToken(token) {
    const userResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );

    return userResult.user;
  }

  return {getUserByToken, postUser};
}

async function postUser(inputs) {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  };

  const registrationResult = await fetchData(
    import.meta.env.VITE_AUTH_API + '/users',
    fetchOptions,
  );

  return registrationResult;
}

export {useMedia, useAuthentication, useUser};
