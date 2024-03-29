import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { Album } from '../../utils/types';

type Props = { 
  index: number, 
  children: any, 
  album: Album, 
  moveItem: (dragIndex: number, hoverIndex: number) => void 
}

export const AlbumContainer: React.FC<Props> = ({ index, children, album, moveItem }) => {
  const [{ isDragging }, drag] = useDrag<any, unknown, { isDragging: boolean }>({
    type: 'item',
    item: { type: 'item', index, album },
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
