// 钱包是否下载
export const isWalletDownloaded = () => window?.tronWeb;

//钱包是否连接
export const isConnectedWallet = () => tronLink?.ready;

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
  if (!isConnectedWallet()) return isConnectedWallet();
  return tronWeb.defaultAddress.base58;
};

export const walletBalance = (address) => {
  if (!isConnectedWallet()) return Promise.reject("钱包未连接");
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

// 转账 钱包充值

// 售出

// 为某些行为签名

// 广播交易
