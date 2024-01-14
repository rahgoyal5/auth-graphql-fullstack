import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import requireAuth from './components/requireAuth';
const networkInterface = createNetworkInterface({
  uri: '/graphql', //it means our endpoint is hosted at /graphql, when we are making our own network interface, we have to tell the network like on which url we are making the request
  opts: {
    credentials: 'same-origin' //it says its safe to send cookies with the outgoing
  }
});
const client = new ApolloClient({
  networkInterface, // now apolloclient is not using default network interface, its using customized one
  dataIdFromObject: (O) => O.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path='/' component={App} />
        <Route path='login' component={LoginForm} />
        <Route path='signup' component={SignupForm} />
        <Route path='dashboard' component={requireAuth(Dashboard)} />
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
