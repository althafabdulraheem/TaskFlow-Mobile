import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = 'http://127.0.0.1:8000/api';

const getToken = async () => {
  const token = await AsyncStorage.getItem('token'); 
  return token;
};

export const fetchTasks = async () => {
  const token = await getToken();

  const res = await fetch(`${BASE_URL}/tasks`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  return res.json();
};

export const addTask = async (task) => {
  const token = await getToken();

  const res = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

  return res.json();
};

export const updateTask = async (id, task) => {
  const token = await getToken();

  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

  return res.json();
};

export const deleteTask = async (id) => {
  const token = await getToken();

  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return res.json();
};

export const toggleComplete = async (id, completed) => {
  console.log(completed)
  const token = await getToken();
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
   headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ completed }),
  });
 
  return res.json();

};
