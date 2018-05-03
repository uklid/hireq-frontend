import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Input from '../../components/uielements/input'
import Checkbox from '../../components/uielements/checkbox'
import Button from '../../components/uielements/button'
import styled from 'styled-components'
import { LoginCheck } from '../../redux/auth/actions'
// import authAction from '../../redux/auth/actions'
// import IntlMessages from '../../components/utility/intlMessages'
// import SignInStyleWrapper from './signin.style'

const SignInWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: url(${require('../../image/signin-image.jpg')}) no-repeat;
  background-size: cover;
`

const WhiteWrapper = styled.div`
  width: 489px;
  height: 500px;
  border-radius: 5px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SignInBlock = styled.div`

`

class SignIn extends Component {
  handleLogin = async () => {
    const { LoginCheck } = this.props
    await LoginCheck()
    // this.props.history.push('/dashboard')
  }
  render() {
    console.log("Props =",this.props)
    const { errorMessage } = this.props
    return (
      <SignInWrapper>
        <WhiteWrapper>
          <SignInBlock>
            <h1 style={{ textAlign: 'center', marginBottom: 30 }}>LOGIN</h1>
            <p style={{ color:'red' }}> { errorMessage && errorMessage } </p>
            <Input style={{ marginBottom: 15 }} size="large" placeholder="Username" />
            <Input style={{ marginBottom: 23 }} size="large" placeholder="Password" />
            <Button
              style={{
                width: '100%', backgroundColor: '#954590', color: '#fff'
              }}
              onClick={this.handleLogin}
            >
              Login
            </Button>
          </SignInBlock>
        </WhiteWrapper>
      </SignInWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.Auth.errorMessage
  }
}

export default connect(mapStateToProps, { LoginCheck })(SignIn)

// const { login } = authAction

// class SignIn extends Component {
//   state = {
//     redirectToReferrer: false,
//   }
//   componentWillReceiveProps(nextProps) {
//     if (
//       this.props.isLoggedIn !== nextProps.isLoggedIn &&
//       nextProps.isLoggedIn === true
//     ) {
//       this.setState({ redirectToReferrer: true })
//     }
//   }
//   handleLogin = () => {
//     const { login } = this.props
//     login()
//     this.props.history.push('/dashboard')
//   }
//   render() {
//     const from = { pathname: '/dashboard' }
//     const { redirectToReferrer } = this.state

//     if (redirectToReferrer) {
//       return <Redirect to={from} />
//     }
//     return (
//       <SignInStyleWrapper className="isoSignInPage">
//         <div className="isoLoginContentWrapper">
//           <div className="isoLoginContent">
//             <div className="isoLogoWrapper">
//               <Link to="/dashboard">
//                 <IntlMessages id="page.signInTitle" />
//               </Link>
//             </div>

//             <div className="isoSignInForm">
//               <div className="isoInputWrapper">
//                 <Input size="large" placeholder="Username" />
//               </div>

//               <div className="isoInputWrapper">
//                 <Input size="large" type="password" placeholder="Password" />
//               </div>

//               <div className="isoInputWrapper isoLeftRightComponent">
//                 <Checkbox>
//                   <IntlMessages id="page.signInRememberMe" />
//                 </Checkbox>
//                 <Button type="primary" onClick={this.handleLogin}>
//                   <IntlMessages id="page.signInButton" />
//                 </Button>
//               </div>

//               <p className="isoHelperText">
//                 <IntlMessages id="page.signInPreview" />
//               </p>

//               <div className="isoInputWrapper isoOtherLogin">
//                 <Button onClick={this.handleLogin} type="primary btnFacebook">
//                   <IntlMessages id="page.signInFacebook" />
//                 </Button>
//                 <Button onClick={this.handleLogin} type="primary btnGooglePlus">
//                   <IntlMessages id="page.signInGooglePlus" />
//                 </Button>
//               </div>
//               <div className="isoCenterComponent isoHelperWrapper">
//                 <Link to="" className="isoForgotPass">
//                   <IntlMessages id="page.signInForgotPass" />
//                 </Link>
//                 <Link to="">
//                   <IntlMessages id="page.signInCreateAccount" />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </SignInStyleWrapper>
//     )
//   }
// }

// export default connect(
//   state => ({
//     isLoggedIn: state.Auth.get('idToken') !== null ? true : false,
//   }),
//   { login }
// )(SignIn)
