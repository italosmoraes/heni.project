import { Print } from '../types/Print'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { PrintsResponse } from '../graphql/types'
import { PRINTS_QUERY } from '../graphql/queries'
import { useEffect, useState } from 'react'

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
  padding: 25px;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding: 10px;
`

const LoadMoreBtn = styled.button`
  margin: 10px;
`

export const FeedItem = (props: FeedItemProps) => {
  const { item } = props
  console.log('>>> img', item.primaryImageUrl)
  return (
    <FeedItemContainer>
      <img src={item.primaryImageUrl} width={400} height={600} />
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
  const { loading, error, data, refetch } = useQuery<PrintsResponse>(PRINTS_QUERY, {
    variables: {
      input: {
        resource: 'OBJECT', // TODO remove since we are only querying OBJECTs in the api
        limit: 1,
        page: 1
      }
    }
  })
  const [nextPage, setNextPage] = useState(1)
  const [feedItems, setFeedItems] = useState<any[]>([]) // TODO improve type for feed items

  useEffect(() => {
    console.log('>>>> data', data)

    if (data?.prints && nextPage !== data?.prints.info.pages) {
      setNextPage(data.prints.info.page + 1)
    }

    if (data?.prints.records) {
      console.log('>>> set Fee items', data?.prints.records)
      setFeedItems([...feedItems, ...data.prints.records])
    }
  }, [data])

  const loadMore = () => {
    refetch({
      input: {
        resource: 'OBJECT', // TODO remove since we are only querying OBJECTs in the api
        limit: 1,
        page: nextPage
      }
    })
  }

  if (loading) return <p>Loading...</p>

  if (error)
    return (
      <>
        <p>An error has ocurred: </p>
        {error}
      </>
    )
  return (
    <FeedContainer>
      {feedItems && feedItems.map((item, idx) => <FeedItem key={idx} item={item} />)}
      <LoadMoreBtn name="load-more" onClick={() => loadMore()}>
        ...LOAD MORE
      </LoadMoreBtn>
    </FeedContainer>
  )
}
