import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { connect } from 'react-redux'

import App from './containers/App/App'
import CreatePosition from './containers/Position/CreatePosition'
import asyncComponent from './helpers/AsyncFunc'
import QuizLayout from './containers/Quiz/QuizLayout'
import QuizComplete from './containers/Quiz/QuizComplete'
import Loader from './LoadingComponent'
import BeforeQuiz from './containers/Quiz/BeforeQuiz'
import SecondCreatePosition from './containers/Position/SecondCreatePosition'
import Privacy from './containers/Page/Privacy'
import TermOfService from './containers/Page/TermOfService'

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
  // console.log("this props = ", props)
  return (
    <ConnectedRouter history={props.history}>
      <div>
        {props.isLoading && <Loader />}
        <Switch>
          <Route
            exact
            path={'/'}
            component={asyncComponent(() => import('./containers/Page/signin'))}
          />
          <Route 
            exact
            path={'/candidate'}
            component={BeforeQuiz}
          />
          <Route
            exact
            path={'/quiz'}
            component={QuizLayout}
          // component={asyncComponent(() => import('./containers/Quiz/QuizLayout'))}
          />
          <Route
            path="/quiz-complete"
            component={asyncComponent(() => import('./containers/Quiz/QuizComplete'))}
          />
          <Route
            exact
            path={'/signin'}
            component={asyncComponent(() => import('./containers/Page/signin'))}
          />
          <Route
            exact
            path={'/term-of-privacy'}
            component={TermOfService}
            // component={asyncComponent(() => import('./containers/Page/TermOfService'))}
          />
          <Route
            exact
            path={'/privacy'}
            component={Privacy}
            // component={asyncComponent(() => import('./containers/Page/Privacy'))}
          />
          {/* <RestrictedRoute
            path="/create-position/create-setting"
            component={SecondCreatePosition}
            isLoggedIn={props.isLoggedIn}
          /> */}
          <RestrictedRoute
            path="/dashboard"
            component={App}
            isLoggedIn={props.isLoggedIn}
          />
          {/* <RestrictedRoute
            path="/quiz"
            component={QuizLayout}
            isLoggedIn={props.isLoggedIn}
          /> */}
          {/* <RestrictedRoute
            path="/quiz-complete"
            component={QuizComplete}
            isLoggedIn={props.isLoggedIn}
          /> */}
          <Route render={() => <h1>404 Not Found. Sorry</h1>} />
        </Switch>
      </div>
    </ConnectedRouter>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.Auth.isLoggedIn,
  isLoading: state.Loading.loading,
})

export default connect(mapStateToProps, null)(PublicRoutes)

// export default connect(state => ({
//   isLoggedIn: state.Auth.get('idToken') !== null,
// }))(PublicRoutes)
