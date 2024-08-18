import React from 'react';
import { useRoutes } from 'react-router-dom';
import Login from './components/Auth/Login';
import { AuthProvider } from './components/Auth/AuthContext';
import RestaurantList from './components/Restaurants/RestaurantList';
import Signup from './components/Auth/Signup';
import HomePage from './components/Restaurants/Restaurant';
import RestaurantDetail from './components/Restaurants/RestaurantDetail';
import WriteReviewPage from './components/Restaurants/WriteReviewPage'; 
import SuccessPage from './components/Restaurants/SuccessPage';
import OwnerDashboard from './components/Restaurants/OwnerDashboard';
import UploadImagePage from './components/Restaurants/UploadImagePage';

export default function App() {
  let element = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/home', element: <HomePage /> },
    { path: '/detail/:restaurantId', element: <RestaurantDetail /> },
    { path: '/detail/:restaurantId/write-review', element: <WriteReviewPage /> },
    { path: '/detail/:restaurantId/upload-photo', element: <UploadImagePage /> },
    { path: '/detail/write-review/success', element: <SuccessPage />},
    { path: '/list', element: <RestaurantList /> },
    { path: '/start-business', element: <OwnerDashboard /> },
    { path: '/login', element: <Login /> },
    { path: 'signup', element: <Signup />}
  ]);

  return (
    <AuthProvider>
      {element}
    </AuthProvider>
  );
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
