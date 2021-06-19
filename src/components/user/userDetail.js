import { useState } from 'react';

export default function UserDetails() {
  const getUser = () => {
    const userString = localStorage.getItem('user');
    const userData = JSON.parse(userString);
    return userData
  };

  const saveUser = user => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  return {
    setUser: saveUser,
    user: getUser
  }
}