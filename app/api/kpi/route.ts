import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {

  const [{ count: totalSubmissions }] = await Promise.all([
    supabase.from('form_submissions').select('*', { count: 'exact', head: true })
  ]);

  const { data: target } = await supabase
    .from('kpi_targets')
    .select('expected_households')
    .single();

  const { data: segregation } = await supabase.rpc('segregation_stats');

  const { data: userStats } = await supabase.rpc('user_performance');

  const { data: trend } = await supabase.rpc('submission_trend_7_days');

  return NextResponse.json({
    totalSubmissions,
    expected: target.expected_households,
    segregation,
    userStats,
    trend
  });
}
