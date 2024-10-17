'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from "react";

export function Payment() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('paymentId');


  return <div>
    {paymentId}
  </div>;
}
