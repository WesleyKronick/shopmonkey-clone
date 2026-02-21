'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Vehicle {
  id: string;
  vin: string | null;
  year: number | null;
  make: string | null;
  model: string | null;
  vehicle_type: string;
  license_plate: string | null;
  customer_id: string;
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v3/vehicle?limit=50')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setVehicles(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch vehicles:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Vehicles</h1>
              <p className="text-gray-600 mt-1">Manage vehicle fleet and service history</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
              + Add Vehicle
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading vehicles...</div>
          ) : vehicles.length === 0 ? (
            <div className="p-12 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles yet</h3>
              <p className="text-gray-600">Add vehicles to track service history</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">VIN</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">License</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vehicles.map(vehicle => (
                    <tr key={vehicle.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vehicle.vehicle_type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vehicle.vin || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vehicle.license_plate || '-'}
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
