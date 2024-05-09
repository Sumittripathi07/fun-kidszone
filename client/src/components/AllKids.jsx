import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Clock } from "./clock/Clock";

const AllKids = () => {
  const [kidsData, setKidsData] = useState([]);
  const [color, setColor] = useState("green");
  const currTime = new Date().toTimeString().split(" ")[0];

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/allKids");
      setKidsData(result.data);
    };

    fetchData();
  }, []);
  // console.log(kidsData);
  return (
    <div>
      <div className="relative overflow-x-auto">
        <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
          <Link to="/">Tanwani's Fun KidZone</Link>
        </div>
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
                In Time
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Out Time
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
                  style={{
                    backgroundColor: `${
                      currTime > item.exitTime ? "indianred" : "lightgreen"
                    }`,
                  }}
                  key={index}
                  className={` dark:bg-gray-800`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-black text-gray-900 dark:text-white text-2xl"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 font-black text-gray-900  py-4 text-2xl">
                    {item.number}
                  </td>
                  <td className="px-6 text-gray-900  py-4 text-2xl">
                    {item.enterTime}
                  </td>
                  <td className="px-6 text-gray-900 font-black py-4 text-2xl">
                    {" "}
                    {item.exitTime}{" "}
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
      <Clock />
    </div>
  );
};

export default AllKids;
