// components/TagsFilter.js
const TagsFilter = ({ tags, selectedTag, onFilter }) => {
    const handleFilter = (tag) => {
      onFilter(tag);
    };
  
    return (
      <div className="flex gap-2 flex-wrap mt-4">
        {tags.map((tag, index) => (
          <button
            key={index}
            onClick={() => handleFilter(tag)}
            className={`px-4 py-2 border rounded-full transition-all ${
              selectedTag === tag
                ? "bg-[#cc0000] text-white border-[#cc0000]"
                : "bg-neutral text-neutral-content border-neutral"
            } hover:bg-[#b30000] hover:text-white`}
          >
            {tag}
          </button>
        ))}
      </div>
    );
  };
  
  export default TagsFilter;
  