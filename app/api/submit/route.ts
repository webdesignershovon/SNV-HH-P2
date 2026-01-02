import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req:Request){
  const {userId,roadId,holdingId,answers}=await req.json();

  const {data:submission}=await supabase
    .from('form_submissions')
    .insert({user_id:userId,road_id:roadId,holding_id:holdingId})
    .select()
    .single();

  const payload = Object.entries(answers).map(([q,a])=>({
    submission_id: submission.id,
    question_id: Number(q),
    answer: a
  }));

  await supabase.from('form_answers').insert(payload);

  return NextResponse.json({success:true});
}
