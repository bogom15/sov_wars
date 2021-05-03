import React from 'react';

import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import './App.css';

const GET_PEOPLE = gql`
  {
    people {
      name
      birth_year
      height
      mass
      hair_color
      gender
    }
  }
`;

const Person = ({ person: { name, height, mass, gender }}) => (
  <div className="content-wrapper">
    <div className="ui card">
      <div className="content card-content-title">
        <div className="header">{name}</div>
      </div>
      <div className="content card-content-inner">
        <div className="ui small feed">
          <div className="event">
            <div className="content">
              <div className="summary inner-info">
                 Height: {height}
              </div>
            </div>
          </div>
          <div className="event">
            <div className="content">
              <div className="summary inner-info">
                 Mass: {mass}
              </div>
            </div>
          </div>
          <div className="event">
            <div className="content">
              <div className="summary inner-info">
              </div>
            </div>
          </div>
          <div className="event">
            <div className="content">
              <div className="summary inner-info">
                 Gender: {gender}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const App = () => {
  const { loading, error, data } = useQuery(GET_PEOPLE);

  if(error) return <h1 style={{color: 'white'}}>something is not quite right buddy</h1>
  if(error) return console.log(error);
  if(loading) return <h1 style={{color: 'white'}}>Loading...</h1>

  return (
    <main className="app-wrapper">
      <h2 className="ui center aligned icon header">
        <i className="circular film icon app-logo"></i>
        <span className="app-header">People from Star wars</span>
      </h2>

      {data.people.map(person => (
        <Person person={person} />
      ))}
    </main>
  )
}

export default App;
