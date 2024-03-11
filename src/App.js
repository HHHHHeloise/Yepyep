import React from 'react';
import { useRoutes } from 'react-router-dom';
import Login from './components/Auth/Login';
import RestaurantList from './components/Restaurants/RestaurantList';
import Signup from './components/Auth/Signup';
import HomePage from './components/Restaurants/Restaurant';

export default function App() {
  let element = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/home', element: <HomePage /> },
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


class Resaurant extends React.Component {
  render() {
    const restaurantCoverUrl = "https://media.cntraveler.com/photos/5a9488dba566be4ab1b4696c/4:3/w_3556,h_2667,c_limit/Gioia-Pizzeria_SORAYA-MATOS_2018__MG_1278.jpg";
    return <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
      <div>
        <img src={restaurantCoverUrl} height={80} alt="" />
      </div>
      <div style={{ border: 'solid', borderWidth: 0.5, borderRadius: 20, padding: '5px', margin: '10px', width: '200px' }}>
        <div>{this.props.index}: {this.props.name}</div>
        <div>{this.props.rating}</div>
        <div>{this.props.city}</div>
      </div>
    </div>
  }
}

class RestaurantListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    };
  }

  componentDidMount() {
    // fetch restaurant data from server
    const restaurants = [
      {
        name: 'Pizza',
        rating: 4.5,
        city: 'Beijing'
      },
      {
        name: 'Pizza2',
        rating: 4.7,
        city: 'Beijing'
      },
    ];
    this.setState({ restaurants: restaurants })
  }

  render() {
    return <div>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <h1>listing page</h1>
      </div>

      {this.state.restaurants.map((rest, i) => <Resaurant index={i} name={rest.name} rating={rest.rating} city={rest.city} />)}
    </div>
  }
}