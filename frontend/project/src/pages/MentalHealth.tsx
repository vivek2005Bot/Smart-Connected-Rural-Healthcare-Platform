import React from 'react';
import Header from '../components/Header';

export default function MentalHealth() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Mental Health Check</h1>
        {/* Mental health assessment form will be implemented here */}
      </main>
    </div>
  );
}