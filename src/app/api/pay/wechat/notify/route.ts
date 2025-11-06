import { NextRequest } from "next/server";
import { getPayEnv } from "@/lib/payments/config";
import * as crypto from "crypto";

export const dynamic = "force-dynamic";

// 微信支付 v3 回调：请求体为 JSON，resource 使用 AEAD_AES_256_GCM 加密
export async function POST(req: NextRequest) {
  try {
    const env = getPayEnv();
    const json = await req.json();
    const { resource } = json || {};

    if (!env.wechatNotifyKey || !resource) {
      return new Response(JSON.stringify({ code: "ERROR", message: "missing key or resource" }), { status: 400 });
    }

    const { ciphertext, nonce, associated_data } = resource;
    const key = Buffer.from(env.wechatNotifyKey, "utf8");
    const aad = Buffer.from(associated_data || "", "utf8");
    const iv = Buffer.from(nonce, "utf8");
    const data = Buffer.from(ciphertext, "base64");

    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(data.slice(data.length - 16));
    if (aad.length) decipher.setAAD(aad, { plaintextLength: data.length - 16 });
    const decrypted = Buffer.concat([decipher.update(data.slice(0, -16)), decipher.final()]);
    const info = JSON.parse(decrypted.toString("utf8"));

    // TODO: 根据 info.trade_state 处理订单，例如 SUCCESS
    // 这里应更新订单状态，并返回成功响应
    return new Response(JSON.stringify({ code: "SUCCESS" }));
  } catch (e) {
    return new Response(JSON.stringify({ code: "ERROR" }), { status: 500 });
  }
}