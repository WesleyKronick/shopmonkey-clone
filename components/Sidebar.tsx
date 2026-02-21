import Link from 'next/link'

export default function Sidebar() {
  const navItems = [
    { icon: '🏠', href: '/', label: 'Dashboard' },
    { icon: '📋', href: '/orders', label: 'Orders' },
    { icon: '📅', href: '/appointments', label: 'Calendar' },
    { icon: '🔧', href: '/inspections', label: 'Inspections' },
    { icon: '👥', href: '/customers', label: 'Customers' },
    { icon: '🚗', href: '/vehicles', label: 'Vehicles' },
    { icon: '📦', href: '/inventory', label: 'Inventory' },
    { icon: '📊', href: '/reports', label: 'Reports' },
  ]

  return (
    <aside className="w-12 bg-indigo-700 flex flex-col items-center py-4 space-y-4">
      {/* Logo */}
      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mb-4">
        <span className="text-indigo-700 font-bold text-lg">S</span>
      </div>

      {/* Navigation Icons */}
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="w-8 h-8 flex items-center justify-center text-white hover:bg-indigo-600 rounded transition-colors"
          title={item.label}
        >
          <span className="text-xl">{item.icon}</span>
        </Link>
      ))}

      {/* Bottom Icons */}
      <div className="flex-1" />
      <button className="w-8 h-8 flex items-center justify-center text-white hover:bg-indigo-600 rounded">
        <span className="text-xl">❓</span>
      </button>
      <button className="w-8 h-8 flex items-center justify-center text-white hover:bg-indigo-600 rounded">
        <span className="text-xl">⚙️</span>
      </button>
    </aside>
  )
}
