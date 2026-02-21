'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Dashboard() {
  const [stats, setStats] = useState({
    estimates: 0,
    inProgress: 0,
    invoices: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  async function fetchStats() {
    try {
      const { count: estimatesCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Estimate')

      const { count: inProgressCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'In Progress')

      const { count: invoicesCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Invoiced')

      setStats({
        estimates: estimatesCount || 0,
        inProgress: inProgressCount || 0,
        invoices: invoicesCount || 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workflow Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Workflow Status</h2>
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">View Workflow</a>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 text-right font-medium">Orders</th>
                <th className="pb-2 text-right font-medium">Total</th>
                <th className="pb-2 text-right font-medium">Pending Authorizations</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b">
                <td className="py-3">
                  <a href="#" className="text-indigo-600 hover:text-indigo-700">Estimates</a>
                </td>
                <td className="text-right text-gray-900">{stats.estimates}</td>
                <td className="text-right text-gray-900">$0.00</td>
                <td className="text-right text-gray-900">{stats.estimates}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3">
                  <a href="#" className="text-indigo-600 hover:text-indigo-700">In Progress</a>
                </td>
                <td className="text-right text-gray-900">{stats.inProgress}</td>
                <td className="text-right text-gray-900">$0.00</td>
                <td className="text-right text-gray-900">0</td>
              </tr>
              <tr className="border-b">
                <td className="py-3">
                  <a href="#" className="text-indigo-600 hover:text-indigo-700">Invoices</a>
                </td>
                <td className="text-right text-gray-900">{stats.invoices}</td>
                <td className="text-right text-gray-900">$366.82</td>
                <td className="text-right text-gray-900">0</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">View Calendar</a>
          </div>
          <div className="flex space-x-2 mb-4">
            <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded">Today</button>
            <button className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Tomorrow</button>
            <button className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">This Week</button>
            <button className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Next Week</button>
          </div>
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-900 font-medium">No appointments</p>
            <p className="text-sm text-gray-500">Appointments scheduled for today will appear here</p>
          </div>
        </div>
      </div>
    </div>
  )
}
