import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {

  // 1. total submissions
  const { count: totalSubmissions } = await supabase
    .from('form_submissions')
    .select('*', { count: 'exact', head: true });

  // 2. expected households
  const { data: target } = await supabase
    .from('kpi_targets')
    .select('expected_households')
    .single();

  // 3. segregation status (SQL FUNCTION)
  const { data: segregation } = await supabase
    .rpc('segregation_stats');

  // 4. user performance (SQL FUNCTION)
  const { data: userStats } = await supabase
    .rpc('user_performance');

  // 5. last 7 days trend (SQL FUNCTION)
  const { data: trend } = await supabase
    .rpc('submission_trend_7_days');

  return NextResponse.json({
    totalSubmissions,
    expected: target?.expected_households ?? 0,
    segregation,
    userStats,
    trend
  });
}
