import * as React from "react";

interface OrderItem {
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface OrderConfirmationProps {
  orderNumber: string;
  customerName: string;
  items: OrderItem[];
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
}

const paymentMethodLabel: Record<string, string> = {
  zelle: "💸 Zelle",
  pago_movil: "📱 Pago Móvil",
  stripe: "💳 Tarjeta",
  efectivo: "💵 Efectivo",
};

export function OrderConfirmationEmail({
  orderNumber,
  customerName,
  items,
  subtotal,
  shippingCost,
  total,
  paymentMethod,
  paymentReference,
  shippingAddress,
}: OrderConfirmationProps) {
  return (
    <html>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#f9fafb",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{ backgroundColor: "#f9fafb", padding: "40px 16px" }}
        >
          <tr>
            <td align="center">
              <table
                width="100%"
                cellPadding={0}
                cellSpacing={0}
                style={{
                  maxWidth: 600,
                  backgroundColor: "#ffffff",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                {/* Header */}
                <tr>
                  <td
                    style={{
                      backgroundColor: "#15803d",
                      padding: "32px 40px",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: 24,
                        fontWeight: 700,
                        color: "#ffffff",
                      }}
                    >
                      🌿 Yomi&apos;s Garden
                    </p>
                    <p
                      style={{
                        margin: "8px 0 0",
                        fontSize: 14,
                        color: "#bbf7d0",
                      }}
                    >
                      Vivero artesanal venezolano
                    </p>
                  </td>
                </tr>

                {/* Body */}
                <tr>
                  <td style={{ padding: "32px 40px" }}>
                    <p
                      style={{
                        margin: "0 0 8px",
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#111827",
                      }}
                    >
                      ¡Pedido confirmado! 🎉
                    </p>
                    <p
                      style={{
                        margin: "0 0 24px",
                        fontSize: 15,
                        color: "#6b7280",
                      }}
                    >
                      Hola {customerName}, recibimos tu pedido y lo estamos
                      procesando.
                    </p>

                    {/* Número de pedido */}
                    <div
                      style={{
                        backgroundColor: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        borderRadius: 12,
                        padding: "16px 20px",
                        marginBottom: 24,
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: 13,
                          color: "#15803d",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: 1,
                        }}
                      >
                        Número de pedido
                      </p>
                      <p
                        style={{
                          margin: "4px 0 0",
                          fontSize: 22,
                          fontWeight: 700,
                          color: "#15803d",
                          fontFamily: "monospace",
                        }}
                      >
                        {orderNumber}
                      </p>
                    </div>

                    {/* Productos */}
                    <p
                      style={{
                        margin: "0 0 12px",
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#111827",
                      }}
                    >
                      Productos pedidos
                    </p>
                    <table
                      width="100%"
                      cellPadding={0}
                      cellSpacing={0}
                      style={{ marginBottom: 24 }}
                    >
                      {items.map((item, i) => (
                        <tr
                          key={i}
                          style={{ borderBottom: "1px solid #f3f4f6" }}
                        >
                          <td
                            style={{
                              padding: "10px 0",
                              fontSize: 14,
                              color: "#374151",
                            }}
                          >
                            {item.product_name}
                            <span style={{ color: "#9ca3af", marginLeft: 6 }}>
                              × {item.quantity}
                            </span>
                          </td>
                          <td
                            style={{
                              padding: "10px 0",
                              fontSize: 14,
                              color: "#111827",
                              fontWeight: 600,
                              textAlign: "right",
                            }}
                          >
                            ${Number(item.total_price).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td
                          style={{
                            padding: "12px 0 4px",
                            fontSize: 14,
                            color: "#6b7280",
                          }}
                        >
                          Subtotal
                        </td>
                        <td
                          style={{
                            padding: "12px 0 4px",
                            fontSize: 14,
                            color: "#374151",
                            textAlign: "right",
                          }}
                        >
                          ${subtotal.toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            padding: "4px 0",
                            fontSize: 14,
                            color: "#6b7280",
                          }}
                        >
                          Envío
                        </td>
                        <td
                          style={{
                            padding: "4px 0",
                            fontSize: 14,
                            color: "#15803d",
                            textAlign: "right",
                          }}
                        >
                          {shippingCost === 0
                            ? "A coordinar"
                            : `$${shippingCost.toFixed(2)}`}
                        </td>
                      </tr>
                      <tr style={{ borderTop: "2px solid #f3f4f6" }}>
                        <td
                          style={{
                            padding: "12px 0 0",
                            fontSize: 16,
                            fontWeight: 700,
                            color: "#111827",
                          }}
                        >
                          Total
                        </td>
                        <td
                          style={{
                            padding: "12px 0 0",
                            fontSize: 16,
                            fontWeight: 700,
                            color: "#15803d",
                            textAlign: "right",
                          }}
                        >
                          ${total.toFixed(2)}
                        </td>
                      </tr>
                    </table>

                    {/* Pago */}
                    <div
                      style={{
                        backgroundColor: "#fffbeb",
                        border: "1px solid #fde68a",
                        borderRadius: 12,
                        padding: "16px 20px",
                        marginBottom: 24,
                      }}
                    >
                      <p
                        style={{
                          margin: "0 0 4px",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#92400e",
                        }}
                      >
                        Método de pago
                      </p>
                      <p style={{ margin: 0, fontSize: 15, color: "#78350f" }}>
                        {paymentMethodLabel[paymentMethod] ?? paymentMethod}
                      </p>
                      {paymentReference && (
                        <p
                          style={{
                            margin: "4px 0 0",
                            fontSize: 13,
                            color: "#92400e",
                          }}
                        >
                          Referencia: {paymentReference}
                        </p>
                      )}
                    </div>

                    {/* Dirección */}
                    <div
                      style={{
                        backgroundColor: "#f9fafb",
                        borderRadius: 12,
                        padding: "16px 20px",
                        marginBottom: 24,
                      }}
                    >
                      <p
                        style={{
                          margin: "0 0 8px",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#374151",
                          textTransform: "uppercase",
                          letterSpacing: 1,
                        }}
                      >
                        Dirección de envío
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 14,
                          color: "#6b7280",
                          lineHeight: 1.6,
                        }}
                      >
                        {shippingAddress.address_line1}
                        <br />
                        {shippingAddress.address_line2 && (
                          <>
                            {shippingAddress.address_line2}
                            <br />
                          </>
                        )}
                        {shippingAddress.city}, {shippingAddress.state}
                        <br />
                        {shippingAddress.country}
                      </p>
                    </div>

                    {/* Próximos pasos */}
                    <div
                      style={{
                        backgroundColor: "#f0fdf4",
                        borderRadius: 12,
                        padding: "16px 20px",
                      }}
                    >
                      <p
                        style={{
                          margin: "0 0 8px",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#15803d",
                        }}
                      >
                        ¿Qué sigue?
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 14,
                          color: "#166534",
                          lineHeight: 1.6,
                        }}
                      >
                        Nos pondremos en contacto contigo para confirmar el pago
                        y coordinar el envío. Puedes ver el estado de tu pedido
                        en nuestra tienda.
                      </p>
                    </div>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td
                    style={{
                      backgroundColor: "#f9fafb",
                      padding: "24px 40px",
                      textAlign: "center",
                      borderTop: "1px solid #f3f4f6",
                    }}
                  >
                    <p style={{ margin: 0, fontSize: 13, color: "#9ca3af" }}>
                      © {new Date().getFullYear()} Yomi&apos;s Garden ·
                      Venezuela
                    </p>
                    <p
                      style={{
                        margin: "4px 0 0",
                        fontSize: 13,
                        color: "#9ca3af",
                      }}
                    >
                      📱 @yomisgarden · ✉️ hola@yomisgarden.com
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
}
