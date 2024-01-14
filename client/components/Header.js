import React from 'react';
import { graphql } from 'react-apollo';
import authenticatedUserQuery from '../queries/CurrentUser';
import { Link } from 'react-router';
import LogoutMutaion from '../mutations/Logout';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogoutClicked() {
    this.props.mutate({ refetchQueries: [{ query: authenticatedUserQuery }] });
  }

  renderButtons() {
    const { data: { loading, user } = {} } = this.props;
    if (loading) return <div> Loading....</div>;
    if (user) {
      return (
        <li>
          <a onClick={this.handleLogoutClicked.bind(this)}>Logout</a>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </div>
      );
    }
  }

  render() {
    console.log('authentication...', this.props);

    return (
      <nav>
        <div className='nav-wrapper'>
          <Link to='/' className='brand-logo left'>
            Home
          </Link>
          <ul className='right'>{this.renderButtons()}</ul>
        </div>
      </nav>
    );
  }
}

export default graphql(LogoutMutaion)(graphql(authenticatedUserQuery)(Header));
