import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <span className="text-base font-bold text-gray-900">
                Biz<span className="text-blue-600">Ledger</span>
              </span>
            </Link>
            <p className="mt-3 text-xs text-gray-500 max-w-xs leading-relaxed">
              US business entity search and verification. Access public
              registration records for companies across all 50 states.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
              Search
            </h3>
            <ul className="mt-3 space-y-2.5">
              <li>
                <Link href="/search" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                  Company Search
                </Link>
              </li>
              <li>
                <Link href="/states" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                  Browse by State
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                  Browse by Industry
                </Link>
              </li>
              <li>
                <Link href="/recently-filed" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                  Recently Filed
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
              Resources
            </h3>
            <ul className="mt-3 space-y-2.5">
              <li>
                <Link href="/archive" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                  Entity Archive
                </Link>
              </li>
              <li>
                <Link href="/statistics" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                  Database Statistics
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-3 space-y-2.5">
              <li>
                <Link href="/about" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                  About BizLedger
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <span className="text-xs text-gray-400">Privacy Policy</span>
              </li>
              <li>
                <span className="text-xs text-gray-400">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-gray-400">
            &copy; {new Date().getFullYear()} BizLedger. All rights reserved.
          </p>
          <p className="text-[11px] text-gray-400">
            Data provided for informational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
