import React, { Component } from 'react'
import { Link } from './Link'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const LinkList = graphql(
  gql`
    query feedQuery {
      feed {
        links {
          id
          createdAt
          url
          description
        }
      }
    }
  `,
  { name: 'feedQuery' }
)(
  class LinkList extends Component {
    render() {
      const { feedQuery } = this.props
      if (!feedQuery || feedQuery.loading) {
        return <div>Loading...</div>
      }

      if (feedQuery.error) {
        return <div>Error: {feedQuery.error}</div>
      }

      const linksToRender = feedQuery.feed.links

      return (
        <div>
          {linksToRender.map(link => <Link key={link.id} link={link} />)}
        </div>
      )
    }
  }
)
