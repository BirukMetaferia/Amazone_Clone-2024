import React, { useContext, useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import classes from "./Orders.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { db, collection, query, orderBy, onSnapshot } from "../../Utility/firebase";
import ProductCard from "../../Components/Product/ProductCard";

function Orders() {
  const [{user}, dispatch ] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log('User context:', user); // Log the user context
    if (user && user.uid) {
      const ordersRef = collection(db, "users", user.uid, "orders");
      const q = query(ordersRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const fetchedOrders = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
          }));
          setOrders(fetchedOrders);
          console.log("Orders fetched: ", fetchedOrders);
        } else {
          console.log("No orders found");
        }
      }, (error) => {
        console.error("Error fetching orders: ", error);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    } else {
      setOrders([]); // Clear orders if user is not logged in
      console.log("User is not logged in or user.uid is not defined");
    }
  }, [user]);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          <div>
            {orders.length > 0 ? (
              orders.map((eachOrder, i) => (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => (
                    <ProductCard flex={true} product={order} key={order.id} />
                  ))}
                </div>
              ))
            ) : (
              <p>No orders found</p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
