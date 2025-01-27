import React from 'react';
import { ChevronRight } from 'lucide-react';

interface TodoItemProps {
  number: number;
  title?: string;
}

const TodoItem = ({ number, title }: TodoItemProps) => (
  <div className="flex items-center gap-4 p-3 rounded hover:bg-[#17181b] cursor-pointer">
    <div className="w-4 h-4 border border-gray-600 rounded-full"></div>
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="text-gray-500">GIO-{number}</span>
        <span>{title || `Task ${number}`}</span>
      </div>
    </div>
    <span className="text-gray-500">Jan 22</span>
    <ChevronRight className="w-4 h-4 text-gray-500" />
  </div>
);

export default TodoItem;
