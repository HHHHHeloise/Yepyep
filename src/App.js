import React from 'react';
import { useRoutes } from 'react-router-dom';
import Login from './components/Auth/Login';
import RestaurantList from './components/Restaurants/RestaurantList';
import Signup from './components/Auth/Signup';
import HomePage from './components/Restaurants/Restaurant';
import DetailPage from './components/Restaurants/RestaurantDetail';

export default function App() {
  let element = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/home', element: <HomePage /> },
    { path: '/detail', element: <DetailPage /> },
    { path: '/list', element: <RestaurantList /> },
    { path: '/login', element: <Login /> },
    { path: 'signup', element: <Signup />}
  ]);

  return element;
}

const Search = () => {
  return <form style={{ margin: '10px', borderColor: 'black' }}>
    <input />
    <button>submit</button>
  </form>;
}

const Home = () => {
  return <div>
    <Search />
    <Search />
    <article>
      <h1>Hi</h1>
      <ol>
        <li>Components: UI Building Blocks</li>
        <li>Defining a Component</li>
        <li>Using a Component</li>
      </ol>
    </article>
  </div>;
}
