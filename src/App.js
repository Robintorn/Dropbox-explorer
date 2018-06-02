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

const RenderItems = ({text}) => (
  <div>
    <p>
      {text.name}
    </p>
  </div>
)

const name = () => {
      // or your "App key" in Dropbox lingo.
      var CLIENT_ID = '2e9a5elj4q8ikcs'; 
      
          // note: This must correspond exactly to the redirect URI you've specified for your
          // Dropbox app.
      var dbx = new Dropbox({ clientId: CLIENT_ID });
      window.location = dbx.getAuthenticationUrl('http://localhost:3000/');
}

class Items extends Component {
  constructor() {
    super();

    this.state = {
      items: []
    }
  }

  componentWillMount() {
    let dbx = new Dropbox({ accessToken: "BW7-qRPIdfAAAAAAAAAAqOmgydS8vuJdIJja8Wz3Xx00_gpmTnRsSQBMfkrKVXA_" });
    dbx.filesListFolder({path: ''})
    .then((response) => this.onClick(response.entries))
    .catch((error) => {
      console.error(error);
    });
  }

  onClick = (response) => {
    this.setState({
      items: response
    })
  }

  render(){
  return(
    <div>
      {this.state.items.map((item) => {
        return(
          <RenderItems key={item.id} text={item}/>
        )
      })}
    </div>
  )
}
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
