import CartMainArea from '@shared/components/cart/CartMainArea';
import Wrapper from '@shared/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <Wrapper>
            <main>
                <CartMainArea />
            </main>
        </Wrapper>
    );
};

export default page;
