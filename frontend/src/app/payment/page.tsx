import Wrapper from '@shared/layout/DefaultWrapper';
import React from 'react';
import { Payment } from '@shared/components/payment/payment';

const page = () => {
  return (
    <Wrapper>
      <main>
        <Payment />
      </main>
    </Wrapper>
  );
};

export default page;
