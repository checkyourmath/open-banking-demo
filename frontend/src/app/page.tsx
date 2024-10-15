//@refresh
import Wrapper from "@shared/layout/DefaultWrapper";
import ShopProductArea from '@shared/components/shop-grid/ShopProductArea';
import React from 'react';

const Home = () => {
  return (
    <>
      <Wrapper>
        <main>
          <ShopProductArea />
        </main>
      </Wrapper>
    </>
  );
}

export default Home
