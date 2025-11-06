import { NextRequest } from "next/server";
import { CreateOrderInput } from "@/lib/payments/config";
import { createAlipayPagePay } from "@/lib/payments/alipay";
// WeChat disabled for now

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { method, orderId, amount, subject, description, returnUrl } = (await req.json()) as {
      method: "alipay" | "wechat";
      orderId: string;
      amount: number;
      subject: string;
      description?: string;
      returnUrl?: string;
    };

    if (!method || !orderId || !amount || !subject) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const input: CreateOrderInput = { orderId, amount, subject, description, returnUrl };

    if (method === "alipay") {
      const res = await createAlipayPagePay(input);
      return new Response(JSON.stringify({ method, formHtml: res.formHtml, notifyUrl: res.notifyUrl, returnUrl: res.returnUrl }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (method === "wechat") {
      return new Response(JSON.stringify({ error: "WeChat Pay is temporarily disabled" }), { status: 400 });
    }

    return new Response(JSON.stringify({ error: "Unsupported method" }), { status: 400 });
  } catch (e: any) {
    try {
      console.error("[pay/create] error:", e?.message || e);
      console.error("[pay/create] detail:", JSON.stringify({ message: e?.message, stack: e?.stack }, null, 2));
    } catch {}
    return new Response(JSON.stringify({ error: e?.message || "Internal error" }), { status: 500 });
  }
}