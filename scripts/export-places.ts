import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local');
  process.exit(1);
}

const BATCH_SIZE = 1000;

async function exportPlaces() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  console.log('Starting export from places table...');

  let allRecords: any[] = [];
  let start = 0;

  while (true) {
    const end = start + BATCH_SIZE - 1;
    
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .range(start, end);

    if (error) {
      console.error('Error fetching batch:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      break;
    }

    allRecords = allRecords.concat(data);
    console.log(`Fetched ${data.length} records (total: ${allRecords.length})...`);

    if (data.length < BATCH_SIZE) {
      break;
    }

    start += BATCH_SIZE;
  }

  const outputPath = '/Users/dnzyc/texas-apartments-platform/data/places.json';
  
  fs.writeFileSync(outputPath, JSON.stringify(allRecords, null, 2));

  console.log(`\nExport complete: ${allRecords.length} records saved to ${outputPath}`);
}

exportPlaces().catch(console.error);
