export default function Resources() {
  const resources = [
    {
      title: 'Transfer Pricing Guide',
      description: 'A comprehensive guide to understanding transfer pricing regulations and best practices.',
      category: 'Guide',
    },
    {
      title: 'OECD Guidelines Overview',
      description: 'Learn about OECD transfer pricing guidelines and how they apply to your business.',
      category: 'Documentation',
    },
    {
      title: 'US Transfer Pricing Regulations',
      description: 'Detailed information about US transfer pricing regulations and compliance requirements.',
      category: 'Documentation',
    },
    {
      title: 'Benchmark Methodology',
      description: 'Understanding how benchmarks are calculated and what they mean for your business.',
      category: 'Technical',
    },
    {
      title: 'Case Studies',
      description: 'Real-world examples of transfer pricing scenarios and solutions.',
      category: 'Case Study',
    },
    {
      title: 'FAQ',
      description: 'Frequently asked questions about transfer pricing and our platform.',
      category: 'Support',
    },
  ]

  return (
    <main className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access helpful guides, documentation, and resources to support your transfer pricing needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-primary-100">
              <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {resource.category}
              </span>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{resource.title}</h2>
              <p className="text-gray-600">{resource.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

