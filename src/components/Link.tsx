import * as React from 'react'
import * as moment from 'moment'

import { getLinks, vote } from 'src/queries'
import { getLinksQuery, voteMutation, voteMutationVariables } from 'gen/types'

import { AUTH_TOKEN } from 'src/constants'
import { Mutation } from 'react-apollo'

interface EProps {
  link: getLinksQuery['feed']['links'][0]
  index: number
}

class VoteForLink extends Mutation<voteMutation, voteMutationVariables> {}

export class Link extends React.Component<EProps> {
  render() {
    const { createdAt, id, postedBy } = this.props.link
    const authToken = localStorage.getItem(AUTH_TOKEN)
    const date = moment(createdAt)
    const votes = this.props.link.votes || []
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{this.props.index + 1}.</span>
          {authToken && (
            <VoteForLink
              mutation={vote}
              variables={{ linkId: id }}
              update={(store, results) => {
                const data = store.readQuery<getLinksQuery>({ query: getLinks })
                if (!data || !results.data) {
                  return
                }
                const votedLink = data.feed.links.find(link => link.id === id)
                const newVote = results.data.vote
                if (!newVote || !votedLink) {
                  return
                }
                votedLink.votes = newVote.link.votes
                store.writeQuery({ query: getLinks, data })
              }}
            >
              {(doVote, { loading, data, error }) => (
                <div className="cptr ml1 gray f11" onClick={() => doVote()}>
                  ▲
                </div>
              )}
            </VoteForLink>
          )}
        </div>
        <div className="ml1">
          <div>
            {this.props.link.description} ({this.props.link.url})
          </div>
          <div className="f6 lh-copy gray">
            {votes.length} votes | by {postedBy ? postedBy.name : 'Unknown'}{' '}
            {date.fromNow()}
          </div>
        </div>
      </div>
    )
  }
}
