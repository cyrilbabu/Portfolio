import Link from "next/link";

const Price = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/blogs/get-price/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div className="text-red-500 text-center">Failed to load price</div>;
  }

  const prices = await res.json();

  if (!prices || Object.keys(prices).length === 0) {
    return <div className="text-center py-10">No price data available.</div>;
  }

  return (
    <div className="w-full bg-yellow-400 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-blue-950 mb-4">
          Current Prize Pool
        </h1>

        <p className="text-xl text-blue-950 mb-8">
          Here's the current prize pool. If you're talented, claim your prize now!
        </p>

        {/* Total Unclaimed Amount on Top */}
        <div className="bg-white/70 rounded-xl p-8 shadow-lg mb-10 border-4 border-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            🪙 Total Unclaimed Amount
          </h2>
          <p className="text-5xl font-extrabold text-yellow-600">
            ₹{prices.total_unclaimed_amount || 0}
          </p>
        </div>

        {/* Grid for remaining 5 metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <StatCard
            label="Unclaimed Price Count"
            value={prices.unclaimed_price_count || 0}
          />
          <StatCard
            label="Highest Amount Yet to Claim"
            value={`₹${prices.highest_amount || 0}`}
          />
          <StatCard
            label="Claimed Price Count"
            value={prices.claimed_price_count || 0}
          />
          <StatCard
            label="Total Claimed Amount"
            value={
              prices.total_claimed_amount
                ? `₹${prices.total_claimed_amount}`
                : "₹0"
            }
          />
        </div>

        <Link
          href="/how-to-claim"
          className="bg-white/80 text-blue-950 border border-white w-full text-lg font-semibold py-3 px-32 rounded-full shadow-lg transition duration-300"
        >
          How to Claim Your Prize
        </Link>
      </div>
    </div>
  );
};

// Reusable Stat Card component
const StatCard = ({ label, value }) => (
  <div className="bg-white/60 rounded  border-2  border-white p-6 shadow-md">
    <h2 className="text-lg font-bold text-blue-950 mb-2">{label}</h2>
    <p className="text-3xl font-bold text-green-600">{value}</p>
  </div>
);

export default Price;
