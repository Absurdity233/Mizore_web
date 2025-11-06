import { ensureEnv, CreateOrderInput } from "./config";
import * as crypto from "crypto";
import axios from "axios";

// 使用微信支付 v3 Native 下单，返回 code_url 用于生成二维码
export async function createWechatNativeOrder(input: CreateOrderInput) {
  const env = ensureEnv(["wechatMchId", "wechatMchPrivateKey", "wechatMchCertSerial", "wechatAppId", "appBaseUrl"]);

  const url = "https://api.mch.weixin.qq.com/v3/pay/transactions/native";
  const notifyUrl = new URL("/api/pay/wechat/notify", env.appBaseUrl).toString();

  const body = {
    appid: env.wechatAppId!,
    mchid: env.wechatMchId!,
    description: input.subject,
    out_trade_no: input.orderId,
    notify_url: notifyUrl,
    amount: { total: Math.round(input.amount * 100), currency: "CNY" },
  };

  // 支持在 .env 中用 \n 表示换行
  const mchPrivKey = env.wechatMchPrivateKey!.replace(/\\n/g, "\n");
  const token = await signWechatRequest("POST", url, body, env.wechatMchId!, env.wechatMchCertSerial!, mchPrivKey);
  const resp = await axios.post(url, body, {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return { code_url: resp.data.code_url as string, notifyUrl };
}

async function signWechatRequest(
  method: string,
  url: string,
  body: any,
  mchId: string,
  serialNo: string,
  privateKeyPem: string,
) {
  const urlObj = new URL(url);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonceStr = crypto.randomBytes(16).toString("hex");
  const bodyString = body ? JSON.stringify(body) : "";
  const message = `${method}\n${urlObj.pathname}${urlObj.search}\n${timestamp}\n${nonceStr}\n${bodyString}\n`;

  const signer = crypto.createSign("RSA-SHA256");
  signer.update(message);
  const signature = signer.sign(privateKeyPem, "base64");

  const token = `WECHATPAY2-SHA256-RSA2048 mchid="${mchId}",serial_no="${serialNo}",nonce_str="${nonceStr}",timestamp="${timestamp}",signature="${signature}"`;
  return token;
}