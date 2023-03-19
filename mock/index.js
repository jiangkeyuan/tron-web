export default [
  {
    url: "/tron/user/rentals/12456",
    method: "GET",
    response: (r) => {
      return {
        code: 12000,
        data: [
          {
            id: 1234,
            orderNo: "12345678",
            toAddress: "TBKkub****a3Amvd",
            rentalQuantity: "1rentalQuantity",
            doneRentalQuantity: "1doneRentalQuantity",
            //租天
            rentalDays: 1,
            //支付日期
            payDate: 2,
            //质押日期
            stakeDate: 3,
            //过期日期
            expiredDate: 3,
            //支付金额
            payAmount: 12.55,
            //订单状态
            orderStatus: 12,
            //交易hash
            transactionHash: "123",
          },
        ],
      };
    },
  },
  {
    url: "/tron/user/manaul/buy",
    method: "POST",
    response: (r) => {
      return {
        code: 12000,
      };
    },
  },

  {
    url: "/tron/user/apikeys/12456",
    method: "get",
    response: (r) => {
      return {
        code: 12000,
        data: [
          {
            id: 123,
            //key name
            keyName: "kkkkk",
            //key值
            keyValue: "234567890",
            //今日租用能量
            rentalEnergy: "12.222",
            //今日租用消耗trx
            usedAmount: "12345",
            //计费能量
            billingEnergy: "123456",
            //计费trx
            billingAmount: "1",
          },
        ],
      };
    },
  },
];
