import React, { Component } from 'react';
import { Dropbox } from 'dropbox';
import { parseQueryString } from './utils';

// Components

import Items from './Items';

const RenderIfLoggedin = ({logout}) => (
  <div>
  <button className="logout" onClick={logout}>Logout</button>
  </div>
)

const RenderIfLoggedOut = () => (
  <div className="grid-login">
    <div className="login">
    <a onClick={() => name()}>Login</a>
    </div>
  </div>
)

const name = () => {
      // or your "App key" in Dropbox lingo.
      const CLIENT_ID = '2e9a5elj4q8ikcs'; 
      
          // note: This must correspond exactly to the redirect URI you've specified for your
          // Dropbox app.
      const dbx = new Dropbox({ clientId: CLIENT_ID });
      window.location = dbx.getAuthenticationUrl('https://react-dropbox-explorer-fefef.firebaseapp.com/');
}

class App extends Component {

  componentDidMount() {
    let token;
    if (localStorage.getItem('token')) {
        token = localStorage.getItem('token');
    } else {
        token = parseQueryString(window.location.hash).access_token;
        if (!token) {
            return;
        }
        localStorage.setItem('token', token);

        window.location.replace('https://react-dropbox-explorer-fefef.firebaseapp.com');
    }
  }

  logOut = () => {
        localStorage.removeItem('token');
        window.location.replace('https://react-dropbox-explorer-fefef.firebaseapp.com');
    };

  render() {
    return (
    <div className="App">
    {localStorage.getItem('token') ? (
    <div>
    <RenderIfLoggedin logout={this.logOut}/>
    <Items />
    </div>
    )
      : (
      <div>
      <RenderIfLoggedOut />
    </div>
    )}
    </div>
    );
  }
}

export default App;
