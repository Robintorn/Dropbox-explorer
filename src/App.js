import React, { Component } from 'react';
import { Dropbox } from 'dropbox';
import { parseQueryString } from './utils';

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
    };

  render() {
          // or your "App key" in Dropbox lingo.
    var CLIENT_ID = '2e9a5elj4q8ikcs'; 
  
      // note: This must correspond exactly to the redirect URI you've specified for your
      // Dropbox app.
    var dbx = new Dropbox({ clientId: CLIENT_ID });
    const authUrl = dbx.getAuthenticationUrl('http://localhost:3000/');
    return (
    <div className="container main">
    {localStorage.getItem('token') ? (
          <div id="authed-section">
          <button onClick={this.logOut}>Logout</button>
          <div>
            {}
          </div>
          </div>
    ) : (
      <div id="pre-auth-section">
      <a href={authUrl} id="authlink" className="button">Login</a>
    </div>
    )}
    </div>
    );
  }
}

export default App;
