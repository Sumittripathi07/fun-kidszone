import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminPage = () => {
  const [kidsData, setKidsData] = useState([]);
  const [totalAmount, setTotalAmount] = useState();
  const [totalCashAmount, setTotalCashAmount] = useState();
  const [totalUpiAmount, setTotalUpiAmount] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/adminKids");
      //   console.log(result);
      setKidsData(result.data.result);
      setTotalAmount(result.data.totalAmount);
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
        <div className="col-span-2 ...">
          <div>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 rounded-s-lg">
                      Kid name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Age
                    </th>
                    <th scope="col" className="px-6 py-3 rounded-e-lg">
                      Adult Socks
                    </th>
                    <th scope="col" className="px-6 py-3 rounded-e-lg">
                      Kids Socks
                    </th>
                    <th scope="col" className="px-6 py-3 rounded-e-lg">
                      Payment Method
                    </th>
                    <th scope="col" className="px-6 py-3 rounded-e-lg">
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
        <div className="...">
          cash: {totalCashAmount} <br /> UPI : {totalUpiAmount}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
