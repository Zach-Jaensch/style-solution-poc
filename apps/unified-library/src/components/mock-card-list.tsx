/* TODO: delete when real card list is implemented */
import styled from "styled-components";

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
`;

const Card = styled.div`
  width: 15rem;
  aspect-ratio: 0.78;
  border: 1px solid blue;
`;

export const MockCardList = () => (
  <CardList>
    {Array(20)
      .fill(0)
      .map((_, idx) => (
        <Card key={idx}>{idx}</Card>
      ))}
  </CardList>
);
