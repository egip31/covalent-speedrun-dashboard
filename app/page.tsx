// app/page.tsx
"use client";

import React from "react";

type Wallet = {
  id: string;
  label: string;
  address: string;
};

type Chain = {
  id: string;
  name: string;
  short: string;
};

type SummaryCard = {
  label: string;
  value: string;
  sublabel?: string;
};

type Tx = {
  id: string;
  time: string;
  chain: string;
  type: "IN" | "OUT";
  token: string;
  amount: string;
  valueUsd: string;
};

const wallets: Wallet[] = [
  {
    id: "main",
    label: "Main Farming",
    address: "0x1234...abcd",
  },
  {
    id: "tuyul-1",
    label: "Tuyul #1",
    address: "0x9876...tuyul",
  },
  {
    id: "airdrop",
    label: "Airdrop Hunter",
    address: "0xaaaa...drop",
  },
];

const chains: Chain[] = [
  { id: "eth", name: "Ethereum", short: "ETH" },
  { id: "bsc", name: "BNB Chain", short: "BSC" },
  { id: "polygon", name: "Polygon", short: "POL" },
  { id: "base", name: "Base", short: "BASE" },
];

const summaryCards: SummaryCard[] = [
  {
    label: "Total Portfolio",
    value: "$12,450.32",
    sublabel: "All wallets · All chains",
  },
  {
    label: "24h Volume",
    value: "$3,210.77",
    sublabel: "IN + OUT across chains",
  },
  {
    label: "Net Flow 24h",
    value: "+$820.15",
    sublabel: "More in than out",
  },
  {
    label: "New Assets (7d)",
    value: "4",
    sublabel: "Potential airdrops / rewards",
  },
];

const recentTx: Tx[] = [
  {
    id: "1",
    time: "3m ago",
    chain: "Base",
    type: "IN",
    token: "USDC",
    amount: "250.00",
    valueUsd: "$250.00",
  },
  {
    id: "2",
    time: "27m ago",
    chain: "Ethereum",
    type: "OUT",
    token: "ETH",
    amount: "0.12",
    valueUsd: "$420.33",
  },
  {
    id: "3",
    time: "1h ago",
    chain: "BNB Chain",
    type: "IN",
    token: "POINTS",
    amount: "12,500",
    valueUsd: "$180.12",
  },
  {
    id: "4",
    time: "3h ago",
    chain: "Polygon",
    type: "IN",
    token: "AIRDROP",
    amount: "900",
    valueUsd: "$95.44",
  },
];

export default function DashboardPage() {
  const [selectedWallet, setSelectedWallet] = React.useState<Wallet>(wallets[0]);
  const [selectedChain, setSelectedChain] = React.useState<Chain | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-950/80 backdrop-blur-xl flex flex-col">
        <div className="px-5 py-4 border-b border-slate-800">
          <div className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Multichain
          </div>
          <div className="mt-1 text-lg font-semibold">
            Wallet Radar<span className="text-sky-400">.io</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Futuristic dashboard for tracking airdrops & onchain volume.
          </div>
        </div>

        <div className="px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-slate-500">
          Wallets
        </div>

        <nav className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
          {wallets.map((w) => (
            <button
              key={w.id}
              onClick={() => setSelectedWallet(w)}
              className={`w-full text-left rounded-xl px-3 py-2.5 mb-1 transition
                ${
                  selectedWallet.id === w.id
                    ? "bg-sky-500/20 border border-sky-500/40 shadow-[0_0_25px_rgba(56,189,248,0.4)]"
                    : "border border-slate-800/80 hover:border-slate-500/60 hover:bg-slate-900/70"
                }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium">{w.label}</span>
                {selectedWallet.id === w.id && (
                  <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
                )}
              </div>
              <div className="mt-1 text-[11px] text-slate-400 font-mono truncate">
                {w.address}
              </div>
            </button>
          ))}
        </nav>

        <div className="px-4 py-3 border-t border-slate-800 text-[11px] text-slate-500">
          <div className="flex items-center justify-between">
            <span>Mode</span>
            <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px]">
              Live · Demo
            </span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-950/70 backdrop-blur-xl">
          <div>
            <div className="text-xs text-slate-500">Active wallet</div>
            <div className="text-sm font-semibold">
              {selectedWallet.label}
              {selectedChain && (
                <span className="ml-2 text-[11px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                  {selectedChain.name}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Chain selector */}
            <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/80 px-2 py-1">
              {chains.map((c) => (
                <button
                  key={c.id}
                  onClick={() =>
                    setSelectedChain((prev) =>
                      prev?.id === c.id ? null : c,
                    )
                  }
                  className={`text-[11px] px-2.5 py-1 rounded-full transition ${
                    selectedChain?.id === c.id
                      ? "bg-sky-500 text-slate-950 shadow-[0_0_18px_rgba(56,189,248,0.8)]"
                      : "text-slate-300 hover:bg-slate-800/80"
                  }`}
                >
                  {c.short}
                </button>
              ))}
            </div>

            <button className="text-[11px] rounded-full border border-slate-700 px-3 py-1 hover:bg-slate-900/70">
              + Add wallet
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col gap-6 bg-[radial-gradient(circle_at_top,_#0f172a_0,_#020617_45%,_#000_100%)]">
          {/* Summary cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {summaryCards.map((card) => (
              <div
                key={card.label}
                className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 shadow-[0_0_25px_rgba(15,23,42,0.9)]"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-transparent to-purple-500/10 opacity-80 pointer-events-none" />
                <div className="relative">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                    {card.label}
                  </div>
                  <div className="mt-2 text-xl font-semibold text-slate-50">
                    {card.value}
                  </div>
                  {card.sublabel && (
                    <div className="mt-1 text-[11px] text-slate-400">
                      {card.sublabel}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </section>

          {/* Middle: chart placeholder + airdrop box */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Chart placeholder */}
            <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 shadow-[0_0_30px_rgba(15,23,42,0.9)]">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                    Portfolio flow
                  </div>
                  <div className="text-sm text-slate-300">
                    Volume and net value over time (dummy for now)
                  </div>
                </div>
                <div className="flex gap-1 text-[11px]">
                  <button className="px-2 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-200">
                    24h
                  </button>
                  <button className="px-2 py-1 rounded-full text-slate-400 hover:bg-slate-900 border border-slate-800">
                    7d
                  </button>
                  <button className="px-2 py-1 rounded-full text-slate-400 hover:bg-slate-900 border border-slate-800">
                    30d
                  </button>
                </div>
              </div>
              <div className="mt-3 h-44 rounded-xl border border-dashed border-slate-700/70 flex items-center justify-center text-xs text-slate-500">
                {/* nanti diisi Recharts */}
                Chart area – soon we plug real volume data here.
              </div>
            </div>

            {/* Airdrop / new assets */}
            <div className="rounded-2xl border border-sky-600/50 bg-gradient-to-b from-sky-900/40 via-slate-950 to-slate-950 px-4 py-3 shadow-[0_0_35px_rgba(56,189,248,0.45)]">
              <div className="text-[11px] uppercase tracking-[0.2em] text-sky-300">
                New assets / Airdrop radar
              </div>
              <div className="mt-2 text-sm text-slate-100">
                4 new assets detected in the last 7d.
              </div>
              <ul className="mt-3 space-y-2 text-[11px] text-slate-200">
                <li className="flex justify-between">
                  <span>AIRDROP · Base</span>
                  <span className="text-slate-400">+$95.44</span>
                </li>
                <li className="flex justify-between">
                  <span>POINTS · Polygon</span>
                  <span className="text-slate-400">+$38.20</span>
                </li>
                <li className="flex justify-between">
                  <span>GOV · Ethereum</span>
                  <span className="text-slate-400">+$420.00</span>
                </li>
                <li className="flex justify-between">
                  <span>Meme · BSC</span>
                  <span className="text-slate-400">volatility 🔥</span>
                </li>
              </ul>
              <div className="mt-4 text-[11px] text-slate-400">
                This panel will later read your tx history and label suspicious
                “airdrop-like” inflows automatically.
              </div>
            </div>
          </section>

          {/* Recent transactions */}
          <section className="rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 shadow-[0_0_28px_rgba(15,23,42,0.9)]">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Recent transactions (dummy)
                </div>
                <div className="text-xs text-slate-400">
                  This table will be powered by onchain data soon.
                </div>
              </div>
              <div className="flex gap-2 text-[11px]">
                <button className="px-2 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-200">
                  All chains
                </button>
                <button className="px-2 py-1 rounded-full text-slate-400 hover:bg-slate-900 border border-slate-800">
                  Only IN
                </button>
                <button className="px-2 py-1 rounded-full text-slate-400 hover:bg-slate-900 border border-slate-800">
                  Only OUT
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-[12px] text-slate-200">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 text-[11px]">
                    <th className="py-2 pr-2 text-left font-normal">Time</th>
                    <th className="py-2 px-2 text-left font-normal">Chain</th>
                    <th className="py-2 px-2 text-left font-normal">Type</th>
                    <th className="py-2 px-2 text-left font-normal">Token</th>
                    <th className="py-2 px-2 text-right font-normal">
                      Amount
                    </th>
                    <th className="py-2 pl-2 text-right font-normal">
                      Value (USD)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentTx.map((tx) => (
                    <tr
                      key={tx.id}
                      className="border-b border-slate-900/60 hover:bg-slate-900/60"
                    >
                      <td className="py-2 pr-2 text-slate-400">{tx.time}</td>
                      <td className="py-2 px-2">{tx.chain}</td>
                      <td className="py-2 px-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] ${
                            tx.type === "IN"
                              ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40"
                              : "bg-rose-500/10 text-rose-300 border border-rose-500/40"
                          }`}
                        >
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-2 px-2">{tx.token}</td>
                      <td className="py-2 px-2 text-right font-mono">
                        {tx.amount}
                      </td>
                      <td className="py-2 pl-2 text-right font-mono text-slate-300">
                        {tx.valueUsd}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
