import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const { data, error } = await supabase
    .rpc('verify_user', { p_username: username, p_password: password });

  if (error || !data?.length) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  return NextResponse.json(data[0]);
}
