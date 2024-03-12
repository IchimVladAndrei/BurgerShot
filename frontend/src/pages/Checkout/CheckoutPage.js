import React, { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createOrder } from "../../services/orderService.js";
import classes from "./checkoutPage.module.css";
import Title from "../../components/Title/Title.js";
import Input from "../../components/Input/Input.js";
import Button from "../../components/Button/Button.js";
import OrderItemList from "../../components/OrderItemList/OrderItemList.js";
import Map from "../../components/Map/Map.js";

export default function CheckoutPage() {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [order, setOrder] = useState({ ...cart });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = async (data) => {
    if (!order.addressLatLng) {
      toast.warning("Please select your location on the map");
      return;
    }
    await createOrder({ ...order, name: data.name, address: data.address });
    navigate("/payment");
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className={classes.container}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />
          <div className={classes.inputs}>
            <Input
              defaultValue={user.name}
              label="Name"
              {...register("name")}
              error={errors.name}
            />
            <Input
              defaultValue={user.address}
              label="Address"
              {...register("address")}
              error={errors.name}
            />
          </div>
          <OrderItemList order={order} />
        </div>
        <div>
          <Title title="Choose Your Location" fontSize="1.6rem" />
          <Map
            location={order.addressLatLng}
            onChange={(latlng) => {
              console.log(latlng);
              setOrder({ ...order, addressLatLng: latlng });
            }}
          ></Map>
        </div>

        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
            <Button
              type="submit"
              text="Go to payment"
              width="100%"
              height="3rem"
            />
          </div>
        </div>
      </form>
    </>
  );
}
