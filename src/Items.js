import React, { Component } from 'react';
import { Dropbox } from 'dropbox';

const RenderItems = ({text}) => (
    <div>
      <p>
        {text.name}
      </p>
    </div>
  )

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

export default Items;