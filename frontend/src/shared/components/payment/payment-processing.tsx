'use client';

import { redirect, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from "react";
import { Payment, PaymentStatus } from '@shared/interface';
import { CartLoader } from '@shared/components/common/cart-loader';
import Success from '@shared/components/common/success.svg';
import { getPayment } from '@shared/http/banking.http';

export type PaymentProps = {
  payment: Payment;
}

const POLL_INTERVAL = 3000;

export function PaymentProcessing(props: PaymentProps) {
  const { payment: initialPayment } = props;
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('paymentId');
  const paymentRef = useRef<Payment>(initialPayment);
  const [ payment, setPayment ] = useState<Payment>(initialPayment);

  if (!paymentId) {
    redirect('/');
  }

  useEffect(() => {
    pollPayment();
  });

  const pollPayment = () => {
    if (
      paymentRef.current.status === PaymentStatus.Initiated
      || paymentRef.current.status === PaymentStatus.Cancelled
    ) {
      return;
    }

    setTimeout(async () => {
      const newPayment = await getPayment(paymentId);

      if (newPayment) {
        paymentRef.current = newPayment;
        setPayment(newPayment);
      }

      if (
        paymentRef.current.status === PaymentStatus.Initiated
        || paymentRef.current.status === PaymentStatus.Cancelled
      ) {
        return;
      }

      pollPayment();
    }, POLL_INTERVAL)
  }

  if (payment.status === PaymentStatus.Initiated) {
    return <div style={{
      width: '100%',
      padding: '100px 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <h2>Payment successful</h2>
      <h3 style={{ marginTop: '30px' }}>{ payment.details.messageToPayer }</h3>
      <div style={{ marginTop: '60px' }}>
        <Success />
      </div>
    </div>;
  }

  if (payment.status === PaymentStatus.Cancelled) {
    return <div style={{
      width: '100%',
      padding: '100px 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <h2>Unsuccessful payment</h2>
      <h3 style={{ marginTop: '30px' }}>{ payment.details.messageToPayer }</h3>
      <div style={{ marginTop: '60px' }}>
        <CartLoader/>
      </div>
    </div>;
  }


  return <div style={{
    width: '100%',
    padding: '100px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <h2>Please Wait</h2>
    <h3 style={{ marginTop: '30px' }}>Your Order is being processed...</h3>
    <div style={{ marginTop: '60px' }}>
      <CartLoader/>
    </div>
  </div>;
}
