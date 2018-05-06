import * as React from 'react'

import { compose, graphql } from 'react-apollo'
import { login, signup } from 'src/queries'
import {
  loginMutation,
  loginMutationVariables,
  signupMutation,
  signupMutationVariables,
} from 'gen/types'

import { AUTH_TOKEN } from '../constants'

const withMutations = compose(
  graphql<{}, loginMutation, loginMutationVariables>(login, {
    name: 'loginMutation',
  }),
  graphql<{}, signupMutation, signupMutationVariables>(signup, {
    name: 'signupMutation',
  })
)

interface Props {
  // part of Router
  history: any

  loginMutation(args: {
    variables: {
      email: string
      password: string
    }
  }): Promise<{ data: { login: { token: string } } }>

  signupMutation(args: {
    variables: {
      email: string
      name: string
      password: string
    }
  }): Promise<{ data: { signup: { token: string } } }>
}

export const Login = withMutations(
  class LoginComponent extends React.Component<Props> {
    state = {
      email: '',
      login: true, // switch between Login and Signup
      name: '',
      password: '',
    }

    render() {
      return (
        <div>
          <h4 className="mv3">{this.state.login ? 'Login' : 'Sign Up'}</h4>
          <div className="flex flex-column">
            {!this.state.login && (
              <input
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                type="text"
                placeholder="Your name"
              />
            )}
            <input
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
              type="text"
              placeholder="Your email address"
            />
            <input
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
              type="password"
              placeholder="Choose a safe password"
            />
          </div>
          <div className="flex mt3">
            <div className="pointer mr2 button" onClick={() => this.confirm()}>
              {this.state.login ? 'login' : 'create account'}
            </div>
            <div
              className="pointer button"
              onClick={() => this.setState({ login: !this.state.login })}
            >
              {this.state.login
                ? 'need to create an account?'
                : 'already have an account?'}
            </div>
          </div>
        </div>
      )
    }

    confirm = async () => {
      // Todo
      const { name, email, login: isLogin, password } = this.state
      if (isLogin) {
        const result = await this.props.loginMutation({
          variables: {
            email,
            password,
          },
        })
        const { token } = result.data.login
        this.saveUserData(token)
      } else {
        const result = await this.props.signupMutation({
          variables: {
            email,
            name,
            password,
          },
        })
        const { token } = result.data.signup
        this.saveUserData(token)
      }
      this.props.history.push(`/`)
    }

    saveUserData = (token: string) => {
      localStorage.setItem(AUTH_TOKEN, token)
    }
  }
)
