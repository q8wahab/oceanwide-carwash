'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';

// Simplified customer structure
interface CustomerData {
  phone: string;
  totalWashes: number;
}

// Helper for circle styling
const getCircleState = (index: number, totalWashes: number): 'completed' | 'pending' => {
  return index < totalWashes ? 'completed' : 'pending';
};

// Circle row UI
const CircleRow: React.FC<{ count: number; startIndex: number; totalWashes: number }> = ({ count, startIndex, totalWashes }) => (
  <div className="flex flex-row-reverse justify-center items-center gap-4 my-3">
    {[...Array(count)].map((_, i) => {
      const circleIndex = startIndex + i;
      const state = getCircleState(circleIndex, totalWashes);
      return (
        <div
          key={circleIndex}
          className={`w-5 h-5 rounded-full transition-all duration-300 ${
            state === 'completed' ? 'bg-sky-300' : 'bg-gray-300'
          }`}
        ></div>
      );
    })}
  </div>
);

// Reward badge UI
const RewardBlock: React.FC<{ title: string; icon: string; achieved: boolean }> = ({ title, icon, achieved }) => (
  <div className={`p-3 rounded-lg text-center ${achieved ? 'bg-yellow-400' : 'bg-gray-300'} my-2 w-32 mx-auto shadow`}>
    <span className="text-2xl mb-1">{icon}</span>
    <p className="text-sm font-semibold">{title}</p>
  </div>
);

export default function ProgressPage() {
  const params = useParams();
  const phone = params?.phone as string;

  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!phone) {
      setError("Invalid phone number provided.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: dbError } = await supabase
          .from('customers')
          .select('total_washes')
          .eq('phone', phone)
          .single();

        if (dbError) {
          console.error("Supabase error:", dbError);
          if (dbError.code === 'PGRST116') {
            throw new Error('Phone number not found');
          } else {
            throw new Error('Failed to fetch data from database.');
          }
        }

        if (!data) {
          throw new Error('Phone number not found');
        }

        const totalWashes = data.total_washes || 0;
        setCustomerData({ phone, totalWashes });

      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setCustomerData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [phone]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
        <p className="mb-4 text-gray-700">{error}</p>
        <Link href="/" passHref legacyBehavior>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white mb-2">Try Again</Button>
        </Link>
      </div>
    );
  }

  if (!customerData) {
    return <div className="flex justify-center items-center min-h-screen">Could not load data.</div>;
  }

  const totalWashes = customerData.totalWashes;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mt-8 mb-2 text-gray-800">Oceanwide Car Wash</h1>
      <p className="text-lg mb-4 text-gray-600">Your Wash Progress</p>
      <p className="text-md mb-6 text-gray-700">Phone: {customerData.phone}</p>
      <p className="text-md font-semibold mb-6 text-gray-800">Washes Completed: {totalWashes}</p>

      <div className="w-full max-w-sm p-4 border border-gray-200 rounded-lg bg-white shadow">
        <CircleRow count={7} startIndex={0} totalWashes={totalWashes} />
        <RewardBlock title="Free Wash" icon="🎁" achieved={totalWashes >= 8} />

        <CircleRow count={7} startIndex={7} totalWashes={totalWashes} />
        <RewardBlock title="Special Wash" icon="⭐" achieved={totalWashes >= 16} />

        <CircleRow count={7} startIndex={14} totalWashes={totalWashes} />
        <RewardBlock title="Ocean Wash" icon="🌊" achieved={totalWashes >= 23} />
      </div>

      <Link href="/" passHref legacyBehavior>
        <Button className="mt-8 text-blue-600 underline hover:text-blue-800">
          Check another number
        </Button>
      </Link>
    </div>
  );
}
