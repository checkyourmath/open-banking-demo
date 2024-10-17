import Wrapper from '@shared/layout/DefaultWrapper';
import React from 'react';
import { QueryParams } from '@shared/interface';
import { redirect } from 'next/navigation';
import { PaymentProcessing } from '@shared/components/payment/payment-processing';
import { getPayment } from '@shared/http/banking.http';

type PaymentPageProps = {
  searchParams: QueryParams;
};

export default async function PaymentPage(props: PaymentPageProps) {
  const { paymentId } = props.searchParams;

  if (!paymentId || Array.isArray(paymentId)) {
    redirect('/');
  }

  const payment = await getPayment(paymentId);

  if (!payment) {
    redirect('/');
  }

  return (
    <Wrapper>
      <main>
        <PaymentProcessing
          payment={payment}
        />
      </main>
    </Wrapper>
  );
};
