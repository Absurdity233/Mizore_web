import { NextRequest } from "next/server";
import { getPayEnv } from "@/lib/payments/config";
import * as crypto from "crypto";
import qs from "querystring";

export const dynamic = "force-dynamic";

// 简化版 Alipay 异步通知（验签基础骨架）
export async function POST(req: NextRequest) {
  const env = getPayEnv();
  const text = await req.text();
  const params = qs.parse(text);

  // 验签（RSA2）：sign_type=RSA2，使用 Alipay 公钥验证
  try {
    const sign = params.sign as string;
    const signType = params.sign_type as string;
    if (!sign || signType !== "RSA2" || !env.alipayPublicKey) {
      return new Response("failure", { status: 400 });
    }

    const { sign_type, sign: _, ...unsigned } = params as any;
    const content = Object.keys(unsigned)
      .sort()
      .map((k) => `${k}=${unsigned[k]}`)
      .join("&");

    const verifier = crypto.createVerify("RSA-SHA256");
    verifier.update(content);
    const ok = verifier.verify(env.alipayPublicKey, sign, "base64");
    if (!ok) return new Response("failure", { status: 400 });

    // TODO: 根据 trade_status 处理订单
    // e.g. TRADE_SUCCESS / TRADE_FINISHED

    return new Response("success");
  } catch (e) {
    return new Response("failure", { status: 500 });
  }
}