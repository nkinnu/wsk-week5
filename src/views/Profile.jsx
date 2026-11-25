import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';

function Profile() {
  const [user, setUser] = useState({});
  const {getUserByToken} = useUser();

  useEffect(() => {
    async function getUserInfo() {
      const token = localStorage.getItem('token');

      if (!token) {
        console.log('Token not found');
        return;
      }

      try {
        const userData = await getUserByToken(token);
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    }

    getUserInfo();
  }, []);

  return (
    <>
      <h2>{user.username}</h2>
      <ul>
        <li>Registered: {user.created_at}</li>
        <li>Email: {user.email}</li>
        <li>User level: {user.level_name}</li>
      </ul>
    </>
  );
}

export default Profile;
