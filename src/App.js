import React, { Component } from 'react';
import { Dropbox } from 'dropbox';
import { parseQueryString } from './utils';

const RenderIfLoggedin = ({logout}) => (
  <div>
  <button onClick={logout}>Logout</button>
  </div>
)

const RenderIfLoggedOut = () => (
  <a onClick={() => name()}>Login</a>
)

const name = () => {
      // or your "App key" in Dropbox lingo.
      var CLIENT_ID = '2e9a5elj4q8ikcs'; 
      
          // note: This must correspond exactly to the redirect URI you've specified for your
          // Dropbox app.
      var dbx = new Dropbox({ clientId: CLIENT_ID });
      window.location = dbx.getAuthenticationUrl('http://localhost:3000/');
}

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let token;
    if (localStorage.getItem('token')) {
        token = localStorage.getItem('token');

    } else {
        token = parseQueryString(window.location.hash).access_token;
        if (!token) {
            return;
        }
        localStorage.setItem('token', JSON.stringify(token));

        // After saving the token - remove the token from URL
        window.location.replace('http://localhost:3000');
    }
  }

  logOut = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

  render() {
    return (
    <div className="App">
    {localStorage.getItem('token') ? <RenderIfLoggedin logout={this.logOut}/>
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
