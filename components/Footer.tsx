import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary-50 text-gray-800 border-t border-primary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold mb-4">Navaro</h2>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="text-gray-600 hover:text-cyan-400">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-gray-600 hover:text-cyan-400">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-cyan-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-cyan-400">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/resources" className="text-gray-600 hover:text-cyan-400">
                      Resources
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools" className="text-gray-600 hover:text-cyan-400">
                      Tools
                    </Link>
                  </li>
                  <li>
                    <Link href="/blogs" className="text-gray-600 hover:text-cyan-400">
                      Blogs
                    </Link>
                  </li>
                </ul>
              </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Navaro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-600 hover:text-cyan-400 text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-cyan-400 text-sm">
                Terms of use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

