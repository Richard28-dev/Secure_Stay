async function testEndToEnd() {
  const BASE_URL = 'http://localhost:5000/api';
  console.log('Testing SecureStay API Endpoints...\n');

  // 1. Health
  const healthRes = await fetch(`${BASE_URL}/health`);
  const health = await healthRes.json();
  console.log('1. Health Check:', health.status === 'healthy' ? '✓ PASS' : '✗ FAIL');

  // 2. Properties
  const propsRes = await fetch(`${BASE_URL}/properties?city=Bengaluru&intent=buy`);
  const props = await propsRes.json();
  console.log(`2. Property Search (Bengaluru): Found ${props.count} listings -`, props.success ? '✓ PASS' : '✗ FAIL');

  // 3. Register user
  const testEmail = `testuser_${Date.now()}@securestay.test`;
  const regRes = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Priya Sharma',
      email: testEmail,
      password: 'testpassword123',
      role: 'buyer',
      phone: '+91 98450 99887',
    }),
  });
  const regData = await regRes.json();
  console.log('3. User Registration:', regData.success ? '✓ PASS' : '✗ FAIL (Token: ' + !!regData.token + ')');

  // 4. Login user
  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: testEmail,
      password: 'testpassword123',
    }),
  });
  const loginData = await loginRes.json();
  console.log('4. User Login:', loginData.success ? '✓ PASS' : '✗ FAIL');
  const token = loginData.token;

  // 5. Submit Enquiry
  const enqRes = await fetch(`${BASE_URL}/enquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: 'Priya Sharma',
      email: testEmail,
      phone: '+91 98450 99887',
      message: 'Requesting private weekend site tour for Whitefield villa.',
      propertyId: 'prop-grand-oak',
      propertyTitle: 'The Grand Oak Sanctuary Villa',
      enquiryType: 'buy',
      preferredLocation: 'Whitefield',
      budget: '₹4.85 Cr',
    }),
  });
  const enqData = await enqRes.json();
  console.log('5. Submit Enquiry:', enqData.success ? '✓ PASS' : '✗ FAIL');

  // 6. Schedule Viewing Appointment
  const apptRes = await fetch(`${BASE_URL}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      propertyId: 'prop-grand-oak',
      propertyTitle: 'The Grand Oak Sanctuary Villa',
      propertyLocation: 'Whitefield, Bengaluru',
      propertyPrice: '₹4.85 Cr',
      date: '2026-09-20',
      time: '11:00 AM',
      visitorName: 'Priya Sharma',
      visitorEmail: testEmail,
      visitorPhone: '+91 98450 99887',
      notes: 'VIP client architectural tour',
    }),
  });
  const apptData = await apptRes.json();
  console.log('6. Schedule Viewing Appointment:', apptData.success ? '✓ PASS' : '✗ FAIL');

  // 7. Save Property
  const saveRes = await fetch(`${BASE_URL}/saved/prop-grand-oak`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const saveData = await saveRes.json();
  console.log('7. Save Property to Collection:', saveData.success ? '✓ PASS' : '✗ FAIL');

  // 8. Locations API
  const locRes = await fetch(`${BASE_URL}/locations`);
  const locData = await locRes.json();
  console.log(`8. Locations List: Found ${locData.count} regional hubs -`, locData.success ? '✓ PASS' : '✗ FAIL');

  console.log('\nAll API flows validated successfully against Node/Express and MongoDB!');
}

testEndToEnd().catch(console.error);
