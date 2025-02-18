import React from 'react';
import { X } from 'lucide-react';

const TagsFilter = ({ tags, selectedTag, onFilter }) => {
  const handleFilter = (tag) => {
    // If clicking the already selected tag, clear the filter
    onFilter(selectedTag === tag ? null : tag);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex gap-3 flex-wrap mt-4 p-2">
        {tags.map((tag, index) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={index}
              onClick={() => handleFilter(tag)}
              className={`
                group relative inline-flex items-center gap-2 px-4 py-2 
                text-sm font-medium tracking-wide border 
                transition-all duration-200 ease-in-out
                hover:shadow-md active:shadow-sm
                ${isSelected ? 
                  'bg-[#cc0000] text-white border-[#cc0000] shadow-md' : 
                  'bg-white text-gray-700 border-gray-200 hover:border-[#cc0000] hover:text-[#cc0000]'
                }
              `}
            >
              <span className="relative">
                {tag}
                {isSelected && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                )}
              </span>
              {isSelected && (
                <X 
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              )}
            </button>
          );
        })}
      </div>
      {selectedTag && (
        <div className="mt-2 ml-2 text-sm text-gray-500">
          Filtering by: <span className="font-medium text-[#cc0000]">{selectedTag}</span>
        </div>
      )}
    </div>
  );
};

export default TagsFilter;