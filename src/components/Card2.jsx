import React from 'react'
import { useDispatch } from 'react-redux'
import image1 from '../assets/image1.avif'
import { RiDeleteBin6Line } from "react-icons/ri";
import { DecrementQty, IncrementQty, RemoveItem } from '../redux/cartSlice';
import { toast } from 'react-toastify';

const Card2 = ({ id, name, price, image, qty }) => {
    let dispatch = useDispatch();
    return (
        <div className='w-full h-[120px] p-2 shadow-lg flex justify-between '>
            <div className='w-[60%] h-full flex gap-3'>
                <div className='w-[60%] h-full overflow-hidden rounded-lg '>
                    <img src={image} alt="" className='object-cover ' />
                </div>
                <div className='w-[50%] h-full flex flex-col gap-4 '>
                    <div className='text-lg text-gray-600 font-bold '>{name}</div>
                    <div className='w-[110px] h-[50px] text-slate-400 flex justify-center items-center rounded-lg overflow-hidden shadow-lg font-semibold border-2 border-green-400 text-xl'>
                        <button className='w-[30%] h-full text-green-400 bg-white hover:bg-gray-200' onClick={()=>{qty>1?dispatch(DecrementQty({id})):1}}>-</button>
                        <span className='w-[40%] h-full text-green-400 bg-slate-200 flex justify-center items-center '>{qty}</span>
                        <button className='w-[30%] h-full text-green-400 bg-white flex justify-center items-center hover:bg-gray-200' onClick={()=>{dispatch(IncrementQty({id}))}}>+</button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-6'>
                <span className='text-xl text-green-400 font-semibold'>Rs {price}</span>
                <RiDeleteBin6Line
                    className='w-[30px] h-[30px] text-red-500 cursor-pointer'
                    onClick={() => {
                        dispatch(RemoveItem(id));
                        toast.success("Item removed from cart");
                    }}
                />
            </div>
        </div>
    )
}

export default Card2