import React, { Component } from 'react';
import './App.css';
const medRecStyle = {
  textAlign: 'left'
}
const warningStyle = {
  color: 'red'
}
const emailInput = {
  width: 250,
  margin: 10,
  height: 25
}


class App extends Component {
  state = {};

  handleChange = (e) => {
    const dataLabel = e.target.placeholder;
    this.setState({ [dataLabel]: e.target.value })
  }

  handleMedRecChange = (e) => {
    const { placeholder, value } = e.target;
    let dataLabel = placeholder;
    switch(placeholder) {
      case 'state':
        dataLabel = 'medState'
        break;
      case 'expirationDate':
        dataLabel = 'medExpirationDate'
        break;
      case 'imageUrl':
        dataLabel = 'medImageUrl'
        break;
    }
    this.setState({ [dataLabel]: value })
  }

  handleGovIdChange = (e) => {
    const { placeholder, value } = e.target;
    let dataLabel = placeholder;
    switch(placeholder) {
      case 'state':
        dataLabel = 'govIdState'
        break;
      case 'expirationDate':
        dataLabel = 'govIdExpirationDate'
        break;
      case 'imageUrl':
        dataLabel = 'govIdImageUrl'
        break;
    }
    this.setState({ [dataLabel]: value })
  }
  
  submitUser = async e => {
    e.preventDefault();
    const { name, email, birthday } = this.state;
    const response = await fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, birthday }),
    });
    const body = await response.json();
    
    this.setState({ user: body });
  };

  submitMedRec = async e => {
    try {
      e.preventDefault();
      const { medRecId, issuer, medState, medExpirationDate, medImageUrl, user } = this.state;
      const response = await fetch('/medRecs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          medRecId,
          issuer, 
          state: medState, 
          expirationDate: medExpirationDate, 
          imageUrl: medImageUrl,
          user_id: user.id
        }),
      });
      const body = await response.json();
      if (body.hasOwnProperty('error')) {
        this.setState({ medRecMsg: body.error });
      } else {
        this.setState({ medRec: body });
      }
    } catch(err) {
      console.log(err);
    }
  };

  submitId = async e => {
    try {
      e.preventDefault();
      const { governmentId, govIdState, govIdExpirationDate, govIdImageUrl, user } = this.state;
      const response = await fetch('/governmentIds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          governmentIdNumber: governmentId, 
          state: govIdState, 
          expirationDate: govIdExpirationDate, 
          imageUrl: govIdImageUrl,
          user_id: user.id
        }),
      });
      const body = await response.json();
      if (body.hasOwnProperty('error')) {
        this.setState({ govIdMsg: body.error });
      } else {
        this.setState({ id: body });
      }
    } catch(err) {
      console.log(err);
    }
  };

  updateUser = async e => {
    e.preventDefault();
    const { name, email, birthday, user } = this.state;
    const response = await fetch('/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, birthday, id: user.id, createdAt: new Date(), updatedAt: new Date() }),
    });
    const body = await response.json();
    console.log(body);
    this.setState({ user: body });
  };

  updateMedRec = async e => {
    e.preventDefault();
    const { medRecId, issuer, medState, medExpirationDate, medImageUrl, medRec } = this.state;
    const response = await fetch('/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ medRecId, issuer, state: medState, expirationDate: medExpirationDate, imageUrl: medImageUrl, id: medRec.id, createdAt: new Date(), updatedAt: new Date() }),
    });
    const body = await response.json();
    console.log(body);
    this.setState({ user: body });
  };

  updateGovernmentId = async e => {
    e.preventDefault();
    const { governmentId, govIdState, govIdExpirationDate, govIdImageUrl, id } = this.state;
    const response = await fetch('/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ governmentIdNumber: governmentId, state: govIdState, expirationDate: govIdExpirationDate, imageUrl: govIdImageUrl, id: id.id, createdAt: new Date(), updatedAt: new Date() }),
    });
    const body = await response.json();
    console.log(body);
    this.setState({ user: body });
  };

  checkEmail = async e => {
    try {
      e.preventDefault();
      const { email } = this.state;
      const user = await fetch(`/users?email=${email}`).then(res => res.json()).then(result => result);
      if (user.hasOwnProperty('error')) {
        this.setState({ medRecMsg: user.error });
        // fetch(`/medRecs?user_id=${user.id}`).then(res => res.json()).then(result => this.setState({ medRec: result }));
        // fetch(`/governmentIds?id=${user.government_id}`).then(res => res.json()).then(result => this.setState({ id: result }));
      } else {
        this.setState({ user, medRec: user.medRec });
      }
    } catch(err) {
      this.setState({ newUser: true });
    }
  };

  deleteUser = async e => {
    try {
      e.preventDefault();
      const { user } = this.state;
      await fetch(`/users?id=${user.id}`, {
        method: 'DELETE'
      });
      alert('User Deleted');
      this.setState({ user: {} });
    } catch(err) {
      console.log(err);
    }
  }

  deleteMedRec = async e => {
    try {
      e.preventDefault();
      const { medRec } = this.state;
      await fetch(`/medRecs?id=${medRec.id}`, {
        method: 'DELETE'
      });
      alert('Medical Recommendation Deleted');
      this.setState({ medRec: {} });
    } catch(err) {
      console.log(err);
    }
  }

  deleteId = async e => {
    try {
      e.preventDefault();
      const { id } = this.state;
      await fetch(`/governmentIds?id=${id.id}`, {
        method: 'DELETE'
      });
      alert('ID deleted');
      this.setState({ id: {} });
    } catch(err) {
      console.log(err);
    }
  }

render() {
    return (
      <div className="App">
          <p className="App-header">
            Setup Medical Recommendation and ID
          </p>
        <p>{this.state.response}</p>
        {/* {!this.state.newUser ?
          <form onSubmit={this.checkEmail}>
            <p>
              <strong>Enter Your Email To Begin</strong>
            </p>
            <input
              type="text"
              placeholder={'email'}
              onChange={this.handleChange}
              style={emailInput}
            />
            <button type="submit">Submit</button>
          </form> : <p><strong>Looks like user wasn't found, Please Sign Up By Following the Steps</strong></p>
        } */}
        {/* {this.state.newUser && */}
        <>
          <form onSubmit={this.submitUser}>
            <p>
              <strong>1) Enter User Info:</strong>
            </p>
              <input
                type="text"
                placeholder={'name'}
                onChange={this.handleChange}
              />
              <input
                type="text"
                placeholder={'email'}
                onChange={this.handleChange}
              />
              <input
                type="text"
                placeholder={'birthday'}
                onChange={this.handleChange}
              />
            <button type="submit">Submit</button>
            <button onClick={this.submitUser}>Update</button>
            <button onClick={this.deleteUser}> Delete</button>
          </form>
          <form onSubmit={this.submitMedRec}>
            <p>
              <strong>2) Enter Medical Recommendation Info:</strong>
              {this.state.medRecMsg && <strong style={warningStyle}> {this.state.medRecMsg} </strong>}
            </p>
            <input
              type="text"
              placeholder={'medRecId'}
              onChange={this.handleMedRecChange}
            />
            <input
              type="text"
              placeholder={'issuer'}
              onChange={this.handleMedRecChange}
            />
            <input
              type="text"
              placeholder={'state'}
              onChange={this.handleMedRecChange}
            />
            <input
              type="text"
              placeholder={'expirationDate'}
              onChange={this.handleMedRecChange}
            />
            <input
              type="text"
              placeholder={'imageUrl'}
              onChange={this.handleMedRecChange}
            />
            <button type="submit">Submit</button>
            <button onClick={this.submitMedRec}>Update</button>
            <button onClick={this.deleteMedRec}>Delete</button>
          </form>
          <form onSubmit={this.submitId}>
            <p>
              <strong>3) Enter ID Info:</strong>
              {this.state.govIdMsg && <strong style={warningStyle}> {this.state.govIdMsg} </strong>}
            </p>
            <input
              type="text"
              placeholder={'governmentId'}
              onChange={this.handleGovIdChange}
            />
            <input
              type="text"
              placeholder={'state'}
              onChange={this.handleGovIdChange}
            />
            <input
              type="text"
              placeholder={'expirationDate'}
              onChange={this.handleGovIdChange}
            />
            <input
              type="text"
              placeholder={'imageUrl'}
              onChange={this.handleGovIdChange}
            />
            <button type="submit">Submit</button>
            <button onClick={this.submitId}>Update</button>
            <button onClick={this.deleteId}>Delete</button>
          </form>
        </>
        {/* } */}
        {this.state.user &&
          <>
            <h3> Your User Info </h3>
              <ul>
                <li style={medRecStyle}> Name: {this.state.user.name} </li>
                <li style={medRecStyle}> Email: {this.state.user.email} </li>
                <li style={medRecStyle}> Birthday: {this.state.user.birthday} </li>
              </ul>
          </>
        }
        {this.state.medRec &&
          <>
            <h3> Your Medical Recommendations Info </h3>
              <ul>
                <li style={medRecStyle}> Medical Recommendation ID: {this.state.medRec.medRecId} </li>
                <li style={medRecStyle}> Issuer: {this.state.medRec.issuer} </li>
                <li style={medRecStyle}> State: {this.state.medRec.state} </li>
                <li style={medRecStyle}> Expires: {this.state.medRec.expirationDate} </li>
                <li style={medRecStyle}> Image Url: {this.state.medRec.imageUrl} </li>
              </ul>
          </>
        }
        {this.state.id &&
          <>
            <h3> Your Government ID Info </h3>
              <ul>
                <li style={medRecStyle}> Government ID: {this.state.id.governmentIdNumber} </li>
                <li style={medRecStyle}> State: {this.state.id.state} </li>
                <li style={medRecStyle}> Expires: {this.state.id.expirationDate} </li>
                <li style={medRecStyle}> Image Url: {this.state.id.imageUrl} </li>
              </ul>
          </>
        }
      </div>
    );
  }
}

export default App;