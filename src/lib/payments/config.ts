export type PayEnv = {
  // Common
  appBaseUrl: string; // e.g. https://example.com

  // Alipay
  alipayAppId?: string;
  alipayPrivateKey?: string; // PKCS#1/PKCS#8 private key
  alipayPublicKey?: string; // Alipay RSA2 public key
  alipayGateway?: string; // default: https://openapi.alipay.com/gateway.do

  // WeChat Pay (v3)
  wechatMchId?: string;
  wechatMchPrivateKey?: string; // PEM private key contents
  wechatMchCertSerial?: string; // Merchant certificate serial number
  wechatAppId?: string; // AppID for JSAPI/native
  wechatNotifyKey?: string; // API v3 key for decrypting notify
};

export function getPayEnv(): PayEnv {
  return {
    appBaseUrl: process.env.APP_BASE_URL || "http://localhost:3000",

    alipayAppId: process.env.ALIPAY_APP_ID,
    alipayPrivateKey: process.env.ALIPAY_PRIVATE_KEY,
    alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY,
    alipayGateway: process.env.ALIPAY_GATEWAY || "https://openapi.alipay.com/gateway.do",

    wechatMchId: process.env.WECHAT_MCH_ID,
    wechatMchPrivateKey: process.env.WECHAT_MCH_PRIVATE_KEY,
    wechatMchCertSerial: process.env.WECHAT_MCH_CERT_SERIAL,
    wechatAppId: process.env.WECHAT_APP_ID,
    wechatNotifyKey: process.env.WECHAT_NOTIFY_KEY,
  };
}

export function ensureEnv(keys: (keyof PayEnv)[]) {
  const env = getPayEnv();
  const missing = keys.filter((k) => !env[k]);
  if (missing.length) {
    throw new Error(`Missing payment env: ${missing.join(", ")}`);
  }
  return env;
}

export type CreateOrderInput = {
  orderId: string;
  amount: number; // yuan
  subject: string;
  description?: string;
  returnUrl?: string;
};