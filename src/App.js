import React, { Component } from 'react';
import { Dropbox } from 'dropbox';
import { parseQueryString } from './utils';

class App extends Component {

  componentDidMount() {
      // or your "App key" in Dropbox lingo.
      var CLIENT_ID = '2e9a5elj4q8ikcs'; 
  
      // note: This must correspond exactly to the redirect URI you've specified for your
      // Dropbox app.
      var REDIRECT_URI = 'http://localhost:3000';
  
      // Parses the url and gets the access token if it is in the urls hash
      function getAccessTokenFromUrl() {
       return parseQueryString(window.location.hash).access_token;
      }
  
      // If the user was just redirected from authenticating, the urls hash will
      // contain the access token.
      function isAuthenticated() {
        // note: !! is not an operator, rather it's a "double negation" to convert a falsy or truthy
        // value to it boolean equivalent (false/true). The statement below is equivalent to:
        //
        // return !getAccessTokenFromUrl() ? false : true;
  
        return localStorage.setItem('token', JSON.stringify(getAccessTokenFromUrl()));
      }
  
      // This example keeps both the authenticate and non-authenticated setions
      // in the DOM and uses this function to show/hide the correct section.
      function showPageSection(elementId) {
        document.getElementById(elementId).style.display = 'block';
      }
  
      if (isAuthenticated()) {
        showPageSection('authed-section');
        var dbx = new Dropbox({ accessToken: getAccessTokenFromUrl() });
      } else {
        showPageSection('pre-auth-section');
  
        // Set the login anchors href using dbx.getAuthenticationUrl()
        var dbx = new Dropbox({ clientId: CLIENT_ID });
        var authUrl = dbx.getAuthenticationUrl(REDIRECT_URI);
        document.getElementById('authlink').href = authUrl;
      }

  }

  render() {
    return (
  <div className="container main">
    <div id="pre-auth-section">
      <a href="" id="authlink" className="button">Login</a>
    </div>

    <div id="authed-section">
    </div>
  </div>
    );
  }
}

export default App;
