import React from 'react';
import './App.css';
import client from './connection/client';
import { ApolloProvider } from '@apollo/client';
import Padre from './components/padre'
export default function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
      <Padre></Padre>
      </ApolloProvider>
      
    </div>
  );
}
