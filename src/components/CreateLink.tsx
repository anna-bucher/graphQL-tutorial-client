import * as React from 'react'

import { createLinkMutation, createLinkMutationVariables } from 'gen/types'

import { Mutation } from 'react-apollo'
import { createLink } from 'src/queries'

class LinkMutation extends Mutation<
  createLinkMutation,
  createLinkMutationVariables
> {}

export class CreateLink extends React.Component {
  state = {
    description: '',
    url: '',
  }

  render() {
    const { description, url } = this.state
    return (
      <LinkMutation mutation={createLink} variables={{ description, url }}>
        {(mutate, { loading, error, data }) => (
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
            <button onClick={() => mutate()}>submit</button>
          </div>
        )}
      </LinkMutation>
    )
  }
}
