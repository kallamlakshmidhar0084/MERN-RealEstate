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

import { useParams } from 'react-router-dom';

function Listing() {
    const params=useParams();
    const [listing, setListing]=useState(null);
    const [loading , setLoading]=useState(false);
    const  [error , setError] = useState(false);
    SwiperCore.use([Navigation]);
    useEffect(()=>{
        const getListing=async ()=>{
            
            try {
                setLoading(true);
                setError(false);
                const listingId=params.listingId;
                console.log(listingId)
                const data= await axios.get(`/api/listing/getList/${listingId}`)
                console.log(data)
                setListing(data.data);
                setLoading(false);
                
            } catch (error) {
                setLoading(false);
                setError(error);
                
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

            </div>
        )}

    </main>
    </>
    
  )
}

export default Listing