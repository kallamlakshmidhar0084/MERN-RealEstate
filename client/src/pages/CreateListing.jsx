import React from "react";

function CreateListing() {
  return (
    <>
      <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-5">
          Create a Listing
        </h1>
        <form action="" className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-4 max-w-xl flex-1">
            <input
              type="text"
              placeholder="Name"
              id="name"
              className="border p-3 rounded-lg"
              maxLength="50"
              minLength={10}
              required
            />
            <textarea
              type="text"
              placeholder="Description"
              id="description"
              className="border p-3 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Address"
              id="address"
              className="border p-3 rounded-lg"
              maxLength="50"
              minLength={10}
              required
            />
            <div className="flex gap-5 flex-wrap">
              <div className="flex gap-2">
                <input type="checkbox" id="sale" className="w-5"/>
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="rent" className="w-5"/>
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="parking" className="w-5"/>
                <span>Parking spot</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="furnished" className="w-5"/>
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="offer" className="w-5"/>
                <span>Offer</span>
              </div>
            </div>
            <div className=" flex flex-wrap  items-center gap-5">
                <div>
                    <input className="py-2 border border-gray-300 rounded-lg " type="number" id="bedrooms" min={1} max={10} required />
                    <span> Beds</span>
                </div>
                <div>
                    <input className="py-2 border border-gray-300 rounded-lg " type="number" id="bathrooms" min={1} max={10} required />
                    <span> Baths</span>
                </div>
                    <div className=" flex flex-wrap gap-2 items-center" >
                    <input className="py-2 border border-gray-300 rounded-lg " type="number" id="regularPrice" min={1} max={10} required />
                    <div className=" flex flex-col items-center">
                    <p> Regular price</p>
                    <span className="text-xs"> (Rs / Month)</span>
                    </div>
                </div>
                    <div className="flex flex-wrap gap-2 items-center " >
                    <input className="py-2 border border-gray-300 rounded-lg " type="number" id="discountPrice" min={1} max={10} required />
                    <div className=" flex flex-col items-center">

                    <p> Discount price</p>
                    <span className="text-xs"> (Rs / Month)</span>
                    </div>
                </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-4">
            <p className="font-semibold" >Images: <span className="font-normal text-gray-700" > Thie first image will be the cover (Max:6)</span> </p>
          <div className="flex gap-4">
            <input className="p-3 border border-grey-300  rounded w-full " type="file"  id="images"  accept="image/*" multiple />
            <button className="border  border-green-600 p-3 rounded text-green-600 uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
          </div>
          <button className="bg-slate-700 rounded-lg p-3 text-white uppercase hover:opacity-90 disabled:opacity-80 ">Create List</button>
          </div>
        </form>
      </main>
    </>
  );
}

export default CreateListing;
