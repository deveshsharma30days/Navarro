export default function About() {
  return (
    <main className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Navarro
          </h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              Navarro is dedicated to democratizing transfer pricing compliance by making it accessible, 
              affordable, and straightforward for businesses of all sizes. We believe that every company 
              with international operations should have access to professional-grade transfer pricing solutions 
              without the complexity and high costs traditionally associated with this field.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">What We Do</h2>
            <p className="text-lg text-gray-700 mb-4">
              We provide a comprehensive platform that combines self-guided questionnaires with fixed benchmarks 
              to help tax advisors and companies create transfer pricing reports effortlessly. Our solution 
              supports both US and OECD transfer pricing requirements, making compliance simple and efficient.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Approach</h2>
            <p className="text-lg text-gray-700 mb-4">
              By leveraging technology and standardized processes, we've created a powerful tool that eliminates 
              the need for extensive transfer pricing expertise. Our platform guides users through the entire 
              process, from selecting transaction types to generating comprehensive reports, all in just three 
              simple steps.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Who We Serve</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-primary-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Tax Advisors</h3>
                <p className="text-gray-700">
                  Whether you have a transfer pricing team or not, Navarro helps you provide value-added 
                  services to your multinational clients while reducing costs and increasing efficiency.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-primary-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Companies</h3>
                <p className="text-gray-700">
                  From startups to established enterprises, if you have foreign entities, Navarro helps you 
                  maintain compliance, reduce costs, and save valuable time.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

