import { createClient } from '@supabase/supabase-js';

export const config = {
  runtime: 'nodejs',
};

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const allowlist = ['full_name', 'school', 'birth_date', 'whatsapp', 'subjects', 'interests', 'motivation'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Supabase tidak dikonfigurasi' });
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const record = {};
    for (const key of allowlist) {
      if (payload[key] !== undefined) record[key] = payload[key];
    }

    if (!record.full_name || !record.school) {
      return res.status(400).json({ error: 'full_name dan school wajib diisi' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from('registrations')
      .insert([record])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({ ok: true, data });
  } catch (err) {
    return res.status(500).json({ error: 'Terjadi kesalahan internal' });
  }
}