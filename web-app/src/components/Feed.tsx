import { Print } from '../types/Print'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { PrintsResponse } from '../graphql/types'
import { PRINTS_QUERY } from '../graphql/queries'
import { useEffect } from 'react'

type FeedItemProps = {
  item: Print
}

const FeedItemRow = styled.p`
  font-size: 0.75em;
  flex: 1;
`

const FeedItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding: 0;
`

export const FeedItem = (props: FeedItemProps) => {
  const { item } = props

  return (
    <FeedItemContainer>
      <img src={item.primaryImageUrl} width={'400em'} height={'600em'} />
      <FeedItemRow>Title: {item.title}</FeedItemRow>
      <FeedItemRow>Description: {item.description}</FeedItemRow>
      <FeedItemRow>Department: {item.dated}</FeedItemRow>
      <a href={item.url} target="_blank">
        View
      </a>
    </FeedItemContainer>
  )
}

export const Feed = () => {
  const { loading, error, data } = useQuery<PrintsResponse>(PRINTS_QUERY, {
    variables: {
      input: {
        resource: 'OBJECT', // TODO remove since we are only querying OBJECTs in the api
        limit: 1,
        page: null
      }
    }
  })

  useEffect(() => {
    console.log('>>>>', data)
  }, [data])

  if (loading) return <p>Loading...</p>

  if (error)
    return (
      <>
        <p>An error has ocurred: </p>
        {error}
      </>
    )

  return (
    <>
      {data &&
        data.prints &&
        data.prints.records.map((item) => <FeedItem key={item} item={item} />)}
    </>
  )
}
