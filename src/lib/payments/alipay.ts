import AlipaySdk from "alipay-sdk";
import { ensureEnv, CreateOrderInput } from "./config";

export function createAlipayClient() {
  const env = ensureEnv(["alipayAppId", "alipayPrivateKey", "alipayPublicKey", "alipayGateway", "appBaseUrl"]);
  const client = new AlipaySdk({
    appId: env.alipayAppId!,
    // 支持在 .env 中用 \n 表示换行
    privateKey: env.alipayPrivateKey!.replace(/\\n/g, "\n").trim(),
    alipayPublicKey: env.alipayPublicKey!.replace(/\\n/g, "\n").trim(),
    gateway: env.alipayGateway!,
    signType: "RSA2",
  });
  return { client, env };
}

// Web 支付（PC 页面）：alipay.trade.page.pay -> 返回可自动提交的 form HTML
export async function createAlipayPagePay(input: CreateOrderInput) {
  const { client, env } = createAlipayClient();
  const notifyUrl = new URL("/api/pay/alipay/notify", env.appBaseUrl).toString();
  const returnUrl = input.returnUrl || new URL("/pay/return", env.appBaseUrl).toString();

  const params = {
    subject: input.subject,
    out_trade_no: input.orderId,
    total_amount: input.amount.toFixed(2),
    product_code: "FAST_INSTANT_TRADE_PAY",
    body: input.description,
  } as const;

  // 使用 pageExec 生成可提交的表单（含签名）
  const html = await client.pageExec("alipay.trade.page.pay", {
    notifyUrl,
    returnUrl,
    bizContent: params,
  });

  return { formHtml: html, notifyUrl, returnUrl };
}