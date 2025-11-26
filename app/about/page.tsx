export default function About() {
  return (
    <main className="min-h-screen py-20 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
            About <span className="text-cyan-400">Navarro</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-primary-500 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-16">
          {/* Our Mission Section */}
          <section className="bg-white rounded-2xl p-10 shadow-xl border-2 border-cyan-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-2 h-12 bg-gradient-to-b from-cyan-400 to-primary-500 rounded-full mr-4"></div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed font-medium ml-6">
              Navarro is dedicated to <span className="text-cyan-400 font-semibold">democratizing shipping knowledge</span> by making it accessible, 
              affordable, and straightforward for businesses of all sizes. We believe that every company 
              shipping products should have access to professional-grade shipping education and logistics solutions 
              without the complexity and high costs traditionally associated with supply chain management.
            </p>
          </section>

          {/* What We Do Section */}
          <section className="bg-gradient-to-br from-white to-cyan-50 rounded-2xl p-10 shadow-xl border-2 border-cyan-200 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-2 h-12 bg-gradient-to-b from-cyan-400 to-primary-500 rounded-full mr-4"></div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">What We Do</h2>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed font-medium ml-6">
              We provide a <span className="text-cyan-400 font-semibold">comprehensive shipping education platform</span> that combines interactive learning modules, 
              shipping rate calculators, and expert guidance to help businesses master shipping and logistics. Our solution 
              covers domestic and international shipping, making supply chain management simple and efficient.
            </p>
          </section>

          {/* Our Approach Section */}
          <section className="bg-white rounded-2xl p-10 shadow-xl border-2 border-cyan-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-2 h-12 bg-gradient-to-b from-cyan-400 to-primary-500 rounded-full mr-4"></div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Our Approach</h2>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed font-medium ml-6">
              By leveraging technology and standardized processes, we've created a powerful educational platform that eliminates 
              the need for extensive shipping expertise. Our platform guides users through the entire 
              shipping process, from choosing shipping methods to calculating rates and managing logistics, all in just <span className="text-cyan-400 font-semibold">three simple steps</span>.
            </p>
          </section>

          {/* Who We Serve Section */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Who We Serve</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-primary-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-cyan-50 to-primary-50 rounded-2xl p-10 shadow-xl border-2 border-cyan-200 hover:shadow-2xl hover:border-cyan-400 transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-extrabold text-gray-900">E-Commerce Businesses</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                  Whether you're just starting or scaling your online store, <span className="text-cyan-400 font-semibold">Navarro helps you master shipping 
                  strategies</span> to reduce costs, improve customer satisfaction, and increase efficiency.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-white to-cyan-50 rounded-2xl p-10 shadow-xl border-2 border-cyan-200 hover:shadow-2xl hover:border-cyan-400 transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-extrabold text-gray-900">Manufacturers & Wholesalers</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                  From startups to established enterprises shipping products globally, <span className="text-cyan-400 font-semibold">Navarro helps you 
                  optimize logistics</span>, reduce shipping costs, and streamline your supply chain.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

