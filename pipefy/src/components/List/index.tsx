import { MdAdd } from 'react-icons/md';

import Card from '../Card';

import { Container } from './styles';

import { CardProps, ListProps } from '../../utils/types';

const List = ({ data, index: listIndex }: ListProps) => {
  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>

        {data.creatable && (
          <button type="button">
            <MdAdd size={24} color="#fff" />
          </button>
        )}
      </header>
      
      <ul>
        {data.cards.map((card: CardProps, index: number) => (
          <Card
            key={card.id}
            listIndex={listIndex}
            index={index}
            data={card}
          />
        ))}
      </ul>
    </Container>
  );
}

export default List;
