'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Appointment {
  id: string;
  title: string | null;
  start_time: string;
  end_time: string;
  status: string;
  customers: any;
  vehicles: any;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v3/appointment?limit=50')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAppointments(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch appointments:', err);
        setLoading(false);
      });
  }, []);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
              <p className="text-gray-600 mt-1">Schedule and manage customer appointments</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
              + Schedule Appointment
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading appointments...</div>
          ) : appointments.length === 0 ? (
            <div className="p-12 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments scheduled</h3>
              <p className="text-gray-600">Schedule your first appointment</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map(apt => (
                    <tr key={apt.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDateTime(apt.start_time)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {apt.customers?.first_name} {apt.customers?.last_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {apt.vehicles?.year} {apt.vehicles?.make} {apt.vehicles?.model}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {apt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
