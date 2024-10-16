export default function ListSort({ onSort }) {
    
    const handleSortLowToHigh = () => {
      onSort('lowToHigh');
    };
  
    const handleSortHighToLow = () => {
      onSort('highToLow');
    };
  
    return (
      <div className="py-1" role="none">
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
          role="menuitem"
          tabIndex="-1"
          id="menu-item-0"
          onClick={handleSortLowToHigh}
        >
          Low to High
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
          role="menuitem"
          tabIndex="-1"
          id="menu-item-1"
          onClick={handleSortHighToLow}
        >
          High to Low
        </a>
      </div>
    );
  }
  