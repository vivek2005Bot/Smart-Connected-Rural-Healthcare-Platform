import React from 'react';
import Header from '../components/Header';

export default function Appointments() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Book an Appointment</h1>
        {/* Appointment booking form will be implemented here */}
      </main>
    </div>
  );
}