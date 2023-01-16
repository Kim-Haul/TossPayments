import React from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';

const Payment = () => {
  const clientKey = 'test_ck_qLlDJaYngroLB6AYM0l8ezGdRpXx';

  const TossPay = () => {
    //orderId가 필요해서 만든 랜덤 아이디값
    const random = new Date().getTime() + Math.random();
    const randomId = btoa(String(random));

    loadTossPayments(clientKey).then((tossPayments) => {
      // 카드 결제 메서드 실행
      tossPayments
        .requestPayment('카드', {
          amount: 11000000, // 가격
          orderId: `${randomId}`, // 주문 id
          orderName: `3개월 정기 구독권`, // 결제 이름
          customerName: '테스트', // 판매자, 판매처 이름
          successUrl: 'http://localhost:3000/success', // 성공시 리다이렉트 주소
          failUrl: 'http://localhost:3000/failed', // 실패시 리다이렉트 주소
        })
        .catch(function (error) {
          if (error.code === 'USER_CANCEL') {
            // 결제 고객이 결제창을 닫았을 때 에러 처리
            alert('결제을 중단합니다.');
          } else if (error.code === 'INVALID_CARD_COMPANY') {
            // 유효하지 않은 카드 코드에 대한 에러 처리
            alert('카드 번호가 유효하지 않습니다.');
          }
        });
    });
  };

  return (
    <React.Fragment>
      <div>
        <span style={{ color: 'blue', fontWeight: 700 }}>토스</span>페이먼츠
        결제를 실행합니다.
      </div>
      <button
        onClick={() => {
          TossPay();
        }}
      >
        클릭
      </button>
    </React.Fragment>
  );
};

export default Payment;
