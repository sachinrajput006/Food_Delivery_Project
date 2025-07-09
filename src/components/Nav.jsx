import React, { use, useContext, useEffect } from 'react';
import { dataContext } from '../context/UserContext';
import { MdFastfood } from 'react-icons/md';
import { IoSearch } from 'react-icons/io5';
import { FiShoppingBag } from 'react-icons/fi';
import { food_items } from '../food';
import { useSelector } from 'react-redux';

const Nav = () => {
    let { input, setInput, cate, setCate, showCart, setShowCart } = useContext(dataContext);
    // ...existing code...
    useEffect(() => {
        let newlist = food_items.filter((item) =>
            item.food_name.toLowerCase().includes(input.toLowerCase())
        );
        setCate(newlist);
    }, [input]);
    
  let items=useSelector(state=>state.cart);
  console.log(items);
    // ...existing code...
    return (
        <div className="w-full h-[100px]  px-4 md:px-10 flex items-center justify-between gap-4 overflow-hidden">
            {/* Logo */}
            <div className="w-[60px] h-[60px] bg-white flex justify-center items-center rounded-b-md shadow-lg shrink-0">
                <MdFastfood className="w-[30px] h-[30px] text-green-500" />
            </div>

            {/* Search bar */}
            <form className="flex items-center bg-white px-5 h-[60px] rounded-md shadow-md flex-grow mx-4 min-w-0" onSubmit={(e) => e.preventDefault()}>
                <IoSearch className="text-green-500 w-[20px] h-[20px] mr-2" />
                <input
                    type="text"
                    placeholder="Search Items..."
                    className="w-full bg-transparent outline-none text-[16px]"
                    onChange={e => setInput(e.target.value)}
                    value={input}
                />
            </form>

            {/* Cart */}
            <div className="w-[60px] h-[60px] bg-white flex justify-center items-center rounded-b-md shadow-lg relative shrink-0 cursor-pointer" onClick={()=> 
                setShowCart(true)}>
                <span className="absolute top-0 right-2 text-green-500 font-bold text-[14px]">{items.length}</span>
                <FiShoppingBag className="w-[30px] h-[30px] text-green-500" />
            </div>
        </div>
    );
};

export default Nav;