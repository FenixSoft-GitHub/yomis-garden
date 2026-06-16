import { Resend } from "resend";
import { OrderConfirmationEmail } from "./OrderConfirmation";
import { OrderStatusUpdateEmail } from "./OrderStatusUpdate";
import * as React from "react";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY no configurada");
  return new Resend(apiKey);
}

function getFrom() {
  return `Yomi's Garden <${process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"}>`;
}

function getTo(email: string) {
  return process.env.NODE_ENV === "development"
    ? (process.env.RESEND_TEST_EMAIL ?? email)
    : email;
}

export async function sendOrderConfirmation(params: {
  to: string;
  orderNumber: string;
  customerName: string;
  items: {
    product_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }[];
  subtotal: number;
  shippingCost: number;
  total: number;
  paymentMethod: string;
  paymentReference?: string;
  shippingAddress: {
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    country: string;
  };
}) {
  try {
    const resend = getResend();
    await resend.emails.send({
      from: getFrom(),
      to: getTo(params.to),
      subject: `✅ Pedido confirmado ${params.orderNumber} — Yomi's Garden`,
      react: React.createElement(OrderConfirmationEmail, params),
    });
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
  }
}

export async function sendOrderStatusUpdate(params: {
  to: string;
  orderNumber: string;
  customerName: string;
  status: string;
  total: number;
}) {
  try {
    const resend = getResend();
    await resend.emails.send({
      from: getFrom(),
      to: getTo(params.to),
      subject: `📦 Tu pedido ${params.orderNumber} fue actualizado — Yomi's Garden`,
      react: React.createElement(OrderStatusUpdateEmail, params),
    });
  } catch (error) {
    console.error("Error sending status update email:", error);
  }
}
