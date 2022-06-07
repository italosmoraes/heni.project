import styled from 'styled-components'
import { Print } from '../types/Print'

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

export const FeedItem = (props: FeedItemProps) => {
  const { item } = props

  return (
    <FeedItemContainer>
      {item.primaryImageUrl && <img src={item.primaryImageUrl} width={400} height={600} />}
      {item.title && <FeedItemRow>Title: {item.title}</FeedItemRow>}
      {item.description && <FeedItemRow>Description: {item.description}</FeedItemRow>}
      {item.department && <FeedItemRow>Department: {item.department}</FeedItemRow>}
      {item.dated && <FeedItemRow>Dated: {item.dated}</FeedItemRow>}
      {item.url && (
        <a href={item.url} target="_blank">
          View at Harvard Museum
        </a>
      )}
    </FeedItemContainer>
  )
}
