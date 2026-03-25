import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '漫漫行銷｜資料整合與市場情報服務',
  description:
    '漫漫協助品牌、平台與商家蒐集、整理、監測並結構化公開資訊，讓價格、商品、競品與市場動態成為可用的商業情報。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  )
}
