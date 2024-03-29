import axios from 'axios'
import React, { useEffect, useImperativeHandle, useState } from 'react'
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
  } from 'react-icons/fa';

import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Listing() {
    const params=useParams();
    const { currentUser } = useSelector((state) => state.user);
    const [listing, setListing]=useState(null);
    const [loading , setLoading]=useState(false);
    const  [error , setError] = useState(false);
    const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [email,setEmail]=useState(null);
    SwiperCore.use([Navigation]);
    useEffect(()=>{
        const getListing=async ()=>{
            
            try {
                setLoading(true);
                setError(false);
                const listingId=params.listingId;
                console.log(listingId)
                const data= await axios.get(`/api/listing/getList/${listingId}`)
                const landlord=await axios.get(`/api/user/getUser/${data.data.userRef}`)
                console.log(landlord)
                setEmail(landlord.data.safeUser._doc.email)
                setListing(data.data);
                setLoading(false);
                
            } catch (error) {
                setLoading(false);
                setError(error);
                console.log(error);
                
            }
            
            
        }
        getListing()
    },[])


  return (
    <>
    <main>
        {loading && <p className='text-4xl text-center my-8'>Loading...</p>}
        {error && <p className='text-4xl text-center my-8'>Oops! Something went wrong</p> }
        {listing && !loading && !error && (
            <div>
                <Swiper navigation>
                    {listing.imageUrls.map((url)=>(
                        <SwiperSlide key={url}>
                            <div className='border-2 border-sky-500 h-[550px]' style={{background: `url(${url}) center no-repeat `, backgroundSize:"cover"}}  ></div>

                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
           <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {currentUser &&  !contact && (
                <>
                 <Link to={`mailto:${email}?subject=Regarding ${listing.name}`}>
                <button className='bg-slate-700 justify-center flex text-white rounded-lg uppercase hover:opacity-95 p-3'>
                    <span>Contact landlord {listing.name} at </span>{email}
                </button>
                </Link>

                </>
                
                
            )}
          </div>

            </div>
        )}

    </main>
    </>
    
  )
}

export default Listing