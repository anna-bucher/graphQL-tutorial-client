import * as React from 'react'

import { Link } from './Link'
import { Query } from 'react-apollo'
import { getLinks } from 'src/queries'
import { getLinksQuery } from 'gen/types'

class LinksQuery extends Query<getLinksQuery, {}> {}

export const LinkList: React.SFC<{}> = props => (
  <LinksQuery query={getLinks} variables={{}}>
    {({ loading, data, error }) => {
      if (loading) {
        return <div>Loading...</div>
      }

      if (error) {
        return <div>Error</div>
      }

      if (!data) {
        return <div>No data</div>
      }

      const { links } = data.feed
      return (
        <div>
          {links.map((link, index) => (
            <Link key={link.id} link={link} index={index} />
          ))}
        </div>
      )
    }}
  </LinksQuery>
)
