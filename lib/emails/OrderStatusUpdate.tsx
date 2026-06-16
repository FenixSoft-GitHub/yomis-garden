import * as React from "react";

interface OrderStatusUpdateProps {
  orderNumber: string;
  customerName: string;
  status: string;
  total: number;
}

const statusConfig: Record<
  string,
  { label: string; message: string; color: string; emoji: string }
> = {
  confirmed: {
    label: "Confirmado",
    message: "Tu pedido ha sido confirmado y estamos verificando el pago.",
    color: "#1d4ed8",
    emoji: "✅",
  },
  preparing: {
    label: "En preparación",
    message:
      "Estamos preparando tu pedido con mucho cuidado. ¡Tus plantas pronto estarán listas!",
    color: "#7c3aed",
    emoji: "🌿",
  },
  shipped: {
    label: "Enviado",
    message: "Tu pedido está en camino. Pronto recibirás tu cargamento verde.",
    color: "#0369a1",
    emoji: "🚚",
  },
  delivered: {
    label: "Entregado",
    message:
      "¡Tu pedido fue entregado! Esperamos que disfrutes tus nuevas plantas.",
    color: "#15803d",
    emoji: "🎉",
  },
  cancelled: {
    label: "Cancelado",
    message: "Tu pedido ha sido cancelado. Si tienes dudas, contáctanos.",
    color: "#dc2626",
    emoji: "❌",
  },
};

export function OrderStatusUpdateEmail({
  orderNumber,
  customerName,
  status,
  total,
}: OrderStatusUpdateProps) {
  const config = statusConfig[status] ?? {
    label: status,
    message: "El estado de tu pedido ha sido actualizado.",
    color: "#374151",
    emoji: "📦",
  };

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
                  </td>
                </tr>

                {/* Body */}
                <tr>
                  <td style={{ padding: "32px 40px" }}>
                    <div style={{ textAlign: "center", marginBottom: 24 }}>
                      <p style={{ fontSize: 48, margin: "0 0 8px" }}>
                        {config.emoji}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 22,
                          fontWeight: 700,
                          color: config.color,
                        }}
                      >
                        Pedido {config.label}
                      </p>
                    </div>

                    <p
                      style={{
                        fontSize: 15,
                        color: "#6b7280",
                        textAlign: "center",
                        margin: "0 0 24px",
                      }}
                    >
                      Hola {customerName}, {config.message}
                    </p>

                    <div
                      style={{
                        backgroundColor: "#f9fafb",
                        borderRadius: 12,
                        padding: "16px 20px",
                        textAlign: "center",
                      }}
                    >
                      <p
                        style={{
                          margin: "0 0 4px",
                          fontSize: 13,
                          color: "#9ca3af",
                        }}
                      >
                        Pedido
                      </p>
                      <p
                        style={{
                          margin: "0 0 4px",
                          fontSize: 20,
                          fontWeight: 700,
                          color: "#111827",
                          fontFamily: "monospace",
                        }}
                      >
                        {orderNumber}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 15,
                          fontWeight: 600,
                          color: "#15803d",
                        }}
                      >
                        ${total.toFixed(2)}
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
                      © {new Date().getFullYear()} Yomi&apos;s Garden · Venezuela
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
