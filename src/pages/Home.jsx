import React, { useContext } from "react";
import Nav from "../components/Nav";
import { Categories } from "../Category";
import Card from "../components/Card";
import { food_items } from "../food";
import { dataContext } from "../context/UserContext";
import { RxCross2 } from "react-icons/rx";
import Card2 from "../components/Card2";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Home = () => {
  const { cate, setCate, input, showCart, setShowCart } = useContext(dataContext);

  const filter = (category) => {
    if (category.toLowerCase() === "all") {
      setCate(food_items);
    } else {
      const newList = food_items.filter(
        (item) => item.food_category.toLowerCase() === category.toLowerCase()
      );
      setCate(newList);
    }
  };

  let items = useSelector((state) => state.cart);

  let subtotal = items.reduce((total, item) => total + item.price * item.qty, 0);
  let deliveryFee = 50;
  let taxes = subtotal * 0.05; // Assuming 5% tax on subtotal
  let total = Math.floor(subtotal + deliveryFee + taxes)

  return (
    <div className="bg-slate-200 min-h-screen w-full">
      <Nav />

      {!input ? (
        // CATEGORY FILTER SECTION
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 py-4 md:py-6 px-2 md:px-4">
          {Categories.map((item) => (
            <div
              key={item.id}
              onClick={() => filter(item.filterKey)}
              className="flex flex-col items-center justify-center bg-white rounded-xl shadow p-3 md:p-4 hover:bg-green-200 transition cursor-pointer w-24 md:w-32"
            >
              {item.image}
              <p className="mt-2 text-base md:text-lg font-semibold text-center">{item.name}</p>
            </div>
          ))}
        </div>
      ) : null}

      {/* CARD DISPLAY SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-12 px-2 md:px-4">
        {cate.length > 0 ? (
          cate.map((item) => (
            <Card
              key={item.id}
              name={item.food_name}
              image={item.food_image}
              id={item.id}
              price={item.price}
              type={item.food_type}
            />
          ))
        ) : (
          <p className="text-green-500 text-center font-bold text-2xl mt-10 col-span-full">
            No Dish Found.
          </p>
        )}
      </div>

      {/* RESPONSIVE SIDEBAR */}<div className={`fixed top-0 right-0 h-full w-full md:w-[40vw] bg-white p-4 md:p-6 transition-transform duration-500 shadow-xl z-50 overflow-y-auto ${showCart ? "translate-x-0" : "translate-x-full"}`}>
        <header className="w-full flex justify-between items-center mb-4">
          <span className="text-green-400 text-[18px] font-semibold">Order Items</span>
          <RxCross2 className="text-green-400 text-[18px] font-semibold w-[30px] h-[30px] cursor-pointer hover:bg-gray-600" onClick={() => setShowCart(false)} />
        </header>

        {items.length > 0 ? <>
          <div className="w-full flex flex-col gap-8 mt-5">
            {items.map((item) => (
              <Card2 key={item.id} name={item.name} price={item.price} image={item.image} id={item.id} qty={item.qty} />
            ))}
          </div>
          <div className="w-fill border-t-2 border-b-2 border-gray-400 mt-7 pt-4 flex flex-col gap-2 p-8">
            <div className="w-full flex justify-between items-center">
              <span className="text-lg text-gray-600 font-semibold">Subtotal</span>
              <span className="text-green-400 font-semibold text-lg">Rs {subtotal}/-</span>
            </div>
            <div className="w-full flex justify-between items-center">
              <span className="text-lg text-gray-600 font-semibold">Delivery</span>
              <span className="text-green-400 font-semibold text-lg">Rs {deliveryFee}/-</span>
            </div>
            <div className="w-full flex justify-between items-center">
              <span className="text-lg text-gray-600 font-semibold">Taxes</span>
              <span className="text-green-400 font-semibold text-lg">Rs {taxes}/-</span>
            </div>

          </div>
          <div className="w-full flex justify-between items-center p-9 text-2xl">
            <span className="text-lg text-gray-600 font-semibold">Total</span>
            <span className="text-green-400 font-semibold text-lg">Rs {total}/-</span>
          </div>
          <button
            className="w-full mt-6 py-3 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-lg shadow transition-all duration-200 active:scale-95"
            onClick={() => {
              toast.success("Order Placed Successfully!");
              setShowCart(false);
            }}
          >
            Place Order
          </button>
        </> :
          <div className="text-center text-green-500 text-2xl font-semibold pt-5">Empty Card</div>}

      </div>
    </div>
  );
};

export default Home;