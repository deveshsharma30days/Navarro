export default function Products() {
  return (
    <main className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Products
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive suite of transfer pricing solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-primary-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Transfer Pricing Reports</h2>
            <p className="text-gray-600 mb-4">
              Automated transfer pricing reports for US and OECD compliance requirements.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Self-guided questionnaire</li>
              <li>• Fixed benchmarks</li>
              <li>• Instant report generation</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-primary-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Benchmark Analysis</h2>
            <p className="text-gray-600 mb-4">
              Comprehensive benchmark analysis based on transaction types and locations.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Geographic insights</li>
              <li>• Industry-specific data</li>
              <li>• Real-time updates</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-primary-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Compliance Tools</h2>
            <p className="text-gray-600 mb-4">
              Tools to help maintain compliance with transfer pricing regulations.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Document management</li>
              <li>• Audit support</li>
              <li>• Regulatory updates</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}

