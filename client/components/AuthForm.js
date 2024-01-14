import React from 'react';
class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmitClicked(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <div className='row'>
        <form className='col s6' onSubmit={this.handleSubmitClicked.bind(this)}>
          <div className='input-field'>
            <input
              type='text'
              placeholder='Email'
              name='email'
              onChange={this.handleInputChange.bind(this)}
              value={this.state.email}
            />
          </div>
          <div className='input-field'>
            <input
              type='password'
              placeholder='password'
              name='password'
              onChange={this.handleInputChange.bind(this)}
              value={this.state.password}
            />
          </div>
          <div className='errors'>
            {this.props.errors.map((error) => (
              <div key={error}>{error}</div>
            ))}
          </div>
          <button className='btn' type='submit'>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
