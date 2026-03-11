import { Suspense } from "react";
import type { Metadata } from "next";
import SearchBar from "@/components/SearchBar";
import CompanyCard from "@/components/CompanyCard";
import companies from "@/data/companies.json";
import type { Company } from "@/data/types";

const allCompanies = companies as Company[];

export const metadata: Metadata = {
  title: "Search Companies",
  description:
    "Search US business entities by name, owner, state, industry, or entity type.",
};

const ITEMS_PER_PAGE = 12;

function getUniqueValues(key: keyof Company): string[] {
  const values = allCompanies.map((c) => c[key] as string);
  return [...new Set(values)].sort();
}

const states = getUniqueValues("stateOfFormation");
const industries = getUniqueValues("industry");
const entityTypes = getUniqueValues("entityType");

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    state?: string;
    industry?: string;
    type?: string;
    status?: string;
    page?: string;
  }>;
}

async function SearchResults({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q?.toLowerCase() || "";
  const stateFilter = params.state || "";
  const industryFilter = params.industry || "";
  const typeFilter = params.type || "";
  const statusFilter = params.status || "";
  const page = parseInt(params.page || "1", 10);

  let filtered = allCompanies;

  if (query) {
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.dba.toLowerCase().includes(query) ||
        c.owner.toLowerCase().includes(query) ||
        c.industry.toLowerCase().includes(query) ||
        c.stateOfFormation.toLowerCase().includes(query) ||
        c.address.city.toLowerCase().includes(query) ||
        c.ein.includes(query)
    );
  }

  if (stateFilter) {
    filtered = filtered.filter((c) => c.stateOfFormation === stateFilter);
  }
  if (industryFilter) {
    filtered = filtered.filter((c) => c.industry === industryFilter);
  }
  if (typeFilter) {
    filtered = filtered.filter((c) => c.entityType === typeFilter);
  }
  if (statusFilter) {
    filtered = filtered.filter((c) => c.status === statusFilter);
  }

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  function buildUrl(overrides: Record<string, string>) {
    const p = new URLSearchParams();
    if (query) p.set("q", params.q!);
    if (stateFilter) p.set("state", stateFilter);
    if (industryFilter) p.set("industry", industryFilter);
    if (typeFilter) p.set("type", typeFilter);
    if (statusFilter) p.set("status", statusFilter);
    for (const [k, v] of Object.entries(overrides)) {
      if (v) p.set(k, v);
      else p.delete(k);
    }
    return `/search?${p.toString()}`;
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-900">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "result" : "results"} found
          {query && (
            <span>
              {" "}
              for &ldquo;<span className="font-medium">{params.q}</span>&rdquo;
            </span>
          )}
        </p>
      </div>

      {paginated.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginated.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <svg
            className="mx-auto h-12 w-12 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No results found
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Try adjusting your search or filters to find what you&apos;re looking for.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <nav className="mt-8 flex items-center justify-center gap-2">
          {page > 1 && (
            <a
              href={buildUrl({ page: String(page - 1) })}
              className="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Previous
            </a>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={buildUrl({ page: String(p) })}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                p === page
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 bg-white border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {p}
            </a>
          ))}
          {page < totalPages && (
            <a
              href={buildUrl({ page: String(page + 1) })}
              className="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Next
            </a>
          )}
        </nav>
      )}
    </>
  );
}

export default async function SearchPage(props: SearchPageProps) {
  const params = await props.searchParams;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Company Search</h1>
        <p className="text-sm text-gray-500 mt-1">
          Search and filter US business entities
        </p>
        <div className="mt-4 max-w-2xl">
          <SearchBar defaultValue={params.q || ""} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <aside className="w-full lg:w-56 shrink-0">
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Status
              </label>
              <div className="flex flex-wrap gap-1.5">
                {["", "Active", "Inactive", "Dissolved"].map((s) => {
                  const isActive = (params.status || "") === s;
                  const href = `/search?${new URLSearchParams({
                    ...(params.q ? { q: params.q } : {}),
                    ...(params.state ? { state: params.state } : {}),
                    ...(params.industry ? { industry: params.industry } : {}),
                    ...(params.type ? { type: params.type } : {}),
                    ...(s ? { status: s } : {}),
                  }).toString()}`;
                  return (
                    <a
                      key={s || "all"}
                      href={href}
                      className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {s || "All"}
                    </a>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor="state-filter"
                className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2"
              >
                State
              </label>
              <select
                id="state-filter"
                defaultValue={params.state || ""}
                onChange={undefined}
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All States</option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="industry-filter"
                className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2"
              >
                Industry
              </label>
              <select
                id="industry-filter"
                defaultValue={params.industry || ""}
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Industries</option>
                {industries.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="type-filter"
                className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2"
              >
                Entity Type
              </label>
              <select
                id="type-filter"
                defaultValue={params.type || ""}
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                {entityTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <Suspense
            fallback={
              <div className="text-center py-16 text-gray-400">
                Loading...
              </div>
            }
          >
            <SearchResults searchParams={props.searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
