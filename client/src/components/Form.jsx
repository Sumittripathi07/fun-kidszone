import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DatePicker } from "rsuite";

const Form = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [dob, setDob] = useState("");
  const [adultSocks, setAdultSocks] = useState("Choose");
  const [kidsSocks, setKidsSocks] = useState("Choose");
  const [time, setTime] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  const [transactionId, setTransactionId] = useState("");

  const calculateCost = (kidsSocks, adultSocks, time) => {
    let totalSocksPrice = (parseInt(kidsSocks) + parseInt(adultSocks)) * 30;
    if (parseInt(time) == 30) {
      return totalSocksPrice + 200;
    } else {
      return totalSocksPrice + 250;
    }
  };
  const collectData = async (e) => {
    e.preventDefault();
    // let finalDob = new Date(dob);

    const d = new Date();
    let currDate = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;

    let age = d.getFullYear() - parseInt(dob.split("-")[0]) - 1;

    const enterTime = new Date().toTimeString().split(" ")[0];
    const exitTime = new Date(d.getTime() + time * 60000)
      .toTimeString()
      .split(" ")[0];

    const totalCost = calculateCost(kidsSocks, adultSocks, time);
    let result = await fetch("http://localhost:5000/", {
      method: "post",
      body: JSON.stringify({
        name,
        number,
        dob,
        age,
        time,
        adultSocks,
        kidsSocks,
        paymentMethod,
        transactionId,
        enterTime,
        exitTime,
        totalCost,
        currDate,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json;
    localStorage.setItem("user", JSON.stringify(result));
    alert(`TotalCost: ${totalCost}`);
    setName("");
    setNumber("");
    setDob("");
    setAdultSocks("Choose");
    setKidsSocks("Choose");
    setTime();
    setPaymentMethod("");
    setTransactionId("");
    // console.log(
    //   JSON.stringify({
    //     name,
    //     number,
    //     dob,
    //     adultSocks,
    //     kidsSocks,
    //     paymentMethod,
    //   })
    // );
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
        <Link to="/">Tanwani's Fun KidZone</Link>
      </div>
      <form className="p-6" onSubmit={collectData}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Kids Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
          />
        </div> */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
            DOB
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            type="date"
            placeholder="Select a date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
            Time (in mins)
          </label>
          <div className="main flex border rounded-full overflow-hidden select-none w-fit m-auto">
            {/* <div className="title py-3 my-auto px-5 bg-blue-500 text-white text-sm font-semibold mr-3">
              Gender
            </div> */}
            <label className="flex radio p-2 cursor-pointer">
              <input
                className="my-auto transform scale-125"
                type="radio"
                name="time"
                value={30}
                checked={time == 30}
                onChange={(e) => setTime(e.target.value)}
              />
              <div className="title px-2">30</div>
            </label>

            <label className="flex radio p-2 cursor-pointer">
              <input
                className="my-auto transform scale-125"
                type="radio"
                name="time"
                value={60}
                checked={time == 60}
                onChange={(e) => setTime(e.target.value)}
              />
              <div className="title px-2">60</div>
            </label>
          </div>
        </div>

        {/* <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="time">
            Time
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="time"
            type="time"
            placeholder="Select a time"
          />
        </div> */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="service"
          >
            Adult Socks
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="service"
            name="service"
            value={adultSocks}
            onChange={(e) => setAdultSocks(e.target.value)}
            required
          >
            <option value="">Choose</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="service"
          >
            Kids Socks
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="service"
            name="service"
            onChange={(e) => setKidsSocks(e.target.value)}
            required
            value={kidsSocks}
          >
            <option value="">Choose</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
            Payment Option
          </label>
          <div className="main flex border rounded-full overflow-hidden select-none w-fit m-auto">
            <label className="flex radio p-2 cursor-pointer">
              <input
                className="my-auto transform scale-125"
                type="radio"
                name="payment"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <div className="title px-2">UPI</div>
            </label>

            <label className="flex radio p-2 cursor-pointer">
              <input
                className="my-auto transform scale-125"
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <div className="title px-2">Cash</div>
            </label>
          </div>
        </div>

        {paymentMethod == "upi" ? (
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Transaction ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              required
            />
          </div>
        ) : (
          ""
        )}
        <div className="flex items-center justify-center mb-4">
          <button
            className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
