import { getLinksQuery } from 'gen/types'
import * as React from 'react'

interface Props {
  link: getLinksQuery['feed']['links'][0]
}

export class Link extends React.Component<Props> {
  render() {
    return (
      <div>
        <div>
          {this.props.link.description} ({this.props.link.url})
        </div>
      </div>
    )
  }

  voteForLink = async () => {
    // todo
  }
}
