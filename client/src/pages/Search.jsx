function Search() {
  return (
    <div className="flex flex-col md:flex-row md:min-h-screen">
      <div className="p-7 border border-b-2 md:border-r-2">
        <form className="flex flex-col gap-8">
          <div className="flex  items-center gap-2 ">
            <label className=" whitespace-nowrap font-semibold">Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold" htmlFor="">Type:</label>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="all" className="w-5" />{" "}
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="rent" className="w-5" />{" "}
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="sale" className="w-5" />{" "}
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="offer" className="w-5" />{" "}
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold"  htmlFor="">Amenities:</label>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="parking" className="w-5" />{" "}
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="furnished" className="w-5" />{" "}
              <span>Furnished</span>
            </div>
            
          </div>
          <div className="flex gap-2 items-center">
            <label className="font-semibold" htmlFor="">Sort:</label>
            <select className="border rounded-lg p-3" name="" id="sort_order">
              <option value="">Price high-low</option>
              <option value="">Price low-high</option>
              <option value="">Latest</option>
              <option value="">Oldest</option>
            </select>
          </div>
          
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90">Search</button>
        </form>
      </div>
      <h1 className="text-3xl font-semibold border-b p-3 text-slate-700">Listing Results:</h1>
      <div></div>
    </div>
  );
}

export default Search;
