const errorList = [
  {
    key: "class org.tron.core.exception.ContractValidateException : Validate TransferContract error, balance is not sufficient.",
    value: "余额不足",
  },
];

// 钱包是否下载
export const isWalletDownloaded = () => window?.tronWeb;

//钱包是否连接
export const isConnectedWallet = () => window.tronLink?.ready;

export const connectedWallet = async () => {
  return new Promise(async (resolve, reject) => {
    if (isWalletDownloaded()) {
      const data = await window.tronLink.request({
        method: "tron_requestAccounts",
      });
      resolve(data.code === 200);
    } else {
      resolve(false);
    }
  });
};

export const walletAddress = () => {
  if (!isConnectedWallet() && !isWalletDownloaded()) return isConnectedWallet();
  return tronWeb.defaultAddress.base58;
};

export const walletBalance = (address) => {
  if (!isConnectedWallet() && isWalletDownloaded()) return Promise.reject("钱包未连接");
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await tronWeb.trx.getBalance(address || walletAddress()));
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * key string
 */
export const walletConnectionListener = (key) => {
  return new Promise((resolve) => {
    window.addEventListener("message", function (e) {
      let message = e.data.message;
      if (!message) {
        return Promise.reject("未有消息");
      }
      if (typeof key === "string") {
        if (e.data.message.action === key) {
          return resolve(e.data.message);
        }
      } else {
        return resolve(e.data.message);
      }
    });
  });
};

export const cancelWalletStatusListener = () => {
  window.removeEventListener("message");
};

export const signMessage = async (value) => {
  if (!isWalletDownloaded()) return Promise.reject("钱包未下载");
  if (!isConnectedWallet()) {
    console.warn("钱包未连接，开始连接当前钱包");
    await connectedWallet();
  }
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await tronWeb.trx.signMessage(value));
    } catch (error) {
      reject(error);
    }
  });
};

// 波场错误
export const tronErrorList = (str) => {
  console.log(str);
  const a = errorList.filter((v) => v.key === str);
  if (a.length) {
    return a[0].value;
  } else {
    return "波场异常";
  }
};

// 创建一个未签名的交易，用于给SR投票
/**
 *
 * @obj {*} obj adress value
 * @adress adress
 */
export const transactionBuilder = async (obj, adress = walletAddress()) => {
  return await tronWeb.transactionBuilder.vote(obj, adress, 1);
};
// 转账 钱包充值

// 售出

// 为某些行为签名
export const trxSign = async (value) => {
  return await tronWeb.trx.sign(value);
};

// 广播交易
export const sendSignRawTransaction = async (value) => {
  const data = await trxSign(value);
  return await tronWeb.trx.sendRawTransaction(data);
};
