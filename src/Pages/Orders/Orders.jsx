import React, { useContext, useEffect, useState } from 'react';
import classes from './Orders.module.css';
import LayOut from '../../Componenets/LayOut/LayOut';
import { db } from '../../Utility/firebase';
import { DataContext } from '../../Componenets/DataProvider/DataProvider';
import ProductCard from '../../Componenets/Product/ProductCard';
import { ClipLoader } from 'react-spinners';

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [processing, setProcessing] = useState(true); // default to true on mount

  useEffect(() => {
    if (!user) {
      // If user is not logged in, reset states
      setOrders([]);
      setProcessing(false);
      return;
    }

    setProcessing(true); // Begin loading

    const unsubscribe = 
    db.collection('users')
      .doc(user.uid)
      .collection('orders')
      .orderBy('created', 'desc')
      .onSnapshot(
        (snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
          setProcessing(false); // Done loading
        },
        (error) => {
          console.error('Error fetching orders:', error);
          setProcessing(false); // Also stop processing on error
        }
      );

    return () => unsubscribe(); // Cleanup on unmount
  }, [user]); // Add `user` to dependency list

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>

          {processing ? (
            <div className={classes.loading}>
              <ClipLoader color="gray" size={20} />
              <p>Processing...</p>
            </div>
          ) : orders.length === 0 ? (
            <p>You have no orders</p>
          ) : (
            <div>
              {orders.map((eachOrder, i) => (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrder.id}</p>
                  {eachOrder?.data?.basket?.map((order) => (
                    <ProductCard key={order.id} flex={true} product={order} />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;