import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { connect } from 'react-redux'

import App from './containers/App/App'
import CreatePosition from './containers/Position/CreatePosition'
import asyncComponent from './helpers/AsyncFunc'
import QuizLayout from './containers/Quiz/QuizLayout'
import QuizComplete from './containers/Quiz/QuizComplete'

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props => isLoggedIn
      ? <Component {...props} />
      : <Redirect
        to={{
          pathname: '/signin',
          state: { from: props.location },
        }}
      />}
  />
)
const PublicRoutes = (props) => {
  console.log("isLoggin = ", props)
  return (
    <ConnectedRouter history={props.history}>
      <div>
        <Switch>
          <Route
            exact
            path={'/'}
            component={asyncComponent(() => import('./containers/Page/signin'))}
          />
          <Route
            exact
            path={'/signin'}
            component={asyncComponent(() => import('./containers/Page/signin'))}
          />
          <Route
            exact
            path={'/term-of-privacy'}
            component={asyncComponent(() => import('./containers/Page/TermOfService'))}
          />
          <Route
            exact
            path={'/privacy'}
            component={asyncComponent(() => import('./containers/Page/Privacy'))}
          />
          <RestrictedRoute
            path="/dashboard"
            component={App}
            isLoggedIn={props.isLoggedIn}
          />
          <RestrictedRoute
            path="/quiz"
            component={QuizLayout}
            isLoggedIn={props.isLoggedIn}
          />
          <RestrictedRoute
            path="/quiz-complete"
            component={QuizComplete}
            isLoggedIn={props.isLoggedIn}
          />
          <Route render={() => <div>404 Not Found. Sorry</div>} />
        </Switch>
      </div>
    </ConnectedRouter>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.Auth.isLoggedIn
  }
}

export default connect(mapStateToProps, null)(PublicRoutes)

// export default connect(state => ({
//   isLoggedIn: state.Auth.get('idToken') !== null,
// }))(PublicRoutes)
