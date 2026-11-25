import {useUser} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';

function RegisterForm({setDisplayLogin}) {
  const {postUser} = useUser();

  const initValues = {
    username: '',
    email: '',
    password: '',
  };

  async function doRegister(formData) {
    try {
      const result = await postUser(formData);
      console.log('Registration result:', result);
      setDisplayLogin(true);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }

  const {handleInputChange, handleSubmit} = useForm(doRegister, initValues);

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reguser">Username</label>
          <input
            name="username"
            type="text"
            id="reguser"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="regemail">Email</label>
          <input
            name="email"
            type="email"
            id="regemail"
            onChange={handleInputChange}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="regpassword">Password</label>
          <input
            name="password"
            type="password"
            id="regpassword"
            onChange={handleInputChange}
            autoComplete="new-password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default RegisterForm;
