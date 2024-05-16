import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminPage = () => {
  const [kidsData, setKidsData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalCashAmount, setTotalCashAmount] = useState(0);
  const [totalUpiAmount, setTotalUpiAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/adminKids");
      //   console.log(result);
      setKidsData(result.data.result);
      setTotalAmount(result.data.totalAmount[0].total);
      setTotalCashAmount(result.data.cashAmount[0].total);
      setTotalUpiAmount(result.data.upiAmount[0].total);
    };

    fetchData();
  }, []);
  return (
    <div className="w-full">
      <div className="text-2xl mb-5 py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
        <Link to="/">Tanwani's Fun KidZone</Link>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 ">
          <div>
            <div className="relative overflow-x-auto p-5 rounded-md border-4 border-black">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="">
                    <th scope="col" className="px-6 py-3 ">
                      Kid name 
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Age
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Adult Socks
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Kids Socks
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Payment Method
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Cost
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {kidsData?.map((item, index) => {
                    return (
                      // <tr
                      //   key={index}
                      //   className={`bg-${
                      //     currTime > item.exitTime ? "red" : "green"
                      //   }-200  dark:bg-gray-800`}
                      // >
                      <tr
                        //   style={{
                        //     backgroundColor: `${
                        //       currTime > item.exitTime ? "indianred" : "lightgreen"
                        //     }`,
                        //   }}
                        key={index}
                        className={` dark:bg-gray-800`}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-black text-gray-900 dark:text-white"
                        >
                          {item.name}
                        </th>
                        <td className="px-6 font-black text-gray-900  py-4">
                          {item.number}
                        </td>
                        <td className="px-6 font-black text-gray-900  py-4 ">
                          {item.age}
                        </td>
                        <td className="px-6 text-gray-900 font-black py-4">
                          {" "}
                          {item.adultSocks}{" "}
                        </td>
                        <td className="px-6 text-gray-900 font-black py-4">
                          {" "}
                          {item.kidsSocks}{" "}
                        </td>
                        <td className="px-6 text-gray-900 font-black py-4">
                          {" "}
                          {item.paymentMethod}{" "}
                        </td>
                        <td className="px-6 text-gray-900 font-black py-4">
                          {" "}
                          {item.totalCost}{" "}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                {/* <tfoot>
          <tr className="font-semibold text-gray-900 dark:text-white">
            <th scope="row" className="px-6 py-3 text-base">
              Total
            </th>
            <td className="px-6 py-3">3</td>
            <td className="px-6 py-3">21,000</td>
          </tr>
        </tfoot> */}
              </table>
            </div>
          </div>
        </div>
        <div className="">
        <div class="bg-gray-50 rounded-xl p-6 w-[80%] m-auto mb-8 max-lg:max-w-xl max-lg:mx-auto">
                <div class="flex items-center justify-between w-full mb-6">
                    <p class="font-normal text-xl leading-8 text-gray-400">Cash</p>
                    <h6 class="font-semibold text-xl leading-8 text-gray-900">{totalCashAmount}</h6>
                </div>
                <div class="flex items-center justify-between w-full pb-6 border-b border-gray-200">
                    <p class="font-normal text-xl leading-8 text-gray-400">UPI</p>
                    <h6 class="font-semibold text-xl leading-8 text-gray-900">{totalUpiAmount} </h6>
                </div>
                <div class="flex items-center justify-between w-full py-6">
                    <p class="font-manrope font-medium text-2xl leading-9 text-gray-900">Total</p>
                    <h6 class="font-manrope font-medium text-2xl leading-9 text-indigo-500">₹{totalAmount}</h6>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
