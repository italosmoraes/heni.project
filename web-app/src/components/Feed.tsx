import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { PrintsResponse } from '../graphql/types'
import { PRINTS_QUERY } from '../graphql/queries'
import { useEffect, useState } from 'react'
import { FeedItem } from './FeedItem'

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding: 10px;
  max-width: 75%;
`

const LoadMoreBtn = styled.button`
  margin: 10px;
  height: 40px;
`

const LOADING_LIMIT = 10

export const Feed = () => {
  const { loading, error, data, refetch } = useQuery<PrintsResponse>(PRINTS_QUERY, {
    variables: {
      input: {
        limit: LOADING_LIMIT,
        page: 1
      }
    }
  })
  const [nextPage, setNextPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [feedItems, setFeedItems] = useState<any[]>([]) // TODO improve type for feed items

  useEffect(() => {
    if (data?.prints && nextPage !== data?.prints.info.pages) {
      setNextPage(data.prints.info.page + 1)
      setHasNextPage(true)
    } else {
      setHasNextPage(false)
    }

    if (data?.prints.records) {
      setFeedItems([...feedItems, ...data.prints.records])
    }
  }, [data])

  const loadMore = () => {
    refetch({
      input: {
        limit: LOADING_LIMIT,
        page: nextPage
      }
    })
  }

  if (loading) return <p>Loading...</p>

  if (error) {
    return (
      <>
        <p>An error has ocurred: </p>
        {JSON.stringify(error.message)}
      </>
    )
  }

  return (
    <>
      <FeedContainer>
        {feedItems && feedItems.map((item, idx) => <FeedItem key={idx} item={item} />)}
        {hasNextPage && (
          <LoadMoreBtn name="load-more" onClick={() => loadMore()}>
            ...LOAD MORE
          </LoadMoreBtn>
        )}
      </FeedContainer>
    </>
  )
}
