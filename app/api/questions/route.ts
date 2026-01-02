import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data: questions } = await supabase
    .from('form_questions')
    .select('*')
    .eq('is_active', true)
    .order('order_no');

  const { data: logic } = await supabase
    .from('form_logic')
    .select('*');

  const { data: validations } = await supabase
    .from('form_validations')
    .select('*');

  return NextResponse.json({ questions, logic, validations });
}
