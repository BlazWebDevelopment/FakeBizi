import type { Metadata } from "next";
import Link from "next/link";
import companies from "@/data/companies.json";
import type { Company } from "@/data/types";

const allCompanies = companies as Company[];

export const metadata: Metadata = {
  title: "Browse by Industry",
  description: "Explore US business entities organized by industry sector.",
};

interface IndustryInfo {
  name: string;
  count: number;
  active: number;
  topState: string;
}

const industryMap = new Map<string, { count: number; active: number; states: Map<string, number> }>();
allCompanies.forEach((c) => {
  const existing = industryMap.get(c.industry);
  if (existing) {
    existing.count++;
    if (c.status === "Active") existing.active++;
    existing.states.set(c.stateOfFormation, (existing.states.get(c.stateOfFormation) || 0) + 1);
  } else {
    const states = new Map<string, number>();
    states.set(c.stateOfFormation, 1);
    industryMap.set(c.industry, {
      count: 1,
      active: c.status === "Active" ? 1 : 0,
      states,
    });
  }
});

const industryList: IndustryInfo[] = Array.from(industryMap.entries())
  .map(([name, data]) => {
    let topState = "";
    let topCount = 0;
    data.states.forEach((count, state) => {
      if (count > topCount) {
        topCount = count;
        topState = state;
      }
    });
    return { name, count: data.count, active: data.active, topState };
  })
  .sort((a, b) => b.count - a.count);

export default function IndustriesPage() {
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
          <span className="text-gray-900 font-medium">Browse by Industry</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900">Browse by Industry</h1>
        <p className="text-sm text-gray-500 mt-1">
          Explore business entities organized by their industry sector
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-6 text-sm">
          <div>
            <span className="font-bold text-2xl text-blue-600">{industryList.length}</span>
            <p className="text-gray-500 text-xs mt-0.5">Industries</p>
          </div>
          <div className="h-10 w-px bg-gray-200" />
          <div>
            <span className="font-bold text-2xl text-gray-900">{allCompanies.length}</span>
            <p className="text-gray-500 text-xs mt-0.5">Total Entities</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Industry
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Entities
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Top State
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Active Rate
                </th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {industryList.map((ind) => {
                const pct = Math.round((ind.active / ind.count) * 100);
                return (
                  <tr key={ind.name} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {ind.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-gray-900">
                        {ind.count}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="text-sm text-green-600 font-medium">
                        {ind.active}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                      {ind.topState}
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-100 rounded-full h-1.5">
                          <div
                            className="bg-green-500 h-1.5 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{pct}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/search?industry=${encodeURIComponent(ind.name)}`}
                        className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        View &rarr;
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
