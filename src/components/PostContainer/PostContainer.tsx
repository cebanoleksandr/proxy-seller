import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { Post } from '../../utils/types';

type Props = { 
  index: number, 
  children: any, 
  post: Post, 
  moveItem: (dragIndex: number, hoverIndex: number) => void 
}

export const PostContainer: React.FC<Props> = ({ index, children, post, moveItem }) => {
  const [{ isDragging }, drag] = useDrag<any, unknown, { isDragging: boolean }>({
    type: 'item',
    item: { type: 'item', index, post },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop<any, unknown, { isDragging: boolean }>({
    accept: 'item',
    hover: (item: any, monitor: DropTargetMonitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
  
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div ref={drop}>{children}</div>
    </div>
  );
};
