'use client'

import { useState, useEffect, useRef } from 'react'
import {
  BarChart3,
  ShoppingBag,
  Globe,
  Database,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  Bell,
  FileText,
  Layers,
  Clock,
  Target,
  Shield,
  Zap,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: '服務內容', href: '#services' },
  { label: '運作流程', href: '#process' },
  { label: '適合客戶', href: '#clients' },
  { label: '方案報價', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

const PAIN_POINTS = [
  {
    icon: Globe,
    title: '資料分散在不同網站與平台',
    desc: '競品資訊、市場行情、公告更新分布在十幾個來源，每次追蹤都是大工程。',
  },
  {
    icon: Layers,
    title: '同商品名稱混亂，難以整併比較',
    desc: '各平台命名規則不同，整理時人工比對耗時，稍有疏漏就影響分析結果。',
  },
  {
    icon: Clock,
    title: '人工追價、追新品、追公告太耗時',
    desc: '靠人力定期巡視，不僅效率低，還容易漏抓關鍵時間點的資料變動。',
  },
  {
    icon: Target,
    title: '抓到資料後仍無法直接決策使用',
    desc: '資料格式雜亂、欄位不一致，還需要二次清洗，根本無法直接進報表或系統。',
  },
]

const SERVICES = [
  {
    icon: TrendingUp,
    title: '價格監測',
    desc: '持續追蹤指定商品或品類在各通路的售價、促銷與異動，讓你不錯過任何競品定價變化。',
    tags: ['電商平台', '通路比價', '促銷追蹤'],
  },
  {
    icon: ShoppingBag,
    title: '商品資料整理',
    desc: '蒐集公開商品資訊，依你需要的欄位整理成標準化格式，供上架、建檔或分析使用。',
    tags: ['商品建檔', '欄位標準化', 'CSV/Excel'],
  },
  {
    icon: BarChart3,
    title: '市場情報監測',
    desc: '定期彙整指定市場的新品動態、品牌公告、趨勢報導，讓你快速掌握市場脈動。',
    tags: ['競品追蹤', '新品動態', '品牌公告'],
  },
  {
    icon: Database,
    title: '客製資料建置',
    desc: '依照你的業務邏輯，建立專屬資料流程，含多來源整合、歷史資料保存與 API 串接。',
    tags: ['多來源整合', '歷史留存', 'API 串接'],
  },
]

const PROCESS_STEPS = [
  {
    step: '01',
    title: '需求確認',
    desc: '了解你的目標來源、需要的欄位、更新頻率與交付方式，確保雙方對齊再開始。',
  },
  {
    step: '02',
    title: '資料評估',
    desc: '評估目標網站的資料可及性、結構穩定度與法律邊界，提出可行的執行方案。',
  },
  {
    step: '03',
    title: '建立流程',
    desc: '建置自動化資料蒐集、清洗與整理流程，確認格式與欄位符合你的使用需求。',
  },
  {
    step: '04',
    title: '持續更新',
    desc: '依約定頻率維護資料流程，提供異常通知、定期報表與欄位調整服務。',
  },
]

const TARGET_CLIENTS = [
  '電商品牌',
  '通路商與代理商',
  '垂直產業平台',
  '早期新創團隊',
  '行銷顧問公司',
  '需長期市場監測的企業',
  '價格敏感型商家',
  '商品採購與選品團隊',
]

const PRICING_PLANS = [
  {
    name: '資料整理版',
    tag: '方案 A',
    price: 'NT$8,000 ～ 20,000',
    unit: '/ 月',
    highlight: false,
    desc: '適合需要固定整理少量來源資料的電商品牌或採購團隊。',
    features: [
      '1 ～ 3 個資料來源',
      '指定欄位整理與清洗',
      'CSV / Excel 格式交付',
      '每週或每日更新',
      'Email 定期交付報表',
    ],
  },
  {
    name: '監測通知版',
    tag: '方案 B',
    price: 'NT$20,000 ～ 60,000',
    unit: '/ 月',
    highlight: true,
    desc: '適合需要掌握價格波動、上下架通知與競品動態的通路商或品牌。',
    features: [
      '3 ～ 10 個資料來源',
      '價格異動 / 上下架 / 補貨監測',
      '定期更新與異動通知',
      '標準報表輸出',
      '月度資料回顧摘要',
    ],
  },
  {
    name: '客製資料中台版',
    tag: '方案 C',
    price: '建置費 NT$80,000 起',
    unit: '',
    highlight: false,
    desc: '適合需要長期穩定資料流、歷史留存與系統整合的平台或企業。',
    features: [
      '多來源整合與規則設定',
      '客製欄位與資料邏輯',
      '歷史資料留存查詢',
      'API / 後台 / 系統串接',
      '月維護費 NT$20,000 起',
    ],
  },
]

const FAQ_ITEMS = [
  {
    q: '你們是不是什麼網站都能處理？',
    a: '不是。我們在接案前會先評估目標網站的資料結構、可及性與法律邊界。若來源有反爬蟲保護、登入牆或不允許公開取用的明確聲明，我們會在評估階段告知可行性與替代方案，而非強行嘗試。',
  },
  {
    q: '可以做一次性專案嗎？',
    a: '可以。部分客戶有一次性的商品建檔、競品資料蒐集或市場調查需求，我們接受專案型合作。費用依資料量、來源數與處理複雜度報價，通常在 NT$8,000 ～ NT$50,000 之間。',
  },
  {
    q: '可以長期監測嗎？',
    a: '這是我們的核心服務之一。長期監測包含固定更新頻率、異動通知、歷史資料保存，以及流程維護。適合需要長期掌握市場動態、競品定價或商品上下架的團隊。',
  },
  {
    q: '交付內容是什麼？',
    a: '依方案不同，交付物包含：結構化的 CSV / Excel 檔案、定期報表、異動通知（Email / Webhook）、或 API 介面存取。我們在需求確認階段會明確訂定交付格式與頻率，確保符合你的使用情境。',
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#D97706] flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold text-base tracking-tight">
              漫漫行銷
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D97706] hover:bg-[#b45309] text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-amber-900/30"
            >
              立即諮詢
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-zinc-400 hover:text-white p-2"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-[#0d0d0d]/98 backdrop-blur-md border-t border-white/5 px-6 py-4">
          <div className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors py-1"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#D97706] text-white text-sm font-medium rounded-lg"
              onClick={() => setOpen(false)}
            >
              立即諮詢
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

function DashboardMockup() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Glow */}
      <div className="absolute inset-0 bg-amber-500/10 blur-3xl rounded-full scale-110 pointer-events-none" />

      {/* Main card */}
      <div className="relative bg-zinc-900/80 border border-white/8 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl">
        {/* Header bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-zinc-900/50">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 mx-3 h-5 bg-white/5 rounded-md" />
          <div className="text-xs text-zinc-500">即時監測中</div>
        </div>

        <div className="p-4 space-y-3">
          {/* Top stats */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: '監測來源', val: '12', unit: '個' },
              { label: '今日更新', val: '847', unit: '筆' },
              { label: '異動通知', val: '3', unit: '則' },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-zinc-800/60 rounded-xl p-3 text-center"
              >
                <div className="text-lg font-bold text-white">
                  {s.val}
                  <span className="text-xs text-zinc-400 font-normal ml-0.5">
                    {s.unit}
                  </span>
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Price trend bars */}
          <div className="bg-zinc-800/40 rounded-xl p-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-zinc-400 font-medium">價格趨勢 · 近 7 日</span>
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +2.4%
              </span>
            </div>
            <div className="flex items-end gap-1.5 h-14">
              {[55, 48, 62, 58, 70, 65, 80].map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t-sm transition-all ${
                    i === 6 ? 'bg-amber-500' : 'bg-zinc-600/60'
                  }`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1">
              {['一', '二', '三', '四', '五', '六', '日'].map((d) => (
                <span key={d} className="text-xs text-zinc-600 flex-1 text-center">
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Product rows */}
          <div className="space-y-1.5">
            {[
              { name: '競品 A · 旗艦款', price: 'NT$4,280', change: '-3.2%', down: true },
              { name: '競品 B · 標準款', price: 'NT$2,990', change: '+1.5%', down: false },
              { name: '競品 C · 促銷版', price: 'NT$1,680', change: '-8.1%', down: true },
            ].map((row) => (
              <div
                key={row.name}
                className="flex items-center justify-between bg-zinc-800/40 rounded-lg px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span className="text-xs text-zinc-300">{row.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white font-medium">{row.price}</span>
                  <span
                    className={`text-xs font-medium ${
                      row.down ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {row.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Alert */}
          <div className="flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2.5">
            <Bell className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-xs text-amber-300">競品 A 今日降價 3.2%，已發送通知</span>
          </div>
        </div>
      </div>

      {/* Floating tag */}
      <div className="absolute -top-3 -right-3 bg-zinc-800 border border-white/10 rounded-xl px-3 py-1.5 shadow-xl">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-zinc-300 font-medium">即時同步中</span>
        </div>
      </div>
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className={`border rounded-xl transition-all duration-200 ${
        open
          ? 'border-amber-500/30 bg-amber-500/5'
          : 'border-white/8 bg-zinc-900/40 hover:border-white/15'
      }`}
    >
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-medium text-zinc-100 pr-4">{q}</span>
        <ChevronDown
          className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180 text-amber-400' : ''
          }`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-sm text-zinc-400 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

// ─── Section Components ───────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
      <span className="text-xs text-amber-400 font-medium tracking-wide uppercase">
        {children}
      </span>
    </div>
  )
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#080808]">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-amber-600/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <SectionLabel>資料整合與市場情報</SectionLabel>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.15] tracking-tight mb-6">
              把分散的公開
              <br />
              網路資料，
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                整理成可用的
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                商業情報
              </span>
            </h1>

            <p className="text-base lg:text-lg text-zinc-400 leading-relaxed mb-8 max-w-lg">
              漫漫協助品牌、平台與商家蒐集、整理、監測並結構化公開資訊，讓價格、商品、競品與市場動態，不再只是零散資訊，而是能真正拿來決策的資料。
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D97706] hover:bg-[#b45309] text-white font-medium rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-amber-900/30 hover:-translate-y-0.5"
              >
                立即諮詢
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-medium rounded-xl transition-all duration-200"
              >
                查看服務內容
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-10">
              {['合法公開資料', '結構化交付', '持續維護更新'].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  <span className="text-sm text-zinc-400">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dashboard */}
          <div className="hidden lg:block">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

function PainPointsSection() {
  return (
    <section id="pain-points" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/20 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionLabel>痛點</SectionLabel>
          <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
            你缺的不是資料，
            <br className="sm:hidden" />
            而是能直接拿來用的結果
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-base leading-relaxed">
            很多團隊並不缺乏資料意識，缺的是讓資料可操作的基礎建設。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PAIN_POINTS.map((p, i) => (
            <div
              key={i}
              className="group relative bg-zinc-900/60 border border-white/6 hover:border-amber-500/25 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center mb-4 group-hover:bg-amber-500/15 transition-colors">
                <p.icon className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-100 mb-2 leading-snug">
                {p.title}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionLabel>服務內容</SectionLabel>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            我們可以幫你做什麼
          </h2>
          <p className="mt-4 text-zinc-400 max-w-lg mx-auto text-base leading-relaxed">
            從單次資料整理到長期監測流程，我們依照你的業務場景設計對應的資料方案。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className="group relative bg-zinc-900/50 border border-white/6 hover:border-amber-500/25 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/10 border border-amber-500/15 flex items-center justify-center mb-5 group-hover:from-amber-500/30 transition-all">
                <s.icon className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed flex-1">{s.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-zinc-800 text-zinc-400 rounded-md border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section id="process" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionLabel>運作流程</SectionLabel>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            從需求確認到資料交付，流程清楚可控
          </h2>
          <p className="mt-4 text-zinc-400 max-w-lg mx-auto text-base leading-relaxed">
            每一個合作案都從對齊需求開始，確保你的資源投入在真正有價值的地方。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((s, i) => (
            <div key={i} className="relative">
              {/* Connector line */}
              {i < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-amber-500/30 to-transparent z-0 translate-x-0" />
              )}

              <div className="relative bg-zinc-900/50 border border-white/6 rounded-2xl p-6 h-full group hover:border-amber-500/20 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl font-black text-amber-500/15 group-hover:text-amber-500/25 transition-colors leading-none">
                    {s.step}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                  </div>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ClientsSection() {
  return (
    <section id="clients" className="py-24 bg-[#080808] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/3 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <SectionLabel>適合客戶</SectionLabel>
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          哪些團隊適合這項服務
        </h2>
        <p className="text-zinc-400 mb-12 max-w-lg mx-auto text-base leading-relaxed">
          只要你的工作需要定期蒐集、比較或追蹤公開網路資訊，我們都值得聊聊。
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          {TARGET_CLIENTS.map((label, i) => (
            <div
              key={i}
              className="px-5 py-2.5 bg-zinc-900/70 border border-white/8 hover:border-amber-500/30 hover:bg-zinc-900 rounded-full text-sm text-zinc-300 hover:text-white transition-all duration-200 cursor-default hover:-translate-y-0.5"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionLabel>方案報價</SectionLabel>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            依需求選擇合適的合作方式
          </h2>
          <p className="mt-4 text-zinc-400 max-w-lg mx-auto text-base">
            每個方案都可根據實際需求調整，也歡迎討論混合方案。
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {PRICING_PLANS.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                plan.highlight
                  ? 'bg-gradient-to-b from-amber-500/10 to-zinc-900/80 border-2 border-amber-500/40 shadow-2xl shadow-amber-900/20'
                  : 'bg-zinc-900/50 border border-white/6 hover:border-white/12'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1 bg-amber-500 rounded-full text-xs text-white font-semibold shadow-lg">
                    最受歡迎
                  </div>
                </div>
              )}

              <div className="p-7 flex flex-col flex-1">
                <div className="mb-5">
                  <div className="text-xs text-amber-500 font-semibold tracking-widest uppercase mb-1">
                    {plan.tag}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{plan.desc}</p>
                </div>

                <div className="py-5 border-y border-white/6 mb-5">
                  <div className="text-2xl font-bold text-white leading-tight">
                    {plan.price}
                  </div>
                  {plan.unit && (
                    <div className="text-sm text-zinc-500 mt-0.5">{plan.unit}</div>
                  )}
                </div>

                <ul className="space-y-2.5 flex-1 mb-7">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-zinc-300">{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`w-full text-center py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    plan.highlight
                      ? 'bg-amber-500 hover:bg-amber-400 text-white shadow-lg shadow-amber-900/30 hover:shadow-amber-900/50'
                      : 'bg-white/6 hover:bg-white/10 border border-white/8 hover:border-white/15 text-zinc-200 hover:text-white'
                  }`}
                >
                  諮詢此方案
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-zinc-600">
          實際報價將依來源數量、更新頻率、資料清洗程度與交付方式調整。
        </p>
      </div>
    </section>
  )
}

function EthicsSection() {
  return (
    <section className="py-24 bg-[#080808] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-amber-500/3 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-6">
          <Shield className="w-7 h-7 text-amber-500" />
        </div>
        <SectionLabel>服務原則</SectionLabel>
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
          我們重視可行性，也重視邊界
        </h2>
        <p className="text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          漫漫資料服務以合法取得之公開資料或客戶授權資料為原則，重視資料可用性、穩定性與權利邊界，不提供破解限制、繞過保護措施或侵害第三方權利之服務。
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mt-10">
          {[
            { icon: Zap, title: '合法公開資料為主', desc: '僅處理公開取得或客戶授權之資料來源' },
            { icon: Shield, title: '不繞過保護措施', desc: '拒絕破解、繞過或侵害任何平台限制的需求' },
            { icon: FileText, title: '透明評估後再執行', desc: '不確定可行性時，先評估後再決定是否承接' },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-zinc-900/40 border border-white/6 rounded-xl p-5 text-left"
            >
              <item.icon className="w-5 h-5 text-amber-500 mb-3" />
              <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section id="faq" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel>常見問題</SectionLabel>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            你可能想先問的事
          </h2>
        </div>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-[#080808] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/3 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-b from-zinc-900/80 to-zinc-900/40 border border-white/8 rounded-3xl p-10 lg:p-16 backdrop-blur-sm shadow-2xl">
          <SectionLabel>開始合作</SectionLabel>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            把人工整理資料的時間，
            <br />
            留給更重要的決策
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed max-w-xl mx-auto mb-10">
            如果你正在煩惱價格追蹤、商品建檔、競品整理或市場資訊更新，歡迎和漫漫聊聊，我們可以先協助你評估最適合的資料方案。
          </p>

          {/* Contact Form */}
          <div className="grid sm:grid-cols-2 gap-4 mb-4 text-left">
            <div>
              <label className="block text-xs text-zinc-400 mb-2">公司或品牌名稱</label>
              <input
                type="text"
                placeholder="漫漫行銷"
                className="w-full bg-zinc-800/60 border border-white/8 hover:border-white/15 focus:border-amber-500/50 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-2">聯絡 Email</label>
              <input
                type="email"
                placeholder="hello@example.com"
                className="w-full bg-zinc-800/60 border border-white/8 hover:border-white/15 focus:border-amber-500/50 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-all"
              />
            </div>
          </div>
          <div className="mb-4 text-left">
            <label className="block text-xs text-zinc-400 mb-2">簡短描述你的需求</label>
            <textarea
              rows={4}
              placeholder="例如：希望追蹤特定競品在 PChome、momo 的每日定價變化，並以 Excel 格式每週交付..."
              className="w-full bg-zinc-800/60 border border-white/8 hover:border-white/15 focus:border-amber-500/50 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-all resize-none"
            />
          </div>
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#D97706] hover:bg-[#b45309] text-white font-medium rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-amber-900/30 hover:-translate-y-0.5">
            預約諮詢
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="mt-4 text-xs text-zinc-600">
            我們通常在 1～2 個工作日內回覆，說明可行性與後續步驟。
          </p>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/5 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#D97706] flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold text-base">漫漫行銷</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              資料整合與市場情報服務。協助品牌、平台與商家把公開資料，轉化為可用的商業決策依據。
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mb-4">
              服務
            </h4>
            <ul className="space-y-2.5">
              {['價格監測', '商品資料整理', '市場情報監測', '客製資料建置'].map((s) => (
                <li key={s}>
                  <a href="#services" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mb-4">
              快速連結
            </h4>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600">
            © 2024 漫漫行銷｜資料整合與市場情報服務。保留一切權利。
          </p>
          <p className="text-xs text-zinc-700">
            本服務以合法公開資料為原則，資料使用受各平台服務條款約束。
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ManManPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white antialiased">
      <Navbar />
      <HeroSection />
      <PainPointsSection />
      <ServicesSection />
      <ProcessSection />
      <ClientsSection />
      <PricingSection />
      <EthicsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
