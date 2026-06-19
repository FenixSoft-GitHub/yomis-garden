import * as React from 'react'

interface WateringReminderProps {
  customerName: string
  plants: { nickname: string; productName?: string }[]
}

export function WateringReminderEmail({ customerName, plants }: WateringReminderProps) {
  return (
    <html>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f9fafb', fontFamily: 'system-ui, sans-serif' }}>
        <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: '#f9fafb', padding: '40px 16px' }}>
          <tr>
            <td align="center">
              <table width="100%" cellPadding={0} cellSpacing={0} style={{ maxWidth: 600, backgroundColor: '#ffffff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <tr>
                  <td style={{ backgroundColor: '#0284c7', padding: '32px 40px', textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: 40 }}>💧</p>
                    <p style={{ margin: '8px 0 0', fontSize: 22, fontWeight: 700, color: '#ffffff' }}>
                      ¡Hora de regar!
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '32px 40px' }}>
                    <p style={{ fontSize: 15, color: '#6b7280', margin: '0 0 20px' }}>
                      Hola {customerName}, las siguientes plantas necesitan agua hoy:
                    </p>
                    {plants.map((plant, i) => (
                      <div
                        key={i}
                        style={{
                          backgroundColor: '#f0f9ff',
                          borderRadius: 12,
                          padding: '14px 18px',
                          marginBottom: 10,
                          display: 'flex',
                        }}
                      >
                        <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#0c4a6e' }}>
                          🌿 {plant.nickname}
                        </p>
                        {plant.productName && (
                          <p style={{ margin: '2px 0 0', fontSize: 13, color: '#0369a1' }}>
                            {plant.productName}
                          </p>
                        )}
                      </div>
                    ))}
                    <div style={{ textAlign: 'center', marginTop: 24 }}>
                      <a
                        href={`${process.env.NEXT_PUBLIC_APP_URL}/mis-plantas`}
                        style={{
                          display: 'inline-block',
                          backgroundColor: '#15803d',
                          color: '#ffffff',
                          textDecoration: 'none',
                          padding: '12px 28px',
                          borderRadius: 10,
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                      >
                        Ver mis plantas
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: '#f9fafb', padding: '20px 40px', textAlign: 'center', borderTop: '1px solid #f3f4f6' }}>
                    <p style={{ margin: 0, fontSize: 12, color: '#9ca3af' }}>
                      🌿 Yomi&apos;s Garden · Recordatorio automático de riego
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  )
}