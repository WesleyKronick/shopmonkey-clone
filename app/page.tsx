export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">ShopMonkey Clone</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Customers', href: '/customers', icon: '👥' },
            { name: 'Vehicles', href: '/vehicles', icon: '🚗' },
            { name: 'Work Orders', href: '/orders', icon: '🔧' },
            { name: 'Appointments', href: '/appointments', icon: '📅' },
            { name: 'Inspections', href: '/inspections', icon: '🔍' },
            { name: 'Inventory', href: '/inventory', icon: '📦' },
            { name: 'Payments', href: '/payments', icon: '💰' },
            { name: 'Messages', href: '/messages', icon: '💬' },
            { name: 'Users', href: '/users', icon: '👤' },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
            </a>
          ))}
        </div>
      </main>
    </div>
  )
}
