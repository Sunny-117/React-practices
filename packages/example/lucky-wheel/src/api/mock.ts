import  getUser from '../../mock/mock';

export const getUsers = async () => {
  try {
    const data = await fetch('/api/getuser', {});
    return data.json();
  }
  catch (err) {
    console.log(err);
  }
}