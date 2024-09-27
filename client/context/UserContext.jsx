import React, { createContext, useReducer } from 'react';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || '',
};

const UserContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload.user, token: action.payload.token };
    case 'LOGOUT':
      return { ...state, user: null, token: '' };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = (user, token) => {
    localStorage.setItem('token', token);
    dispatch({ type: 'LOGIN', payload: { user, token } });
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <UserContext.Provider value={{ user: state.user, token: state.token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
