import React, { useEffect, useState } from "react";
import classes from "./foodPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { getById } from "../../services/foodService";
import Price from "../../components/Price/Price";
import { useCart } from "../../hooks/useCart";
import NotFound from "../../components/NotFound/NotFound";
export default function FoodPage() {
  const [food, setFood] = useState({});
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const handleToCart = () => {
    addToCart(food);
    navigate("/cart"); //to force to go to cart
  };

  useEffect(() => {
    getById(id).then(setFood);
  }, [id]);

  return (
    <>
      {!food ? (
        <NotFound />
      ) : (
        <div className={classes.container}>
          <img
            className={classes.image}
            src={`${food.imageUrl}`}
            alt={food.name}
          />

          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>{food.name}</span>
              <span
                className={`${classes.favorite} ${
                  food.favorite ? "" : classes.not
                } `}
              >
                ❤
              </span>
            </div>
            <div className={classes.origins}>
              {food.origins?.map((origin) => (
                <span key={origin}>{origin}</span>
              ))}
            </div>
            <div className={classes.cook_time}>
              <span>
                Time to cook is around <strong>{food.cookTime}</strong> minutes.
              </span>
            </div>
            <div className={classes.price}>
              <Price price={food.price} />
            </div>
            <button onClick={handleToCart}>Add to cart</button>
          </div>
        </div>
      )}
    </>
  );
}
