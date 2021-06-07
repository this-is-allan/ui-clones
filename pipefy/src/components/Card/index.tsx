import { useRef, useContext } from "react";
import { useDrag, useDrop } from "react-dnd";

import BoardContext from "../Board/context";

import { Container, Label } from "./styles";

interface CardProps {
  index: number
  listIndex: number
  data: any
}

const Card = ({ data, index, listIndex }: CardProps) => {
  const ref = useRef<HTMLDivElement>();
  const { move } = useContext(BoardContext);
  
  const [{ isDragging }, dragRef] = useDrag({
    type: "CARD",
    item: { index, listIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex

      const draggedIndex = item.index;
      const targetIndex = index

      // Don't replace items with themselves
      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) return

      // Determine rectangle on screen
      const targetSize = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      // Determine mouse position
      const dragOffset = monitor.getClientOffset();
      const draggedTop = dragOffset.y - targetSize.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (draggedIndex < targetIndex && draggedTop < targetCenter) return;

      // Dragging upwards
      if (draggedIndex > targetIndex && draggedTop > targetCenter) return;

      // Time to actually perform the action
      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = targetIndex;
      item.listIndex = targetListIndex;
    }
  })

  dragRef(dropRef(ref))
  
  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map((label: string) => (
          <Label color={label} />
        ))}
      </header>
      <p>{data.content}</p>
      {data.user && <img src={data.user} alt="avatar" />}
    </Container>
  );
}

export default Card;
