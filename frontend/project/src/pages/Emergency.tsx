import React from 'react';
import Header from '../components/Header';

export default function Emergency() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Emergency Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-100 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-red-800 mb-4">Call Emergency Services</h2>
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              Call Now
            </button>
          </div>
          <div className="bg-orange-100 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-orange-800 mb-4">Request Ambulance</h2>
            <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
              Request Ambulance
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}