'use client'

import { Share2, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { WhatsAppSVG } from './WhatsAppSVG'

interface ShareButtonsProps {
  productName: string
  productUrl: string
  price: number
}

export default function ShareButtons({
  productName,
  productUrl,
  price,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const whatsappMessage = encodeURIComponent(
    `🌿 Mira este producto en Yomi's Garden:\n*${productName}* — $${price.toFixed(2)}\n${productUrl}`
  )

  const handleCopy = async () => {
    await navigator.clipboard.writeText(productUrl)
    setCopied(true)
    toast.success('¡Enlace copiado!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
        <Share2 className="size-3" />
        Compartir:
      </span>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-950/80 px-3 py-1.5 rounded-lg border border-green-300 dark:border-green-800 transition-colors"
      >
        <WhatsAppSVG
          size={3}
          className={"fill-green-700 dark:fill-green-400"}
        />
        WhatsApp
      </a>

      {/* Copiar enlace */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 text-xs bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 transition-colors"
      >
        {copied ? (
          <Check className="size-3 text-green-500" />
        ) : (
          <Copy className="size-3" />
        )}
        {copied ? "¡Copiado!" : "Copiar"}
      </button>
    </div>
  );
}