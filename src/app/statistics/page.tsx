import type { Metadata } from "next";
import Link from "next/link";
import companies from "@/data/companies.json";
import type { Company } from "@/data/types";

const allCompanies = companies as Company[];

export const metadata: Metadata = {
  title: "Database Statistics",
  description:
    "View statistics and analytics about US business entities in the BizLedger database.",
};

function getTopItems(key: keyof Company, limit: number) {
  const counts = new Map<string, number>();
  allCompanies.forEach((c) => {
    const val = c[key] as string;
    counts.set(val, (counts.get(val) || 0) + 1);
  });
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

const total = allCompanies.length;
const active = allCompanies.filter((c) => c.status === "Active").length;
const inactive = allCompanies.filter((c) => c.status === "Inactive").length;
const dissolved = allCompanies.filter((c) => c.status === "Dissolved").length;
const stateCount = new Set(allCompanies.map((c) => c.stateOfFormation)).size;
const industryCount = new Set(allCompanies.map((c) => c.industry)).size;
const totalEmployees = allCompanies.reduce((s, c) => s + c.employees, 0);

const topStates = getTopItems("stateOfFormation", 10);
const topIndustries = getTopItems("industry", 10);
const topEntityTypes = getTopItems("entityType", 8);

const yearMap = new Map<string, number>();
allCompanies.forEach((c) => {
  const year = c.registrationDate.slice(0, 4);
  yearMap.set(year, (yearMap.get(year) || 0) + 1);
});
const yearData = Array.from(yearMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
const maxYearCount = Math.max(...yearData.map(([, c]) => c));

function BarChart({
  data,
  linkPrefix,
}: {
  data: { name: string; count: number }[];
  linkPrefix?: string;
}) {
  const max = Math.max(...data.map((d) => d.count));
  return (
    <div className="space-y-3">
      {data.map((item) => {
        const pct = Math.round((item.count / max) * 100);
        const inner = (
          <>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-700 font-medium truncate">
                {item.name}
              </span>
              <span className="text-sm font-semibold text-gray-900 ml-2">
                {item.count}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </>
        );
        return linkPrefix ? (
          <Link
            key={item.name}
            href={`${linkPrefix}${encodeURIComponent(item.name)}`}
            className="block hover:bg-gray-50 rounded-lg p-1 -m-1 transition-colors"
          >
            {inner}
          </Link>
        ) : (
          <div key={item.name}>{inner}</div>
        );
      })}
    </div>
  );
}

export default function StatisticsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-gray-700 transition-colors">
            Home
          </Link>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900 font-medium">Statistics</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900">Database Statistics</h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of business entities indexed in the BizLedger database
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[
          { label: "Total Entities", value: total, color: "text-blue-600" },
          { label: "Active", value: active, color: "text-green-600" },
          { label: "Inactive", value: inactive, color: "text-yellow-600" },
          { label: "Dissolved", value: dissolved, color: "text-red-600" },
          { label: "States", value: stateCount, color: "text-indigo-600" },
          { label: "Industries", value: industryCount, color: "text-purple-600" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-gray-200 rounded-xl p-4 text-center"
          >
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Employment stat */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Total Reported Employment</h2>
            <p className="text-sm text-gray-500">Combined employee count across all active entities</p>
          </div>
          <p className="text-3xl font-bold text-blue-600">{totalEmployees.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top States */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            Top 10 States by Entity Count
          </h2>
          <BarChart data={topStates} linkPrefix="/search?state=" />
        </div>

        {/* Top Industries */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            Top 10 Industries
          </h2>
          <BarChart data={topIndustries} linkPrefix="/search?industry=" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Entity Types */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            Entity Types
          </h2>
          <BarChart data={topEntityTypes} linkPrefix="/search?type=" />
        </div>

        {/* Registrations by year */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            Registrations by Year
          </h2>
          <div className="flex items-end gap-1 h-48">
            {yearData.map(([year, count]) => {
              const pct = Math.round((count / maxYearCount) * 100);
              return (
                <div
                  key={year}
                  className="flex-1 flex flex-col items-center justify-end h-full"
                >
                  <span className="text-[10px] text-gray-500 mb-1 font-medium">
                    {count}
                  </span>
                  <div
                    className="w-full bg-blue-500 rounded-t min-h-[2px] transition-all hover:bg-blue-600"
                    style={{ height: `${pct}%` }}
                  />
                  <span className="text-[9px] text-gray-400 mt-1 -rotate-45 origin-top-left whitespace-nowrap">
                    {year}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
