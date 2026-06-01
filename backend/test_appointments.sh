#!/bin/bash

# Appointment System - API Testing Guide
# Tests for all appointment booking endpoints

API_URL="http://localhost:8000/api"

echo "=================================="
echo "Appointment Booking System Tests"
echo "=================================="
echo ""

# Test 1: Get Available Dates
echo "📅 Test 1: Get Available Dates (Next 30 days)"
echo "GET /appointments/available_dates/"
echo ""
curl -s "${API_URL}/appointments/available_dates/?days_ahead=30&duration_minutes=60" | python -m json.tool
echo ""
echo ""

# Test 2: Get Available Slots for a Specific Date
echo "🕐 Test 2: Get Available Time Slots for Dec 20, 2025"
echo "GET /appointments/available_slots/"
echo ""
curl -s "${API_URL}/appointments/available_slots/?date=2025-12-20&duration_minutes=60" | python -m json.tool
echo ""
echo ""

# Test 3: Get Business Hours
echo "🏢 Test 3: List Business Hours"
echo "GET /business-hours/"
echo ""
curl -s "${API_URL}/business-hours/" | python -m json.tool
echo ""
echo ""

# Test 4: Get Holidays
echo "🎄 Test 4: List Holidays"
echo "GET /holidays/"
echo ""
curl -s "${API_URL}/holidays/" | python -m json.tool
echo ""
echo ""

# Test 5: Book an Appointment (Success Case)
echo "✅ Test 5: Book Valid Appointment"
echo "POST /appointments/"
echo ""

# Get first available date from Test 1
AVAILABLE_DATE=$(curl -s "${API_URL}/appointments/available_dates/?days_ahead=30" | python -c "import sys, json; data=json.load(sys.stdin); print(data['available_dates'][0]['date'] if data['available_dates'] else '')" 2>/dev/null)

if [ -z "$AVAILABLE_DATE" ]; then
  AVAILABLE_DATE="2025-12-20"
fi

# Get first available time slot for that date
AVAILABLE_TIME=$(curl -s "${API_URL}/appointments/available_slots/?date=${AVAILABLE_DATE}&duration_minutes=60" | python -c "import sys, json; data=json.load(sys.stdin); print(data['available_slots'][0] if data['available_slots'] else '10:00')" 2>/dev/null)

if [ -z "$AVAILABLE_TIME" ]; then
  AVAILABLE_TIME="10:00"
fi

echo "Booking for ${AVAILABLE_DATE} at ${AVAILABLE_TIME}"
echo ""

curl -s -X POST "${API_URL}/appointments/" \
  -H "Content-Type: application/json" \
  -d "{
    \"client_name\": \"John Doe\",
    \"client_email\": \"john.doe@example.com\",
    \"client_phone\": \"+1-555-0123\",
    \"service\": 1,
    \"appointment_date\": \"${AVAILABLE_DATE}\",
    \"appointment_time\": \"${AVAILABLE_TIME}\",
    \"duration_minutes\": 60,
    \"notes\": \"Regarding contract review and legal advice\"
  }" | python -m json.tool

echo ""
echo ""

# Test 6: Attempt to book same slot (should fail)
echo "❌ Test 6: Attempt Double Booking (Should Fail)"
echo "POST /appointments/"
echo ""
echo "Trying to book the same slot again..."
echo ""

curl -s -X POST "${API_URL}/appointments/" \
  -H "Content-Type: application/json" \
  -d "{
    \"client_name\": \"Jane Smith\",
    \"client_email\": \"jane.smith@example.com\",
    \"client_phone\": \"+1-555-0456\",
    \"appointment_date\": \"${AVAILABLE_DATE}\",
    \"appointment_time\": \"${AVAILABLE_TIME}\",
    \"duration_minutes\": 60,
    \"notes\": \"Second booking for same time\"
  }" | python -m json.tool

echo ""
echo ""

# Test 7: Attempt to book in the past (should fail)
echo "❌ Test 7: Attempt Past Date Booking (Should Fail)"
echo "POST /appointments/"
echo ""

curl -s -X POST "${API_URL}/appointments/" \
  -H "Content-Type: application/json" \
  -d "{
    \"client_name\": \"Past Booker\",
    \"client_email\": \"past@example.com\",
    \"client_phone\": \"+1-555-0789\",
    \"appointment_date\": \"2020-01-01\",
    \"appointment_time\": \"10:00\",
    \"duration_minutes\": 60,
    \"notes\": \"Trying to book in the past\"
  }" | python -m json.tool

echo ""
echo ""

# Test 8: List all appointments
echo "📋 Test 8: List All Appointments"
echo "GET /appointments/"
echo ""
curl -s "${API_URL}/appointments/" | python -m json.tool | head -50
echo ""
echo ""

# Test 9: Get single appointment (if any exist)
echo "🔍 Test 9: Get Single Appointment Details"
echo "GET /appointments/{id}/"
echo ""
APPOINTMENT_ID=$(curl -s "${API_URL}/appointments/" | python -c "import sys, json; data=json.load(sys.stdin); results=data.get('results', data); print(results[0]['id'] if results else '')" 2>/dev/null)

if [ -n "$APPOINTMENT_ID" ]; then
  echo "Fetching appointment: ${APPOINTMENT_ID}"
  echo ""
  curl -s "${API_URL}/appointments/${APPOINTMENT_ID}/" | python -m json.tool
else
  echo "No appointments found"
fi

echo ""
echo ""

# Test 10: Test invalid date format
echo "❌ Test 10: Invalid Date Format (Should Fail)"
echo "GET /appointments/available_slots/?date=invalid"
echo ""
curl -s "${API_URL}/appointments/available_slots/?date=invalid" | python -m json.tool
echo ""
echo ""

echo "=================================="
echo "Tests Complete!"
echo "=================================="
