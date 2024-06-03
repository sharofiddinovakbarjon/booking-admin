import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";

const Orders: React.FC = () => {
  const [ordersList, setOrdersList] = useState<Orders[]>([]);

  const token = localStorage.getItem("token");

  const handleGetOrders = async () => {
    try {
      const response = await axios.get(
        "https://cafe-booking.uz/api/v1/orders/cafe-all-orders/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      console.log(response);

      if (response.status === 200) {
        setOrdersList(response.data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetOrders();
  }, []);

  return (
    <>
      <div className="orders">
        <div className="orders-inner content-inner">
          <div className="content-title">
            <p>Заказы</p>
          </div>
          {ordersList.length > 0 ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Имя</th>
                    <th>Номер телефона</th>
                    <th>Количество</th>
                    <th>Дата и время</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {ordersList.map((order, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{order.fullname}</td>
                      <td>{order.phone_number}</td>
                      <td>{order.capacity}</td>
                      <td>
                        {order.datetimes.length > 0
                          ? order.datetimes[0].time
                          : ""}
                      </td>
                      <td>
                        <button className="reject">&times;</button>
                      </td>
                      <td>
                        <button className="accept">
                          <FaCircleCheck />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <>
              <h1 style={{ color: "royalblue" }}>Заказов пока нет</h1>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
