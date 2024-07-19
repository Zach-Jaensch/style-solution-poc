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

export const MockCardList = ({ data }: { data?: { title: string }[] }) => (
  <CardList>
    {data?.map(({ title }, idx) => <Card key={idx}>{title}</Card>)}
  </CardList>
);
