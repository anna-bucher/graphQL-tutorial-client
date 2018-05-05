import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const CreateLink = graphql(
  gql`
    mutation postMutation($description: String!, $url: String!) {
      createLink(description: $description, url: $url) {
        id
        createdAt
        url
        description
      }
    }
  `,
  { name: 'postMutation' }
)(
  class CreateLink extends Component {
    state = {
      description: '',
      url: '',
    }

    render() {
      return (
        <div>
          <div className="flex flex-column mt3">
            <input
              className="mb2"
              value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })}
              type="text"
              placeholder="A description for the link"
            />
            <input
              className="mb2"
              value={this.state.url}
              onChange={e => this.setState({ url: e.target.value })}
              type="text"
              placeholder="The URL for the link"
            />
          </div>
          <button onClick={() => this._createLink()}>Submit</button>
        </div>
      )
    }
    _createLink = async () => {
      const { description, url } = this.state
      await this.props.postMutation({
        variables: { description, url },
      })
    }
  }
)
