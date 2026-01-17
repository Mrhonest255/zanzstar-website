// Script to check and clear mock data from Supabase
// Run with: node scripts/clear-mock-data.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gpbpxgllblhrxokulcsl.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || 'sb_publishable_BfhnKUYhySicLLV0JUQMDQ_jG3zZkqO';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
  console.log('📊 Checking current data in database...\n');

  // Check customers
  const { data: customers, error: custError } = await supabase
    .from('customers')
    .select('*');

  if (custError) {
    console.error('Error fetching customers:', custError);
    return;
  }

  console.log(`Found ${customers.length} customers:`);
  customers.forEach(c => {
    const isMock = c.email.includes('@example.com') ? '⚠️ MOCK' : '✅ Real';
    console.log(`  ${isMock} - ${c.name} (${c.email})`);
  });

  // Check bookings
  const { data: bookings, error: bookError } = await supabase
    .from('bookings')
    .select('*');

  if (bookError) {
    console.error('Error fetching bookings:', bookError);
    return;
  }

  console.log(`\nFound ${bookings.length} bookings`);

  // Count mock data
  const mockCustomers = customers.filter(c => c.email.includes('@example.com'));
  console.log(`\n📋 Summary:`);
  console.log(`   Total Customers: ${customers.length}`);
  console.log(`   Mock Customers (@example.com): ${mockCustomers.length}`);
  console.log(`   Total Bookings: ${bookings.length}`);

  return { customers, bookings, mockCustomers };
}

async function clearMockData() {
  console.log('\n🗑️ Clearing mock data...\n');

  // Get mock customer IDs
  const { data: mockCustomers } = await supabase
    .from('customers')
    .select('id')
    .like('email', '%@example.com');

  if (mockCustomers && mockCustomers.length > 0) {
    const mockIds = mockCustomers.map(c => c.id);

    // Delete bookings for mock customers
    const { error: bookingError } = await supabase
      .from('bookings')
      .delete()
      .in('customer_id', mockIds);

    if (bookingError) {
      console.error('Error deleting mock bookings:', bookingError);
    } else {
      console.log('✅ Deleted bookings for mock customers');
    }

    // Delete mock customers
    const { error: customerError } = await supabase
      .from('customers')
      .delete()
      .like('email', '%@example.com');

    if (customerError) {
      console.error('Error deleting mock customers:', customerError);
    } else {
      console.log(`✅ Deleted ${mockCustomers.length} mock customers`);
    }
  } else {
    console.log('No mock customers found');
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  await checkData();

  if (args.includes('--clear')) {
    await clearMockData();
    console.log('\n📊 After clearing:');
    await checkData();
  } else {
    console.log('\n💡 To clear mock data, run: node scripts/clear-mock-data.js --clear');
  }
}

main().catch(console.error);
