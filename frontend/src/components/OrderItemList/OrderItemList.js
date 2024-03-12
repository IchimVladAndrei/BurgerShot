import React from "react";
import classes from "./orderItemsList.module.css";
import { Link } from "react-router-dom";
import Price from "../Price/Price.js";

export default function OrderItemList({ order }) {
  return (
    <table className={classes.table}>
      <tbody>
        <tr>
          <td colSpan="5">
            <h3>Order Items:</h3>
          </td>
        </tr>
        {order.items.map((item) => (
          <tr key={item.food.id}>
            <td>
              <Link to={`/food/${item.food.id}`}>
                <img src={item.food.imageUrl} alt="foodThumbnail" />
              </Link>
            </td>
            <td>{item.food.name}</td>
            <td>
              <Price price={item.food.price} />
            </td>
            <td>{item.quantity}</td>
            <td>
              <Price price={item.price} />
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan="3"></td>
          <td>
            <strong>Total</strong>
          </td>
          <td>
            <Price price={order.totalPrice} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
