import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';


export default function SortableItem({ id }: { id: string }) {
  const {
    attributes,
    listeners,
        transition,
        transform,
    setNodeRef,
  } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
     touchAction: "none" ,
  };


  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="bg-white border border-gray-200 rounded p-2 shadow-sm cursor-move !touch-none"
      style={style}
    >
      {id}
    </div>
  );
}
