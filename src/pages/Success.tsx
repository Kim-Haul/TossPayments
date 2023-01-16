import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Success = () => {
  let orderId = new URL(window.location.href).searchParams.get('orderId');
  let paymentKey = new URL(window.location.href).searchParams.get('paymentKey');
  let amount = new URL(window.location.href).searchParams.get('amount');

 interface IPaymentInfo {
    orderName: string | undefined;
    method: string | undefined;
  }

  const [info, SetInfo] = useState<IPaymentInfo>({orderName: '', method: ''})

  useEffect(() => {
    axios
      .post('https://api.tosspayments.com/v1/payments/confirm', {
        paymentKey,
        orderId,
        amount,
      }, {
        headers: {
          // 시크릿 키를 base64로 인코딩한 값
          'Authorization': 'Basic dGVzdF9za19QMjR4TGVhNXpWQXlZT3FudmtLVlFBTVlOd1c2Og==',
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        console.log(response);
        SetInfo({
          orderName: response.data.orderName,
          method: response.data.method
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <div><span style={{ color: 'green', fontWeight: 700 }}>성공</span></div>
      <div>{info.orderName}</div>
      <div>{info.method}</div>
    </React.Fragment>
  )
};

export default Success;
