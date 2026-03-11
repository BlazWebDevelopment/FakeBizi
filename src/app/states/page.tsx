import type { Metadata } from "next";
import Link from "next/link";
import companies from "@/data/companies.json";
import type { Company } from "@/data/types";

const allCompanies = companies as Company[];

export const metadata: Metadata = {
  title: "Browse by State",
  description:
    "Browse US business entities organized by state of formation.",
};

interface StateInfo {
  name: string;
  count: number;
  active: number;
}

const stateMap = new Map<string, StateInfo>();
allCompanies.forEach((c) => {
  const existing = stateMap.get(c.stateOfFormation);
  if (existing) {
    existing.count++;
    if (c.status === "Active") existing.active++;
  } else {
    stateMap.set(c.stateOfFormation, {
      name: c.stateOfFormation,
      count: 1,
      active: c.status === "Active" ? 1 : 0,
    });
  }
});

const statesList = Array.from(stateMap.values()).sort((a, b) =>
  a.name.localeCompare(b.name)
);

export default function StatesPage() {
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
          <span className="text-gray-900 font-medium">Browse by State</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900">Browse by State</h1>
        <p className="text-sm text-gray-500 mt-1">
          Explore business entities organized by their state of formation
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-6 text-sm">
          <div>
            <span className="font-bold text-2xl text-blue-600">{statesList.length}</span>
            <p className="text-gray-500 text-xs mt-0.5">States & Territories</p>
          </div>
          <div className="h-10 w-px bg-gray-200" />
          <div>
            <span className="font-bold text-2xl text-gray-900">{allCompanies.length}</span>
            <p className="text-gray-500 text-xs mt-0.5">Total Entities</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {statesList.map((st) => {
          const pct = Math.round((st.active / st.count) * 100);
          return (
            <Link
              key={st.name}
              href={`/search?state=${encodeURIComponent(st.name)}`}
              className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition-all"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {st.name}
                </h3>
                <svg
                  className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="mt-3 flex items-center gap-4">
                <div>
                  <p className="text-lg font-bold text-gray-900">{st.count}</p>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider">Entities</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-green-600">{st.active}</p>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider">Active</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-green-500 h-1.5 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">{pct}% active</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
