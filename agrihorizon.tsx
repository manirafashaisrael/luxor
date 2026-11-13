import React, { useState, useEffect, useMemo } from 'react';
import {
  Menu, X, Globe, ChevronRight, ChevronLeft, Check, Eye, EyeOff,
  MapPin, Crosshair, Sprout, Satellite, Droplets, Sun,
  Activity, Bell, BookOpen, MessageSquare, Send, ExternalLink,
  Users, Building2, User, LogOut, Mail, ArrowRight, Info,
  Compass, Layers, Cpu, CheckCircle2, AlertCircle, Plus, KeyRound, Search
} from 'lucide-react';

// ============================================================================
// 1. COMPLETE LIST OF ALL 195 SOVEREIGN COUNTRIES IN THE WORLD (WITH DEFAULT COORDS)
// ============================================================================
const ALL_COUNTRIES = [
  { name: 'Rwanda', lat: -1.9441, lng: 30.0619 },
  { name: 'Afghanistan', lat: 33.9391, lng: 67.7100 },
  { name: 'Albania', lat: 41.1533, lng: 20.1683 },
  { name: 'Algeria', lat: 28.0339, lng: 1.6596 },
  { name: 'Andorra', lat: 42.5063, lng: 1.5218 },
  { name: 'Angola', lat: -11.2027, lng: 17.8739 },
  { name: 'Antigua and Barbuda', lat: 17.0608, lng: -61.7964 },
  { name: 'Argentina', lat: -38.4161, lng: -63.6167 },
  { name: 'Armenia', lat: 40.0691, lng: 45.0382 },
  { name: 'Australia', lat: -25.2744, lng: 133.7751 },
  { name: 'Austria', lat: 47.5162, lng: 14.5501 },
  { name: 'Azerbaijan', lat: 40.1431, lng: 47.5769 },
  { name: 'Bahamas', lat: 25.0343, lng: -77.3963 },
  { name: 'Bahrain', lat: 26.0667, lng: 50.5577 },
  { name: 'Bangladesh', lat: 23.6850, lng: 90.3563 },
  { name: 'Barbados', lat: 13.1939, lng: -59.5432 },
  { name: 'Belarus', lat: 53.7098, lng: 27.9534 },
  { name: 'Belgium', lat: 50.5039, lng: 4.4699 },
  { name: 'Belize', lat: 17.1899, lng: -88.4976 },
  { name: 'Benin', lat: 9.3077, lng: 2.3158 },
  { name: 'Bhutan', lat: 27.5142, lng: 90.4336 },
  { name: 'Bolivia', lat: -16.2902, lng: -63.5887 },
  { name: 'Bosnia and Herzegovina', lat: 43.9159, lng: 17.6791 },
  { name: 'Botswana', lat: -22.3285, lng: 24.6849 },
  { name: 'Brazil', lat: -14.2350, lng: -51.9253 },
  { name: 'Brunei', lat: 4.5353, lng: 114.7277 },
  { name: 'Bulgaria', lat: 42.7339, lng: 25.4858 },
  { name: 'Burkina Faso', lat: 12.2383, lng: -1.5616 },
  { name: 'Burundi', lat: -3.3731, lng: 29.9189 },
  { name: 'Cabo Verde', lat: 16.5388, lng: -23.0418 },
  { name: 'Cambodia', lat: 12.5657, lng: 104.9910 },
  { name: 'Cameroon', lat: 7.3697, lng: 12.3547 },
  { name: 'Canada', lat: 56.1304, lng: -106.3468 },
  { name: 'Central African Republic', lat: 6.6111, lng: 20.9394 },
  { name: 'Chad', lat: 15.4542, lng: 18.7322 },
  { name: 'Chile', lat: -35.6751, lng: -71.5430 },
  { name: 'China', lat: 35.8617, lng: 104.1954 },
  { name: 'Colombia', lat: 4.5709, lng: -74.2973 },
  { name: 'Comoros', lat: -11.6455, lng: 43.3333 },
  { name: 'Congo (Congo-Brazzaville)', lat: -0.2280, lng: 15.8277 },
  { name: 'Costa Rica', lat: 9.7489, lng: -83.7534 },
  { name: 'Croatia', lat: 45.1000, lng: 15.2000 },
  { name: 'Cuba', lat: 21.5218, lng: -77.7812 },
  { name: 'Cyprus', lat: 35.1264, lng: 33.4299 },
  { name: 'Czechia', lat: 49.8175, lng: 15.4730 },
  { name: 'Democratic Republic of the Congo', lat: -4.0383, lng: 21.7587 },
  { name: 'Denmark', lat: 56.2639, lng: 9.5018 },
  { name: 'Djibouti', lat: 11.8251, lng: 42.5903 },
  { name: 'Dominica', lat: 15.4150, lng: -61.3710 },
  { name: 'Dominican Republic', lat: 18.7357, lng: -70.1627 },
  { name: 'Ecuador', lat: -1.8312, lng: -78.1834 },
  { name: 'Egypt', lat: 26.8206, lng: 30.8025 },
  { name: 'El Salvador', lat: 13.7942, lng: -88.8965 },
  { name: 'Equatorial Guinea', lat: 1.6508, lng: 10.2679 },
  { name: 'Eritrea', lat: 15.1794, lng: 39.7823 },
  { name: 'Estonia', lat: 58.5953, lng: 25.0136 },
  { name: 'Eswatini', lat: -26.5225, lng: 31.4659 },
  { name: 'Ethiopia', lat: 9.1450, lng: 40.4897 },
  { name: 'Fiji', lat: -17.7134, lng: 178.0650 },
  { name: 'Finland', lat: 61.9241, lng: 25.7482 },
  { name: 'France', lat: 46.2276, lng: 2.2137 },
  { name: 'Gabon', lat: -0.8037, lng: 11.6094 },
  { name: 'Gambia', lat: 13.4432, lng: -15.3101 },
  { name: 'Georgia', lat: 42.3154, lng: 43.3569 },
  { name: 'Germany', lat: 51.1657, lng: 10.4515 },
  { name: 'Ghana', lat: 7.9465, lng: -1.0232 },
  { name: 'Greece', lat: 39.0742, lng: 21.8243 },
  { name: 'Grenada', lat: 12.1165, lng: -61.6790 },
  { name: 'Guatemala', lat: 15.7835, lng: -90.2308 },
  { name: 'Guinea', lat: 9.9456, lng: -9.6966 },
  { name: 'Guinea-Bissau', lat: 11.8037, lng: -15.1804 },
  { name: 'Guyana', lat: 4.8604, lng: -58.9302 },
  { name: 'Haiti', lat: 18.9712, lng: -72.2852 },
  { name: 'Holy See', lat: 41.9029, lng: 12.4534 },
  { name: 'Honduras', lat: 15.2000, lng: -86.2419 },
  { name: 'Hungary', lat: 47.1625, lng: 19.5033 },
  { name: 'Iceland', lat: 64.9631, lng: -19.0208 },
  { name: 'India', lat: 20.5937, lng: 78.9629 },
  { name: 'Indonesia', lat: -0.7893, lng: 113.9213 },
  { name: 'Iran', lat: 32.4279, lng: 53.6880 },
  { name: 'Iraq', lat: 33.2232, lng: 43.6793 },
  { name: 'Ireland', lat: 53.1424, lng: -7.6921 },
  { name: 'Israel', lat: 31.0461, lng: 34.8516 },
  { name: 'Italy', lat: 41.8719, lng: 12.5674 },
  { name: 'Ivory Coast', lat: 7.5400, lng: -5.5471 },
  { name: 'Jamaica', lat: 18.1096, lng: -77.2975 },
  { name: 'Japan', lat: 36.2048, lng: 138.2529 },
  { name: 'Jordan', lat: 30.5852, lng: 36.2384 },
  { name: 'Kazakhstan', lat: 48.0196, lng: 66.9237 },
  { name: 'Kenya', lat: -0.0236, lng: 37.9062 },
  { name: 'Kiribati', lat: -3.3704, lng: -168.7340 },
  { name: 'Kuwait', lat: 29.3117, lng: 47.4818 },
  { name: 'Kyrgyzstan', lat: 41.2044, lng: 74.7661 },
  { name: 'Laos', lat: 19.8563, lng: 102.4955 },
  { name: 'Latvia', lat: 56.8796, lng: 24.6032 },
  { name: 'Lebanon', lat: 33.8547, lng: 35.8623 },
  { name: 'Lesotho', lat: -29.6100, lng: 28.2336 },
  { name: 'Liberia', lat: 6.4281, lng: -9.4295 },
  { name: 'Libya', lat: 26.3351, lng: 17.2283 },
  { name: 'Liechtenstein', lat: 47.1660, lng: 9.5554 },
  { name: 'Lithuania', lat: 55.1694, lng: 23.8813 },
  { name: 'Luxembourg', lat: 49.8153, lng: 6.1296 },
  { name: 'Madagascar', lat: -18.7669, lng: 46.8691 },
  { name: 'Malawi', lat: -13.2543, lng: 34.3015 },
  { name: 'Malaysia', lat: 4.2105, lng: 101.9758 },
  { name: 'Maldives', lat: 3.2028, lng: 73.2207 },
  { name: 'Mali', lat: 17.5707, lng: -3.9962 },
  { name: 'Malta', lat: 35.9375, lng: 14.3754 },
  { name: 'Marshall Islands', lat: 7.1315, lng: 171.1845 },
  { name: 'Mauritania', lat: 21.0079, lng: -10.9408 },
  { name: 'Mauritius', lat: -20.3484, lng: 57.5522 },
  { name: 'Mexico', lat: 23.6345, lng: -102.5528 },
  { name: 'Micronesia', lat: 7.4256, lng: 150.5508 },
  { name: 'Moldova', lat: 47.4116, lng: 28.3699 },
  { name: 'Monaco', lat: 43.7384, lng: 7.4246 },
  { name: 'Mongolia', lat: 46.8625, lng: 103.8467 },
  { name: 'Montenegro', lat: 42.7087, lng: 19.3744 },
  { name: 'Morocco', lat: 31.7917, lng: -7.0926 },
  { name: 'Mozambique', lat: -18.6657, lng: 35.5296 },
  { name: 'Myanmar', lat: 21.9162, lng: 95.9560 },
  { name: 'Namibia', lat: -22.9576, lng: 18.4904 },
  { name: 'Nauru', lat: -0.5228, lng: 166.9315 },
  { name: 'Nepal', lat: 28.3949, lng: 84.1240 },
  { name: 'Netherlands', lat: 52.1326, lng: 5.2913 },
  { name: 'New Zealand', lat: -40.9006, lng: 174.8860 },
  { name: 'Nicaragua', lat: 12.8654, lng: -85.2072 },
  { name: 'Niger', lat: 17.6078, lng: 8.0817 },
  { name: 'Nigeria', lat: 9.0820, lng: 8.6753 },
  { name: 'North Korea', lat: 40.3399, lng: 127.5101 },
  { name: 'North Macedonia', lat: 41.6086, lng: 21.7453 },
  { name: 'Norway', lat: 60.4720, lng: 8.4689 },
  { name: 'Oman', lat: 21.4735, lng: 55.9754 },
  { name: 'Pakistan', lat: 30.3753, lng: 69.3451 },
  { name: 'Palau', lat: 7.5150, lng: 134.5825 },
  { name: 'Palestine', lat: 31.9522, lng: 35.2332 },
  { name: 'Panama', lat: 8.5380, lng: -80.7821 },
  { name: 'Papua New Guinea', lat: -6.3150, lng: 143.9555 },
  { name: 'Paraguay', lat: -23.4425, lng: -58.4438 },
  { name: 'Peru', lat: -9.1900, lng: -75.0152 },
  { name: 'Philippines', lat: 12.8797, lng: 121.7740 },
  { name: 'Poland', lat: 51.9194, lng: 19.1451 },
  { name: 'Portugal', lat: 39.3999, lng: -8.2245 },
  { name: 'Qatar', lat: 25.3548, lng: 51.1839 },
  { name: 'Romania', lat: 45.9432, lng: 24.9668 },
  { name: 'Russia', lat: 61.5240, lng: 105.3188 },
  { name: 'Saint Kitts and Nevis', lat: 17.3578, lng: -62.7830 },
  { name: 'Saint Lucia', lat: 13.9094, lng: -60.9789 },
  { name: 'Saint Vincent and the Grenadines', lat: 12.9843, lng: -61.2872 },
  { name: 'Samoa', lat: -13.7590, lng: -172.1046 },
  { name: 'San Marino', lat: 43.9424, lng: 12.4578 },
  { name: 'Sao Tome and Principe', lat: 0.1864, lng: 6.6131 },
  { name: 'Saudi Arabia', lat: 23.8859, lng: 45.0792 },
  { name: 'Senegal', lat: 14.4974, lng: -14.4524 },
  { name: 'Serbia', lat: 44.0165, lng: 21.0059 },
  { name: 'Seychelles', lat: -4.6796, lng: 55.4920 },
  { name: 'Sierra Leone', lat: 8.4606, lng: -11.7799 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'Slovakia', lat: 48.6690, lng: 19.6990 },
  { name: 'Slovenia', lat: 46.1512, lng: 14.9955 },
  { name: 'Solomon Islands', lat: -9.6457, lng: 160.1562 },
  { name: 'Somalia', lat: 5.1521, lng: 46.1996 },
  { name: 'South Africa', lat: -30.5595, lng: 22.9375 },
  { name: 'South Korea', lat: 35.9078, lng: 127.7669 },
  { name: 'South Sudan', lat: 6.8770, lng: 31.3070 },
  { name: 'Spain', lat: 40.4637, lng: -3.7492 },
  { name: 'Sri Lanka', lat: 7.8731, lng: 80.7718 },
  { name: 'Sudan', lat: 12.8628, lng: 30.2176 },
  { name: 'Suriname', lat: 3.9193, lng: -56.0278 },
  { name: 'Sweden', lat: 60.1282, lng: 18.6435 },
  { name: 'Switzerland', lat: 46.8182, lng: 8.2275 },
  { name: 'Syria', lat: 34.8021, lng: 38.9968 },
  { name: 'Tajikistan', lat: 38.8610, lng: 71.2761 },
  { name: 'Tanzania', lat: -6.3690, lng: 34.8888 },
  { name: 'Thailand', lat: 15.8700, lng: 100.9925 },
  { name: 'Timor-Leste', lat: -8.8742, lng: 125.7275 },
  { name: 'Togo', lat: 8.6195, lng: 0.8248 },
  { name: 'Tonga', lat: -21.1790, lng: -175.1982 },
  { name: 'Trinidad and Tobago', lat: 10.6918, lng: -61.2225 },
  { name: 'Tunisia', lat: 33.8869, lng: 9.5375 },
  { name: 'Turkey', lat: 38.9637, lng: 35.2433 },
  { name: 'Turkmenistan', lat: 38.9697, lng: 59.5563 },
  { name: 'Tuvalu', lat: -7.1095, lng: 177.6493 },
  { name: 'Uganda', lat: 1.3733, lng: 32.2903 },
  { name: 'Ukraine', lat: 48.3794, lng: 31.1656 },
  { name: 'United Arab Emirates', lat: 23.4241, lng: 53.8478 },
  { name: 'United Kingdom', lat: 55.3781, lng: -3.4360 },
  { name: 'United States', lat: 37.0902, lng: -95.7129 },
  { name: 'Uruguay', lat: -32.5228, lng: -55.7658 },
  { name: 'Uzbekistan', lat: 41.3775, lng: 64.5853 },
  { name: 'Vanuatu', lat: -15.3767, lng: 166.9592 },
  { name: 'Venezuela', lat: 6.4238, lng: -66.5897 },
  { name: 'Vietnam', lat: 14.0583, lng: 108.2772 },
  { name: 'Yemen', lat: 15.5527, lng: 48.5164 },
  { name: 'Zambia', lat: -13.1339, lng: 27.8493 },
  { name: 'Zimbabwe', lat: -19.0154, lng: 29.1549 },
];

// ============================================================================
// 2. TRILINGUAL TRANSLATION DICTIONARY (EN · RW · FR) — CROP CULTIVATION ONLY
// ============================================================================
const TRANSLATIONS = {
  en: {
    brandSub: 'INKINDI TECH',
    nav: {
      login: 'LOGIN',
      getStarted: 'GET STARTED',
      home: 'Home',
      about: 'About Us',
      mission: 'Our Mission & Vision',
      whatWeDo: 'What We Do',
      howItWorks: 'How It Works',
      satellite: 'Satellite Tech',
      dashboard: 'Crop Platform',
      contact: 'Contact Us',
      adminInbox: 'Admin Inbox',
      logout: 'Log Out',
    },
    hero: {
      badge: 'SATELLITE & AI CROP CULTIVATION',
      title: 'SEE BEYOND. GROW SMARTER.',
      subtitle: 'Empowering crop growers and cooperatives worldwide with satellite Earth observation, Google Maps field positioning, and clear agronomic guidance.',
      ctaPrimary: 'GET STARTED',
      ctaSecondary: 'EXPLORE PLATFORM',
      ctaDash: 'OPEN CROP PLATFORM',
    },
    entry: {
      titleLogin: 'Sign In to AGRIHORIZON',
      titleStart: 'Choose Your Cultivation Profile',
      subtitle: 'Select your account category to access satellite crop monitoring and Google Maps field intelligence.',
      individual: {
        title: 'Individual Crop Grower',
        desc: 'Register your cultivation plot, pin exact Google Maps GPS coordinates, and track crop vigor.',
        btnLogin: 'Grower Sign In',
        btnStart: 'Register as Grower',
      },
      group: {
        title: 'Farmer Group / Cooperative',
        desc: 'Coordinate smallholder crop producers, aggregate harvests, and monitor collective fields.',
        btnLogin: 'Cooperative Sign In',
        btnStart: 'Register Group / Coop',
      },
      org: {
        title: 'Agricultural Organization',
        desc: 'Enterprise, NGO, or agribusiness crop oversight across countries and supply chains.',
        btnLogin: 'Organization Sign In',
        btnStart: 'Register Organization',
      },
    },
    auth: {
      emailOrPhone: 'Email Address or Phone Number',
      password: 'Password',
      signInBtn: 'SIGN IN TO ACCOUNT',
      forgotLink: 'Forgot password?',
      demoBtn: 'Instant Demo Grower Login',
      noAccount: 'Need a new account?',
      registerLink: 'Create Account',
      invalidCreds: 'Invalid credentials. Please check your email/phone and password, or use Demo Login.',
      forgotTitle: 'Reset Account Password',
      forgotDesc: 'Enter your registered email or phone to verify your account and set a new password.',
      newPass: 'New Password (min 8 chars)',
      confirmPass: 'Confirm New Password',
      resetBtn: 'UPDATE PASSWORD',
      resetSuccess: 'Password updated! You can now sign in.',
      backToLogin: 'Back to Sign In',
    },
    reg: {
      step1: 'Personal & Security',
      step2: 'Cultivation Plot',
      step3: 'Cultivation Goals',
      step4: 'Country & Google Maps',
      step5: 'Review & Confirm',
      fullName: 'Full Name',
      phone: 'Phone Number',
      email: 'Email Address',
      createPass: 'Create Password (min 8 characters)',
      confirmPass: 'Confirm Password',
      prefLang: 'Preferred Language',
      farmName: 'Cultivation Plot / Field Name',
      farmType: 'Cultivation System',
      farmSize: 'Cultivated Area',
      sizeUnit: 'Unit',
      experience: 'Years of Cultivation Experience',
      irrigation: 'Irrigation System',
      soilType: 'Soil Type',
      selectCrops: 'Select Cultivated Crops',
      selectGoals: 'Select Cultivation Priorities',
      countryLabel: 'Country (195 Countries)',
      regionLabel: 'District / Province / Administrative Region',
      gpsTitle: 'Google Maps Field Location & GPS',
      gpsDesc: 'Capture live device GPS or enter decimal coordinates to preview and confirm your field on Google Maps.',
      useGpsBtn: 'USE MY CURRENT LOCATION',
      locating: 'Acquiring GPS signal...',
      latLabel: 'Latitude (-90 to 90)',
      lngLabel: 'Longitude (-180 to 180)',
      confirmLocBtn: 'CONFIRM FARM LOCATION',
      openGoogleMaps: 'Open in Google Maps',
      locConfirmed: 'Google Maps Field Location Confirmed',
      reviewTitle: 'Review Cultivation Registration',
      submitBtn: 'COMPLETE REGISTRATION',
      nextBtn: 'Continue',
      backBtn: 'Back',
      passMismatch: 'Passwords do not match.',
      passShort: 'Password must be at least 8 characters.',
      reqField: 'Please complete required fields.',
      reqLoc: 'Please confirm valid field coordinates on Google Maps before continuing.',
    },
    orgReg: {
      title: 'Group, Cooperative & Organization Registration',
      subtitle: 'Create a global institutional account to manage crop growers, fields, and regional yields.',
      categoryLabel: 'Organization Category',
      categories: [
        'Ordinary crop farmer group',
        'Registered agricultural cooperative',
        'Private crop agribusiness company',
        'Community-based farming organization',
        'Other agricultural organization',
      ],
      orgName: 'Organization / Cooperative Name',
      contactPerson: 'Primary Administrator Name',
      adminEmail: 'Administrator Email',
      phone: 'Contact Phone',
      country: 'Country (195 Countries)',
      region: 'Operating Province / District / State',
      memberCount: 'Estimated Crop Growers / Plots',
      primaryCrops: 'Primary Focus Crops',
      submitBtn: 'CREATE ORGANIZATION ACCOUNT',
    },
    inbox: {
      title: 'Email Dispatch & Admin Notification Center',
      subtitle: 'Automated confirmation emails generated upon registration and system onboarding.',
      adminConfigLabel: 'Configured Admin Recipient Email:',
      updateAdminBtn: 'Save',
      farmerTab: 'Grower / User Confirmation Email',
      adminTab: 'Admin Notification Email',
      sendMailto: 'Open in Email Client (mailto)',
      empty: 'No registrations recorded yet. Complete a registration to inspect generated emails.',
    },
    dash: {
      title: 'Crop Intelligence Platform',
      demoBanner: 'PROTOTYPE DEMONSTRATION: Weather, soil moisture, and NDVI crop indices below are simulated demonstration telemetry.',
      plotSummary: 'Active Cultivation Plot',
      weatherCard: 'Field Micro-Climate (Demo)',
      soilCard: 'Root-Zone Moisture (Demo)',
      ndviCard: 'Crop Vigor NDVI (Demo)',
      mapCardTitle: 'Google Maps Field View',
      logTitle: 'Crop Cultivation Log',
      addLogPlaceholder: 'Log sowing, weeding, irrigation, organic compost, or harvest...',
      addLogBtn: 'Add Log',
      learnTitle: 'Agronomy & Crop Guides',
      aiTitle: 'AGRIHORIZON Crop AI Advisor (Prototype)',
      aiPlaceholder: 'Ask about crop nutrition, irrigation timing, or soil care...',
      aiSend: 'Ask',
    },
    pages: {
      about: {
        title: 'About AGRIHORIZON',
        lead: 'Built by INKINDI TECH to connect orbital Earth observation and Google Maps precision with everyday crop cultivation.',
        p1: 'AGRIHORIZON transforms multispectral satellite imagery, weather modeling, and soil agronomy into clear guidance accessible on mobile devices anywhere in the world.',
        p2: 'Dedicated exclusively to sustainable crop cultivation, our platform empowers individual growers, cooperatives, and agricultural organizations across 195 countries.',
      },
      mission: {
        title: 'Our Mission & Vision',
        missionTitle: 'Our Mission',
        missionText: 'To democratize precision crop cultivation by equipping every grower and cooperative with timely satellite intelligence, Google Maps field positioning, and climate-smart tools.',
        visionTitle: 'Our Vision',
        visionText: 'A resilient, food-secure global agricultural ecosystem where every cultivated hectare thrives with data-driven clarity.',
      },
      whatWeDo: {
        title: 'What We Do',
        subtitle: 'Seven core capabilities engineered for modern crop cultivation:',
        items: [
          { title: 'Satellite Crop Vigor Monitoring', desc: 'Track vegetation indices (NDVI/EVI) across crop stages to detect stress early.' },
          { title: 'Google Maps & GPS Field Pinning', desc: 'Geo-reference exact cultivation coordinates across all 195 countries.' },
          { title: 'Localized Rainfall & Micro-Climate Advisories', desc: 'Optimize sowing, weeding, foliar feeding, and harvest windows.' },
          { title: 'Root-Zone Soil Moisture & Irrigation', desc: 'Estimate crop water demand to prevent drought stress and conserve water.' },
          { title: 'Cooperative & Multi-Field Aggregation', desc: 'Unified crop oversight for farmer groups, cooperatives, and enterprises.' },
          { title: 'Digital Cultivation & Harvest Logs', desc: 'Structured record-keeping for seed varieties, inputs, scouting, and yields.' },
          { title: 'Trilingual Crop AI Assistant', desc: 'Accessible crop agronomy guidance in English, Kinyarwanda, and French.' },
        ],
      },
      howItWorks: {
        title: 'How It Works',
        steps: [
          { num: '01', title: 'Select Country & Profile', desc: 'Choose your country (195 supported) and register as a Grower, Cooperative, or Organization.' },
          { num: '02', title: 'Pin Field on Google Maps', desc: 'Capture live GPS or decimal coordinates and verify your exact cultivation plot.' },
          { num: '03', title: 'Satellite & Climate Fusion', desc: 'AGRIHORIZON pairs your field coordinates with Earth observation and weather layers.' },
          { num: '04', title: 'Grow Smarter Every Day', desc: 'Monitor crop vigor, log cultivation activities, and consult the Crop AI Advisor.' },
        ],
      },
      satellite: {
        title: 'Satellite & Earth Observation Tech',
        lead: 'Multi-spectral remote sensing calibrated for global crop cultivation.',
        disclaimer: 'TRANSPARENCY & NON-ENDORSEMENT NOTICE: AGRIHORIZON references open Earth observation methodologies (such as Sentinel-2 and Landsat spectral bands) for analytical context. This platform is an independent product by INKINDI TECH and is not officially endorsed by ESA, NASA, or Copernicus. Telemetry values in this prototype use demonstration datasets.',
        cards: [
          { title: 'Multispectral Crop Indices', desc: 'Near-infrared and red-edge reflectance analysis to measure leaf chlorophyll and canopy density.' },
          { title: 'Cloud-Filtered Growth Curves', desc: 'Composite imagery tracking week-over-week crop biomass from emergence to harvest.' },
          { title: 'Sub-Field Stress Detection', desc: 'Early identification of localized nutrient deficiency, pest pressure, or moisture deficit.' },
        ],
      },
      contact: {
        title: 'Contact INKINDI TECH',
        subtitle: 'Questions about cooperative onboarding, global deployment, or crop platform support?',
        name: 'Your Name',
        email: 'Your Email',
        subject: 'Subject',
        message: 'Message',
        sendBtn: 'SEND MESSAGE',
        sentMsg: 'Thank you! Your message has been recorded for the INKINDI TECH team.',
      },
    },
  },

  rw: {
    brandSub: 'INKINDI TECH',
    nav: {
      login: 'INJIRA',
      getStarted: 'TANGIRA',
      home: 'Ahabanza',
      about: 'Abo Turi Bo',
      mission: 'Intego n’Icyerekezo',
      whatWeDo: 'Ibyo Dukora',
      howItWorks: 'Uko Bikora',
      satellite: 'Ikoranabuhanga rya Satelite',
      dashboard: 'Urubuga rw’Ibihingwa',
      contact: 'Twandikire',
      adminInbox: 'Ubutumwa bw’Ubuyobozi',
      logout: 'Sohoka',
    },
    hero: {
      badge: 'UBUHINZI BW’IBIHINGWA KURI SATELITE NA AI',
      title: 'REBA KURE, UHINGE NEZA.',
      subtitle: 'Guha abahinzi b’ibihingwa n’amakoperative ku isi yose amakuru ya satelite, ikarita ya Google Maps y’umurima, n’inama z’ubuhinzi zigezweho.',
      ctaPrimary: 'TANGIRA NONAHA',
      ctaSecondary: 'MENYA BYINSHI',
      ctaDash: 'FUNGURA URUBUGA',
    },
    entry: {
      titleLogin: 'Injira muri AGRIHORIZON',
      titleStart: 'Hitamo Ubwoko bwa Konti',
      subtitle: 'Hitamo icyiciro cyawe kugira ngo ubone serivisi z’ikurikirana ry’ibihingwa na Google Maps.',
      individual: {
        title: 'Umuhinzi w’Ibihingwa ku Giti Cye',
        desc: 'Andikisha umurima wawe, wemeze aho uherereye kuri Google Maps, ukurikirane ibihingwa.',
        btnLogin: 'Injira nk’Umuhinzi',
        btnStart: 'Iyandikishe nk’Umuhinzi',
      },
      group: {
        title: 'Itsinda / Koperative y’Abahinzi',
        desc: 'Huza abahinzi b’ibihingwa, ukurikirane umusaruro rusange n’imirima ya koperative.',
        btnLogin: 'Injira nka Koperative',
        btnStart: 'Andikisha Koperative',
      },
      org: {
        title: 'Ikigo / Sosiyete y’Ubuhinzi',
        desc: 'Gukurikirana imishinga y’ubuhinzi bw’ibihingwa mu bihugu n’uturere twinshi.',
        btnLogin: 'Injira nk’Ikigo',
        btnStart: 'Andikisha Ikigo',
      },
    },
    auth: {
      emailOrPhone: 'Imeyili cyangwa Nimero ya Telefoni',
      password: 'Ijambobanga',
      signInBtn: 'INJIRA MURI KONTI',
      forgotLink: 'Wibagiwe ijambobanga?',
      demoBtn: 'Injira vuba na Konti y’Igerageza',
      noAccount: 'Nta konti uragira?',
      registerLink: 'Fungura Konti',
      invalidCreds: 'Amakuru winjije si yo. Ongera ugerageze cyangwa ukoreshe Konti y’Igerageza.',
      forgotTitle: 'Hindura Ijambobanga',
      forgotDesc: 'Andika imeyili cyangwa telefoni wakoresheje wiyandikisha kugira ngo ushyireho ijambobanga rishya.',
      newPass: 'Ijambobanga Rishya (nibura inyuguti 8)',
      confirmPass: 'Emeza Ijambobanga Rishya',
      resetBtn: 'EMEZA IJAMBOBANGA RISHYA',
      resetSuccess: 'Ijambobanga ryahinduwe! Ushobora kwinjira.',
      backToLogin: 'Subira aho binjirira',
    },
    reg: {
      step1: 'Umwirondoro n’Umutekano',
      step2: 'Umurima n’Ibihingwa',
      step3: 'Intego z’Ubuhinzi',
      step4: 'Igihugu na Google Maps',
      step5: 'Subiramo Wemeze',
      fullName: 'Amazina Yose',
      phone: 'Nimero ya Telefoni',
      email: 'Imeyili (Email)',
      createPass: 'Hanga Ijambobanga (nibura inyuguti 8)',
      confirmPass: 'Emeza Ijambobanga',
      prefLang: 'Ururimi Wifuza',
      farmName: 'Izina ry’Umurima',
      farmType: 'Ubwoko bw’Ubuhinzi bw’Ibihingwa',
      farmSize: 'Ubuso bw’Umurima',
      sizeUnit: 'Igipimo',
      experience: 'Imyaka y’Uburambe mu Guhinga',
      irrigation: 'Uburyo bwo Kuhira',
      soilType: 'Ubwoko bw’Ubutaka',
      selectCrops: 'Hitamo Ibihingwa Uhinga',
      selectGoals: 'Hitamo Intego z’Ubuhinzi',
      countryLabel: 'Igihugu (Ibihugu 195 byose ku Isi)',
      regionLabel: 'Akarere / Intara / Agace',
      gpsTitle: 'Ikarita ya Google Maps na GPS y’Umurima',
      gpsDesc: 'Koresha GPS ya telefoni cyangwa wandike imibare ya Latitude na Longitude urebe umurima kuri Google Maps.',
      useGpsBtn: 'KORESHA AHO NDI NONAHA (GPS)',
      locating: 'Gushakisha ibipimo bya GPS...',
      latLabel: 'Latitude (-90 kugeza 90)',
      lngLabel: 'Longitude (-180 kugeza 180)',
      confirmLocBtn: 'EMEZA AHO UMURIMA UHEREREYE',
      openGoogleMaps: 'Fungura muri Google Maps',
      locConfirmed: 'Aho umurima uherereye kuri Google Maps hemejwe',
      reviewTitle: 'Incamake y’Iyandikisha',
      submitBtn: 'SOZA IYANDIKISHA',
      nextBtn: 'Komeza',
      backBtn: 'Subira Inyuma',
      passMismatch: 'Amagambobanga ntabwo ahura.',
      passShort: 'Ijambobanga rigomba kugira nibura inyuguti 8.',
      reqField: 'Nyamuneka uzuza imyanya ikenewe.',
      reqLoc: 'Nyamuneka emeza ibipimo bya GPS by’umurima kuri Google Maps mbere yo gukomeza.',
    },
    orgReg: {
      title: 'Kwandikisha Itsinda, Koperative cyangwa Ikigo',
      subtitle: 'Fungura konti y’ikigo kugira ngo ukurikirane abahinzi b’ibihingwa n’imirima.',
      categoryLabel: 'Icyiciro cy’Ikigo',
      categories: [
        'Itsinda risanzwe ry’abahinzi b’ibihingwa',
        'Koperative y’ubuhinzi yanditswe',
        'Sosiyete yigenga y’ubuhinzi',
        'Umuryango ushingiye ku baturage (CBO)',
        'Ikindi kigo gikora mu buhinzi',
      ],
      orgName: 'Izina rya Koperative / Ikigo',
      contactPerson: 'Amazina y’Umuyobozi Mukuru',
      adminEmail: 'Imeyili y’Ubuyobozi',
      phone: 'Telefoni',
      country: 'Igihugu (Ibihugu 195)',
      region: 'Intara / Akarere mukoreramo',
      memberCount: 'Umubare w’Abahinzi / Imirima',
      primaryCrops: 'Ibihingwa By’ingenzi',
      submitBtn: 'FUNGURA KONTI Y’IKIGO',
    },
    inbox: {
      title: 'Ubutumwa bwa Imeyili n’Ubuyobozi',
      subtitle: 'Imeyili zoherezwa mu buryo bwikora nyuma yo kwiyandikisha.',
      adminConfigLabel: 'Imeyili y’Ubuyobozi yakira amakuru:',
      updateAdminBtn: 'Bika',
      farmerTab: 'Imeyili y’Umuhinzi / Uwiyandikishije',
      adminTab: 'Imeyili igenewe Ubuyobozi',
      sendMailto: 'Fungura muri Email (mailto)',
      empty: 'Nta muntu uriyandikisha. Iyandikishe kugira ngo urebe imeyili zoherezwa.',
    },
    dash: {
      title: 'Urubuga rw’Ubwenge bw’Ibihingwa',
      demoBanner: 'IGERAGEZA (DEMO): Ibipimo by’ikirere, ubuhehere bw’ubutaka na NDVI bigaragara hano ni iby’igerageza.',
      plotSummary: 'Umurima w’Ibihingwa Ukurikiranwa',
      weatherCard: 'Ikirere (Demo)',
      soilCard: 'Ubutaka n’Amazi (Demo)',
      ndviCard: 'Ubuzima bw’Igihingwa NDVI (Demo)',
      mapCardTitle: 'Ikarita ya Google Maps y’Umurima',
      logTitle: 'Ibikorwa by’Ubuhinzi mu Murima',
      addLogPlaceholder: 'Andika ibyakozwe (gutera, kubagara, kuhira, ifumbire, gusarura...)',
      addLogBtn: 'Bika',
      learnTitle: 'Isomero ry’Ubuhinzi',
      aiTitle: 'Umujyanama AI w’Ibihingwa (Demo)',
      aiPlaceholder: 'Baza ikibazo ku bihingwa, kuhira, cyangwa ubutaka...',
      aiSend: 'Baza',
    },
    pages: {
      about: {
        title: 'Abo Turi Bo - AGRIHORIZON',
        lead: 'Yakozwe na INKINDI TECH kugira ngo ihuze ikoranabuhanga rya satelite na Google Maps n’ubuhinzi bw’ibihingwa.',
        p1: 'AGRIHORIZON ihindura amashusho ya satelite n’amakuru y’ikirere mo inama zumvikana kandi zoroheye abahinzi b’ibihingwa ku isi yose.',
        p2: 'Yibanda gusa ku buhinzi bw’ibihingwa, igafasha abahinzi ku giti cyabo, amakoperative, n’ibigo by’ubuhinzi mu bihugu 195.',
      },
      mission: {
        title: 'Intego n’Icyerekezo',
        missionTitle: 'Intego Yacu',
        missionText: 'Kugeza ubuhinzi bugezweho bw’ibihingwa kuri buri muhinzi na koperative binyuze mu makuru ya satelite na Google Maps.',
        visionTitle: 'Icyerekezo Cyacu',
        visionText: 'Ubuhinzi bw’ibihingwa buteye imbere kandi bwihagije mu biribwa ku isi yose.',
      },
      whatWeDo: {
        title: 'Ibyo Dukora',
        subtitle: 'Serivisi ndwi z’ingenzi ziteza imbere ubuhinzi bw’ibihingwa:',
        items: [
          { title: 'Gukurikirana Ibihingwa na Satelite', desc: 'Kumenya ubuzima bw’ibihingwa (NDVI) hakiri kare.' },
          { title: 'Ikarita ya Google Maps na GPS', desc: 'Kubika neza aho buri murima uherereye mu bihugu 195.' },
          { title: 'Amakuru y’Ikirere n’Imvura', desc: 'Guteganya igihe cyiza cyo gutera, kubagara no gusarura.' },
          { title: 'Ubuhehere bw’Ubutaka no Kuhira', desc: 'Kumenya igihe ibihingwa bikeneye amazi.' },
          { title: 'Guhuza Amakoperative', desc: 'Gukurikirana abahinzi benshi n’imirima yabo hamwe.' },
          { title: 'Kubika Ibikorwa by’Ibihingwa', desc: 'Kwandika imbuto, ifumbire, n’umusaruro wabonetse.' },
          { title: 'Umujyanama AI mu Kinyarwanda', desc: 'Inama z’ubuhinzi mu Kinyarwanda, Icyongereza n’Igifaransa.' },
        ],
      },
      howItWorks: {
        title: 'Uko Bikora',
        steps: [
          { num: '01', title: 'Hitamo Igihugu Wiyandikishe', desc: 'Hitamo igihugu cyawe (195) ufungure konti y’Umuhinzi, Koperative cyangwa Ikigo.' },
          { num: '02', title: 'Emeza Umurima kuri Google Maps', desc: 'Fata ibipimo bya GPS urebe umurima wawe ku ikarita.' },
          { num: '03', title: 'Isesengura rya Satelite', desc: 'Sisitemu ihuza umurima wawe n’amakuru ya satelite n’ikirere.' },
          { num: '04', title: 'Fata Ibyemezo Byiza', desc: 'Reba uko ibihingwa bihagaze kandi ubaze umujyanama AI.' },
        ],
      },
      satellite: {
        title: 'Ikoranabuhanga rya Satelite',
        lead: 'Gusesengura imirima y’ibihingwa hifashishijwe amashusho ya satelite.',
        disclaimer: 'ITANGAZO RYO KUMENYESHA: AGRIHORIZON yifashisha ubumenyi bw’amashusho ya satelite (nka Sentinel-2 na Landsat) mu gutanga amakuru y’ubuhinzi. Iyi ni porogaramu yigenga ya INKINDI TECH kandi ntabwo ihagarariye ESA cyangwa NASA. Imibare iri muri iyi porogaramu y’igerageza ni iy’icyitegererezo.',
        cards: [
          { title: 'Ibipimo by’Ubuzima bw’Ibihingwa', desc: 'Gupima ubwiza bw’amababi n’imikurire y’ibihingwa hakoreshejwe urumuri rwa satelite.' },
          { title: 'Gukurikirana Igihembwe Cyose', desc: 'Kureba impinduka z’umurima icyumweru ku kindi.' },
          { title: 'Kuburira Hakiri Kare', desc: 'Kumenya aho ibihingwa bifite ikibazo cy’amazi cyangwa intungamubiri.' },
        ],
      },
      contact: {
    title: 'Twandikire - INKINDI TECH',
    subtitle: 'Ufite ikibazo cyangwa wifuza gukorana natwe? Twandikire.',
    name: 'Amazina Yawe',
    email: 'Imeyili Yawe',
    subject: 'Impamvu y’Ubutumwa',
    message: 'Ubutumwa Bwawe',
    sendBtn: 'OHEREZA UBUTUMWA',
    sentMsg: 'Murakoze! Ubutumwa bwanyu bwakiriwe n’ikipe ya INKINDI TECH.',
  },
},

  fr: {
    langName: 'Français',
    sloganLocal: 'REBA KURE, UHINGE NEZA.',
    sloganMain1: 'VOIR PLUS LOIN.',
    sloganMain2: 'CULTIVER PLUS INTELLIGEMMENT.',
    heroSub:
      'Une plateforme agrotechnologique combinant les observations satellitaires de la Terre, l’intelligence environnementale et l’aide à la décision par IA pour l’agriculture au Rwanda et en Afrique.',
    login: 'CONNEXION',
    getStarted: 'COMMENCER',
    exploreDash: 'DÉMO PLATEFORME AGRICULTEUR',
    signOut: 'DÉCONNEXION',
    adminLog: 'BOÎTE ADMIN',
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      mission: 'Mission & Vision',
      whatWeDo: 'Ce Que Nous Faisons',
      howItWorks: 'Comment Ça Marche',
      satellite: 'Tech Satellite',
      dashboard: 'Espace Agriculteur',
      contact: 'Contact',
    },
    footerTag: 'Observations de la Terre & intelligence agricole. Développé indépendamment par INKINDI TECH.',
    prototypeBanner:
      'APERÇU PROTOTYPE : Les comptes utilisent le stockage local du navigateur. Les données satellites, météo et IA sont illustratives en attendant la connexion aux API réelles.',
    about: {
      tag: 'À PROPOS D’AGRIHORIZON',
      title: 'Transformer l’Agriculture au Rwanda et en Afrique par l’Intelligence Spatiale',
      p1: 'AGRIHORIZON est une plateforme agrotechnologique créée par INKINDI TECH. Nous relions les données d’observation de la Terre par satellite, le savoir agronomique local et la gestion quotidienne des parcelles.',
      p2: 'Au Rwanda et en Afrique subsaharienne, les agriculteurs et coopératives font face à l’irrégularité des pluies et à la dégradation des sols. AGRIHORIZON traduit les indicateurs satellitaires en décisions agricoles concrètes.',
      problemTitle: 'Le Défi Que Nous Relevons',
      problemDesc:
        'Les agriculteurs manquent souvent de visibilité locale sur les fenêtres de semis et l’état des sols car les données environnementales restent trop techniques.',
      valueTitle: 'Pourquoi C’est Essentiel',
      valueDesc:
        'En associant des parcelles géolocalisées par GPS à l’intelligence des cultures, les agriculteurs réduisent les pertes d’intrants et renforcent leur résilience climatique.',
      disclaimerTitle: 'Initiative Indépendante de Données Ouvertes',
      disclaimerDesc:
        'AGRIHORIZON exploite des données publiques d’observation de la Terre de la NASA ainsi que l’expertise locale. La plateforme est développée indépendamment par INKINDI TECH et n’est pas officiellement approuvée ou sponsorisée par la NASA.',
    },
    mission: {
      tag: 'NOTRE MISSION & VISION',
      title: 'Une Agriculture Durable Propulsée par l’Innovation Accessible',
      missionTitle: 'Notre Mission',
      missionText:
        'Doter les agriculteurs individuels, coopératives et organisations agricoles au Rwanda et en Afrique d’une intelligence environnementale accessible et d’outils numériques pratiques.',
      visionTitle: 'Notre Vision',
      visionText:
        'Un écosystème agricole africain résilient et prospère où chaque exploitation peut voir au-delà des incertitudes climatiques et cultiver plus intelligemment.',
      pillars: [
        {
          title: 'Intelligence Accessible',
          desc: 'Des informations claires en Kinyarwanda, Anglais et Français, optimisées pour mobile.',
        },
        {
          title: 'Gestion Écologique',
          desc: 'Promotion de la conservation des sols, de la rotation des cultures et de la gestion de l’eau.',
        },
        {
          title: 'Autonomisation des Coopératives',
          desc: 'Relier producteurs individuels, groupements et institutions sur une même plateforme.',
        },
        {
          title: 'Rigueur Scientifique',
          desc: 'Associer les principes d’observation de la Terre aux registres réels des exploitations.',
        },
      ],
    },
    whatWeDo: {
      tag: 'CE QUE NOUS FAISONS',
      title: 'Sept Piliers d’Intelligence Agricole',
      sub: 'Des fonctionnalités intégrées pour accompagner chaque étape de la saison agricole.',
      items: [
        {
          title: 'Observation Satellitaire & Terre',
          desc: 'Suivi de la végétation et des paysages issu des missions publiques d’observation de la Terre.',
        },
        {
          title: 'Intelligence Agricole',
          desc: 'Synthèse des registres de ferme, coordonnées GPS et conditions régionales.',
        },
        {
          title: 'Informations Climatiques',
          desc: 'Tendances pluviométriques saisonnières, variations thermiques et sensibilisation aux risques.',
        },
        {
          title: 'Gestion des Cultures',
          desc: 'Aptitude des cultures, calendriers de semis et planification des rotations.',
        },
        {
          title: 'Suivi des Sols & Terres',
          desc: 'Suivi des types de sols, lutte contre l’érosion et rétention d’humidité.',
        },
        {
          title: 'Assistance IA Agricole',
          desc: 'Assistant interactif pour les questions de gestion des cultures, des sols et de la météo.',
        },
        {
          title: 'Éducation à l’Agriculture Durable',
          desc: 'Guides pratiques sur l’agriculture régénératrice et adaptée au climat.',
        },
      ],
    },
    howItWorks: {
      tag: 'COMMENT ÇA MARCHE',
      title: 'De l’Observation à de Meilleures Décisions',
      sub: 'Un cycle simple en quatre étapes conçu pour la clarté sur le terrain.',
      steps: [
        {
          title: '1. Collecter les Informations Agricoles Pertinentes',
          desc: 'L’agriculteur crée son profil, confirme la position GPS de sa ferme et renseigne ses sols et cultures.',
        },
        {
          title: '2. Analyser et Comprendre les Données',
          desc: 'AGRIHORIZON croise les coordonnées de la parcelle avec les indicateurs environnementaux et agronomiques.',
        },
        {
          title: '3. Présenter des Informations Utiles',
          desc: 'Les données complexes sont traduites en tableaux de bord visuels, alertes et conseils multilingues.',
        },
        {
          title: '4. Soutenir de Meilleures Décisions Agricoles',
          desc: 'Les agriculteurs planifient les rotations, optimisent les semis et suivent leurs activités.',
        },
      ],
    },
    satellite: {
      tag: 'TECHNOLOGIE SATELLITE & OBSERVATION DE LA TERRE',
      title: 'Observer Vos Terres Depuis l’Orbite',
      sub: 'Comment les satellites d’observation aident à suivre la vigueur des cultures et les conditions environnementales au Rwanda.',
      notice:
        'VISUALISATION DE DÉMONSTRATION : Les indicateurs ci-dessous illustrent le fonctionnement des indices satellitaires. Les flux NASA en direct seront connectés via API backend.',
      cards: [
        {
          title: 'Suivi de la Végétation (Concept NDVI)',
          desc: 'Les satellites mesurent la lumière réfléchie par les feuilles pour évaluer la densité végétale et détecter le stress hydrique.',
        },
        {
          title: 'Observation des Terres & Parcelles',
          desc: 'Le contexte spatial aide à distinguer les parcelles cultivées, collines en terrasses et zones agroforestières.',
        },
        {
          title: 'Analyse Environnementale & Humidité',
          desc: 'Les données de température de surface et de précipitations révèlent les périodes sèches et l’humidité des sols.',
        },
        {
          title: 'Planification Saisonnière',
          desc: 'L’historique des pluies aide les coopératives à caler les semis sur les saisons agricoles (Saisons A, B et C).',
        },
      ],
    },
    dashboard: {
      tag: 'PLATEFORME INTELLIGENCE AGRICULTEUR',
      title: 'Espace Agriculteur & Données de Parcelle',
      demoBadge: 'PROTOTYPE INTERACTIF — DONNÉES DE DÉMONSTRATION',
      tabs: {
        overview: 'Ferme & Climat',
        activities: 'Journal d’Activités',
        ai: 'Assistant IA',
        learn: 'Ressources',
      },
      profileTitle: 'Profil Agriculteur & Parcelle',
      weatherTitle: 'Aperçu Climat & Sol (Démo)',
      alertsTitle: 'Notifications Agricoles',
      activityTitle: 'Registre des Activités de la Ferme',
      activitySub: 'Enregistrez vos opérations de semis, sarclage, fertilisation ou récolte.',
      addActivity: 'AJOUTER UNE ACTIVITÉ',
      aiTitle: 'Assistant Agricole IA AGRIHORIZON',
      aiBadge: 'INTERFACE PROTOTYPE SIMULÉE',
      aiSub:
        'Posez vos questions sur la gestion des cultures, des sols ou la météo. (Réponses simulées de démonstration).',
      aiPlaceholder: 'Posez une question sur le maïs, les haricots, le sol ou la pluie...',
      aiSend: 'DEMANDER À L’IA',
      learnTitle: 'Ressources d’Apprentissage Durable',
    },
    contact: {
      tag: 'CONTACTEZ-NOUS',
      title: 'Échanger Avec INKINDI TECH',
      sub: 'Contactez-nous pour des partenariats, l’intégration de coopératives ou toute question technique.',
      name: 'Nom Complet',
      namePh: 'Entrez votre nom',
      email: 'Adresse E-mail',
      subject: 'Sujet',
      subjectPh: 'Partenariat, Support Agriculteur ou Demande',
      message: 'Message',
      messagePh: 'Écrivez votre message ici...',
      send: 'ENVOYER LE MESSAGE',
      sentTitle: 'Message Enregistré (Prototype)',
      sentDesc: 'Merci. Votre demande a été enregistrée dans cet aperçu.',
      reset: 'Envoyer un Autre Message',
      channelsTitle: 'Canaux Directs & Informations à Compléter',
      channelsNote: 'Les coordonnées publiques ci-dessous sont des espaces réservés à finaliser par INKINDI TECH :',
    },
    entry: {
      badge: 'Trois Parcours de Compte Adaptés',
      title: 'Bienvenue sur AGRIHORIZON',
      sub: 'Choisissez la catégorie de compte qui correspond le mieux à vos activités agricoles.',
      existingLogin: 'CONNEXION UTILISATEUR EXISTANT',
      farmerTitle: 'Agriculteur Individuel',
      farmerDesc: 'Gérez vos propres parcelles, confirmez vos coordonnées GPS et suivez vos cultures et sols.',
      farmerBtn: 'S’INSCRIRE COMME AGRICULTEUR',
      groupTitle: 'Groupement / Coopérative',
      groupDesc: 'Coordonnez les récoltes partagées et la planification collective des coopératives.',
      groupBtn: 'S’INSCRIRE COMME GROUPEMENT',
      orgTitle: 'Organisation / Entreprise',
      orgDesc: 'Pour les entreprises agricoles, ONG, instituts de recherche et partenaires.',
      orgBtn: 'S’INSCRIRE COMME ORGANISATION',
    },
    auth: {
      backToSelection: 'Retour au choix du compte',
      welcomeBack: 'Bon Retour',
      demoAuthNote: 'Authentification Prototype : Utilise le stockage local du navigateur.',
      identifierLabel: 'E-mail ou Numéro de Téléphone',
      identifierPh: 'Entrez votre e-mail ou téléphone enregistré',
      passwordLabel: 'Mot de passe',
      passwordPh: 'Entrez votre mot de passe',
      remember: 'Se souvenir de moi',
      forgot: 'Mot de passe oublié ?',
      submitLogin: 'SE CONNECTER',
      noAccount: 'Pas encore de compte ?',
      createAccount: 'Créer un compte',
      invalidCreds: 'Aucun compte local correspondant trouvé. Veuillez vérifier vos identifiants ou créer un compte.',
      resetTitle: 'Réinitialiser votre mot de passe',
      resetSub: 'Entrez l’e-mail ou le téléphone associé à votre compte AGRIHORIZON.',
      resetBtn: 'ENVOYER LES INSTRUCTIONS',
      returnLogin: 'Retour à la connexion',
    },
    wizard: {
      stepOf: 'Étape {step} sur {total}',
      steps: [
        'Identité & Mot de Passe',
        'Informations Ferme',
        'Cultures & Sol',
        'Localisation GPS',
        'Vérification & Confirmation',
      ],
      s1Title: 'Informations Personnelles & Sécurité',
      s1Sub: 'Créez votre profil agriculteur et votre mot de passe sécurisé.',
      firstName: 'Prénom *',
      lastName: 'Nom *',
      email: 'Adresse E-mail *',
      phone: 'Numéro de Téléphone',
      createPass: 'Créer un Mot de Passe *',
      confirmPass: 'Confirmer le Mot de Passe *',
      passMin: '8 caractères minimum',
      passOk: '✓ Au moins 8 caractères',
      passMatch: '✓ Les mots de passe correspondent',
      passMismatch: 'Les mots de passe ne correspondent pas',
      prefLang: 'Langue Préférée',
      country: 'Pays',
      s2Title: 'Informations sur la Ferme',
      s2Sub: 'Renseignez l’identité et la superficie de votre exploitation.',
      farmName: 'Nom de la Ferme',
      farmType: 'Type d’Exploitation',
      farmArea: 'Superficie Approximative',
      areaUnit: 'Unité de Surface',
      s3Title: 'Cultures & Profil du Sol',
      s3Sub: 'Indiquez le type de sol, l’irrigation et vos cultures principales.',
      soilType: 'Type de Sol',
      irrigation: 'Irrigation',
      primaryCrops: 'Cultures Principales',
      s4Title: 'Localiser Votre Ferme',
      s4Sub: 'Confirmez l’emplacement de votre terrain agricole via GPS, carte ou coordonnées.',
      s5Title: 'Vérifier & Finaliser l’Inscription',
      s5Sub: 'Confirmez vos informations pour activer votre espace agriculteur.',
      back: 'RETOUR',
      continue: 'CONTINUER',
      complete: 'CRÉER LE COMPTE AGRICULTEUR',
    },
    gps: {
      title: 'Confirmation des Coordonnées GPS',
      method: 'Méthode',
      useGps: 'UTILISER MA POSITION ACTUELLE (GPS)',
      locating: 'LOCALISATION...',
      tapHint: 'Appuyez sur la carte pour ajuster le repère de votre ferme',
      latLabel: 'Latitude (-90 à 90)',
      lngLabel: 'Longitude (-180 à 180)',
      setCoords: 'APPLIQUER LES COORDONNÉES',
      disclaimer: 'Veuillez confirmer que le repère indique bien votre terre agricole réelle.',
      confirmBtn: 'CONFIRMER L’EMPLACEMENT',
      confirmedBtn: 'EMPLACEMENT CONFIRMÉ',
    },
    groupReg: {
      title: 'Inscription Groupement, Coopérative & Organisation',
      sub: 'Sélectionnez votre catégorie et créez vos identifiants administrateur.',
      category: 'Catégorie d’Organisation *',
      name: 'Nom du Groupement / Organisation *',
      adminEmail: 'E-mail de l’Administrateur *',
      submit: 'FINALISER L’INSCRIPTION',
    },
  }
};

const LanguageContext = createContext({
          100% { transform: scale(1.08) translate(-1%, -1%); }
        }
      `}</style>

      <div className="relative z-10 max-w-3xl w-full text-center space-y-6 text-[#F5F4EC]">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#173D2B]/90 border border-[#49A66C]/40 text-[#E8B44D] text-[11px] font-extrabold tracking-wider uppercase shadow-lg">
          <Satellite className="w-3.5 h-3.5 text-[#49A66C]" />
          <span>{t.hero.badge}</span>
        </div>

        <h1
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F5F4EC] leading-[1.12] drop-shadow-md"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          {t.hero.title}
        </h1>

        <p className="text-sm sm:text-base text-[#DCECF0] max-w-xl mx-auto leading-relaxed drop-shadow">
          {t.hero.subtitle}
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          {currentUser ? (
            <button
              onClick={() => navigate('dashboard')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#49A66C] text-white font-extrabold text-sm tracking-wide shadow-xl hover:bg-[#3d8f5c] transition flex items-center justify-center gap-2"
            >
              <Sprout className="w-4 h-4 text-[#E8B44D]" />
              <span>{t.hero.ctaDash}</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('get-started')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#49A66C] text-white font-extrabold text-sm tracking-wide shadow-xl hover:bg-[#3d8f5c] transition flex items-center justify-center gap-2"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 text-[#E8B44D]" />
            </button>
          )}

          <button
            onClick={() => navigate('dashboard')}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#173D2B]/80 backdrop-blur-md text-[#F5F4EC] border border-[#F5F4EC]/30 font-bold text-sm hover:bg-[#173D2B] transition flex items-center justify-center gap-2 shadow-lg"
          >
            <Activity className="w-4 h-4 text-[#49A66C]" />
            <span>{t.hero.ctaSecondary}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 9. ACCOUNT ENTRY GATEWAY (/get-started & /login)
// ============================================================================
function AccountEntryView({ t, mode, onSelectRole, navigate }) {
  const isLogin = mode === 'login';
  const cards = [
    {
      role: 'individual',
      icon: User,
      accent: 'bg-[#49A66C]',
      title: t.entry.individual.title,
      desc: t.entry.individual.desc,
      btn: isLogin ? t.entry.individual.btnLogin : t.entry.individual.btnStart,
    },
    {
      role: 'group',
      icon: Users,
      accent: 'bg-[#E8B44D]',
      title: t.entry.group.title,
      desc: t.entry.group.desc,
      btn: isLogin ? t.entry.group.btnLogin : t.entry.group.btnStart,
    },
    {
      role: 'organization',
      icon: Building2,
      accent: 'bg-[#A77A50]',
      title: t.entry.org.title,
      desc: t.entry.org.desc,
      btn: isLogin ? t.entry.org.btnLogin : t.entry.org.btnStart,
    },
  ];

  return (
    <div className="max-w-4xl w-full mx-auto px-4 py-6 sm:py-10">
      <div className="text-center mb-6">
        <h2
          className="text-2xl sm:text-3xl font-extrabold text-[#173D2B]"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          {isLogin ? t.entry.titleLogin : t.entry.titleStart}
        </h2>
        <p className="text-xs sm:text-sm text-[#173D2B]/75 mt-1.5 max-w-lg mx-auto">
          {t.entry.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.role}
              className="bg-white rounded-3xl p-5 border border-[#173D2B]/10 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className={`w-11 h-11 rounded-2xl ${c.accent} text-[#173D2B] flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-base text-[#173D2B]" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  {c.title}
                </h3>
                <p className="text-xs text-[#173D2B]/75 mt-2 leading-relaxed">
                  {c.desc}
                </p>
              </div>
              <button
                onClick={() => onSelectRole(c.role, mode)}
                className="mt-5 w-full py-3 px-4 rounded-xl bg-[#173D2B] text-[#F5F4EC] font-bold text-xs tracking-wide hover:bg-[#22543b] transition flex items-center justify-center gap-1.5"
              >
                <span>{c.btn}</span>
                <ChevronRight className="w-4 h-4 text-[#E8B44D]" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate(isLogin ? 'get-started' : 'login')}
          className="text-xs font-bold text-[#49A66C] hover:underline"
        >
          {isLogin ? `${t.auth.noAccount} ${t.auth.registerLink}` : `${t.nav.login} →`}
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// 10. LOGIN & FORGOT PASSWORD RECOVERY VIEW
// ============================================================================
function LoginView({ t, role, accounts, onLoginSuccess, onResetPassword, navigate }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const [forgotMode, setForgotMode] = useState(false);
  const [resetId, setResetId] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');
  const [resetMsg, setResetMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const matched = accounts.find(
      (a) =>
        (a.email?.toLowerCase() === identifier.trim().toLowerCase() ||
          a.phone === identifier.trim()) &&
        a.password === password
    );
    if (matched) {
      onLoginSuccess(matched);
    } else {
      setError(t.auth.invalidCreds);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setResetMsg('');
    if (newPass.length < 8) {
      setResetMsg(t.reg.passShort);
      return;
    }
    if (newPass !== confirmNewPass) {
      setResetMsg(t.reg.passMismatch);
      return;
    }
    const ok = onResetPassword(resetId.trim(), newPass);
    if (ok) {
      setResetMsg(t.auth.resetSuccess);
      setTimeout(() => {
        setForgotMode(false);
        setResetMsg('');
      }, 1400);
    } else {
      setResetMsg(t.auth.invalidCreds);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl p-6 border border-[#173D2B]/10 shadow-sm">
        <div className="inline-block px-3 py-1 rounded-full bg-[#DCECF0] text-[#173D2B] text-[10px] font-extrabold uppercase tracking-wider mb-3">
          {role}
        </div>

        {!forgotMode ? (
          <>
            <h2 className="text-xl font-extrabold text-[#173D2B]" style={{ fontFamily: "'Manrope', sans-serif" }}>
              {t.entry.titleLogin}
            </h2>

            <form onSubmit={handleLogin} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#173D2B] mb-1">
                  {t.auth.emailOrPhone}
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="grower.demo@agrihorizon.rw"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm focus:outline-none focus:border-[#49A66C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173D2B] mb-1">
                  {t.auth.password}
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-[#173D2B]/20 text-sm focus:outline-none focus:border-[#49A66C]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-2.5 text-[#173D2B]/60"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-2.5 rounded-xl bg-red-50 text-red-700 text-xs font-medium flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#173D2B] text-[#F5F4EC] font-extrabold text-xs tracking-wider hover:bg-[#22563d] transition"
              >
                {t.auth.signInBtn}
              </button>
            </form>

            <div className="mt-3 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => setForgotMode(true)}
                className="text-[#A77A50] font-bold hover:underline"
              >
                {t.auth.forgotLink}
              </button>
              <button
                type="button"
                onClick={() => navigate('get-started')}
                className="text-[#49A66C] font-bold hover:underline"
              >
                {t.auth.registerLink}
              </button>
            </div>

            <div className="mt-5 pt-4 border-t border-[#173D2B]/10">
              <button
                type="button"
                onClick={() => onLoginSuccess(DEMO_ACCOUNT)}
                className="w-full py-2.5 px-3 rounded-xl bg-[#DCECF0] text-[#173D2B] font-extrabold text-xs hover:bg-[#cde3e9] transition flex items-center justify-center gap-2"
              >
                <KeyRound className="w-3.5 h-3.5 text-[#49A66C]" />
                <span>{t.auth.demoBtn}</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-extrabold text-[#173D2B]">{t.auth.forgotTitle}</h2>
            <p className="text-xs text-[#173D2B]/75 mt-1">{t.auth.forgotDesc}</p>
            <form onSubmit={handleReset} className="mt-4 space-y-3">
              <input
                type="text"
                required
                value={resetId}
                onChange={(e) => setResetId(e.target.value)}
                placeholder={t.auth.emailOrPhone}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm"
              />
              <input
                type="password"
                required
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder={t.auth.newPass}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm"
              />
              <input
                type="password"
                required
                value={confirmNewPass}
                onChange={(e) => setConfirmNewPass(e.target.value)}
                placeholder={t.auth.confirmPass}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm"
              />
              {resetMsg && (
                <div className="p-2.5 rounded-xl bg-[#DCECF0] text-[#173D2B] text-xs font-bold">
                  {resetMsg}
                </div>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#49A66C] text-white font-extrabold text-xs"
              >
                {t.auth.resetBtn}
              </button>
              <button
                type="button"
                onClick={() => setForgotMode(false)}
                className="w-full text-center text-xs font-bold text-[#173D2B]/70 pt-1"
              >
                {t.auth.backToLogin}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 11. 5-STEP INDIVIDUAL CROP GROWER REGISTRATION + GOOGLE MAPS GPS PICKER
// ============================================================================
function FarmerRegistrationWizard({ t, defaultLang, onComplete, navigate }) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    language: defaultLang || 'en',
    farmName: '',
    farmType: 'Intercropping / Mixed Crops',
    farmSize: '',
    sizeUnit: 'Hectares',
    experience: '3-5 years',
    irrigation: 'Rain-fed',
    soilType: 'Loam',
    crops: ['Maize'],
    goals: ['Increase Crop Yield'],
    country: 'Rwanda',
    region: '',
    lat: '-1.944100',
    lng: '30.061900',
    accuracy: null,
    locSource: 'Country Default Center',
    locConfirmed: false,
  });

  const [locating, setLocating] = useState(false);

  const updateField = (key, val) => {
    setForm((prev) => ({
      ...prev,
      [key]: val,
      ...(key === 'lat' || key === 'lng' ? { locConfirmed: false } : {}),
    }));
  };

  const toggleArrayItem = (key, item) => {
    setForm((prev) => {
      const exists = prev[key].includes(item);
      return {
        ...prev,
        [key]: exists ? prev[key].filter((i) => i !== item) : [...prev[key], item],
      };
    });
  };

  // Browser Geolocation Capture -> Updates Google Maps Immediately
  const handleUseCurrentLocation = () => {
    setError('');
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser. Enter decimal coordinates below.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        setForm((prev) => ({
          ...prev,
          lat: pos.coords.latitude.toFixed(6),
          lng: pos.coords.longitude.toFixed(6),
          accuracy: Math.round(pos.coords.accuracy),
          locSource: 'Device GPS + Google Maps',
          locConfirmed: true,
        }));
      },
      (err) => {
        setLocating(false);
        setError(`GPS unavailable (${err.message}). Enter decimal Latitude & Longitude below.`);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleConfirmManualLocation = () => {
    setError('');
    const latNum = parseFloat(form.lat);
    const lngNum = parseFloat(form.lng);
    if (isNaN(latNum) || latNum < -90 || latNum > 90 || isNaN(lngNum) || lngNum < -180 || lngNum > 180) {
      setError('Enter valid decimal Latitude (-90 to 90) and Longitude (-180 to 180).');
      return;
    }
    setForm((prev) => ({
      ...prev,
      lat: latNum.toFixed(6),
      lng: lngNum.toFixed(6),
      locSource: 'Google Maps Coordinates',
      locConfirmed: true,
    }));
  };

  const handleNext = () => {
    setError('');
    if (step === 1) {
      if (!form.fullName.trim() || !form.phone.trim() || !form.email.trim()) {
        setError(t.reg.reqField);
        return;
      }
      if (form.password.length < 8) {
        setError(t.reg.passShort);
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError(t.reg.passMismatch);
        return;
      }
    }
    if (step === 2) {
      if (!form.farmName.trim() || !form.farmSize.trim() || form.crops.length === 0) {
        setError(t.reg.reqField);
        return;
      }
    }
    if (step === 4) {
      if (!form.locConfirmed || !form.lat || !form.lng) {
        setError(t.reg.reqLoc);
        return;
      }
    }
    setStep((s) => Math.min(5, s + 1));
  };

  const handleSubmit = () => {
    const newAccount = {
      id: `grower-${Date.now()}`,
      role: 'individual',
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      password: form.password,
      language: form.language,
      country: form.country,
      region: form.region.trim() || form.country,
      farmName: form.farmName.trim(),
      farmType: form.farmType,
      farmSize: form.farmSize,
      sizeUnit: form.sizeUnit,
      experience: form.experience,
      irrigation: form.irrigation,
      soilType: form.soilType,
      crops: form.crops,
      goals: form.goals,
      location: {
        lat: form.lat,
        lng: form.lng,
        accuracy: form.accuracy,
        source: form.locSource,
      },
      createdAt: new Date().toISOString(),
    };
    onComplete(newAccount);
  };

  const stepLabels = [t.reg.step1, t.reg.step2, t.reg.step3, t.reg.step4, t.reg.step5];

  return (
    <div className="max-w-2xl w-full mx-auto px-4 py-6">
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#173D2B]/10 shadow-sm">
        {/* Progress Header */}
        <div className="flex items-center justify-between gap-1 mb-5">
          {stepLabels.map((lbl, idx) => {
            const num = idx + 1;
            const active = step === num;
            const done = step > num;
            return (
              <div key={num} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full text-xs font-extrabold flex items-center justify-center transition ${
                    done
                      ? 'bg-[#49A66C] text-white'
                      : active
                      ? 'bg-[#173D2B] text-[#E8B44D]'
                      : 'bg-[#F5F4EC] text-[#173D2B]/50'
                  }`}
                >
                  {done ? <Check className="w-3.5 h-3.5" /> : num}
                </div>
                <span className="hidden sm:block text-[10px] font-bold mt-1 text-center text-[#173D2B]/70 truncate max-w-[95px]">
                  {lbl}
                </span>
              </div>
            );
          })}
        </div>

        <h2 className="text-lg sm:text-xl font-extrabold text-[#173D2B] mb-4" style={{ fontFamily: "'Manrope', sans-serif" }}>
          {step}. {stepLabels[step - 1]}
        </h2>

        {/* STEP 1: PERSONAL INFO & PASSWORD */}
        {step === 1 && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold mb-1">{t.reg.fullName} *</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold mb-1">{t.reg.phone} *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+250 7XX XXX XXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">{t.reg.email} *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold mb-1">{t.reg.createPass} *</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    className="w-full px-3.5 py-2.5 pr-9 rounded-xl border border-[#173D2B]/20 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-2.5 top-2.5 text-[#173D2B]/60"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">{t.reg.confirmPass} *</label>
                <div className="relative">
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={(e) => updateField('confirmPassword', e.target.value)}
                    className="w-full px-3.5 py-2.5 pr-9 rounded-xl border border-[#173D2B]/20 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-2.5 top-2.5 text-[#173D2B]/60"
                  >
                    {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">{t.reg.prefLang}</label>
              <select
                value={form.language}
                onChange={(e) => updateField('language', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm bg-white"
              >
                <option value="en">EN · English</option>
                <option value="rw">RW · Kinyarwanda</option>
                <option value="fr">FR · Français</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 2: CULTIVATION PLOT & CROPS */}
        {step === 2 && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold mb-1">{t.reg.farmName} *</label>
                <input
                  type="text"
                  value={form.farmName}
                  onChange={(e) => updateField('farmName', e.target.value)}
                  placeholder="e.g. Nyagatare Terrace Plot"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">{t.reg.farmType}</label>
                <select
                  value={form.farmType}
                  onChange={(e) => updateField('farmType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm bg-white"
                >
                  <option>Intercropping / Mixed Crops</option>
                  <option>Commercial Cash Crop Plantation</option>
                  <option>Smallholder Food Crop Plot</option>
                  <option>Horticulture / Greenhouse Cultivation</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold mb-1">{t.reg.farmSize} *</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={form.farmSize}
                  onChange={(e) => updateField('farmSize', e.target.value)}
                  placeholder="2.0"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">{t.reg.sizeUnit}</label>
                <select
                  value={form.sizeUnit}
                  onChange={(e) => updateField('sizeUnit', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm bg-white"
                >
                  <option>Hectares</option>
                  <option>Acres</option>
                  <option>Square Meters</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold mb-1">{t.reg.experience}</label>
                <select
                  value={form.experience}
                  onChange={(e) => updateField('experience', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm bg-white"
                >
                  <option>0-2 years</option>
                  <option>3-5 years</option>
                  <option>6-10 years</option>
                  <option>10+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">{t.reg.irrigation}</label>
                <select
                  value={form.irrigation}
                  onChange={(e) => updateField('irrigation', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm bg-white"
                >
                  <option>Rain-fed</option>
                  <option>Drip Irrigation</option>
                  <option>Sprinkler / Canal</option>
                  <option>Seasonal / Partial</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">{t.reg.soilType}</label>
                <select
                  value={form.soilType}
                  onChange={(e) => updateField('soilType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm bg-white"
                >
                  {SOIL_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-1">
              <label className="block text-xs font-bold mb-2">{t.reg.selectCrops} *</label>
              <div className="flex flex-wrap gap-1.5">
                {CROP_OPTIONS.map((crop) => {
                  const selected = form.crops.includes(crop);
                  return (
                    <button
                      type="button"
                      key={crop}
                      onClick={() => toggleArrayItem('crops', crop)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                        selected
                          ? 'bg-[#49A66C] text-white'
                          : 'bg-[#F5F4EC] text-[#173D2B] hover:bg-[#DCECF0]'
                      }`}
                    >
                      {selected ? '✓ ' : '+ '}{crop}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: CULTIVATION GOALS */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-2">{t.reg.selectGoals}</label>
              <div className="flex flex-wrap gap-2">
                {GOAL_OPTIONS.map((goal) => {
                  const selected = form.goals.includes(goal);
                  return (
                    <button
                      type="button"
                      key={goal}
                      onClick={() => toggleArrayItem('goals', goal)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                        selected
                          ? 'bg-[#173D2B] text-[#E8B44D]'
                          : 'bg-[#F5F4EC] text-[#173D2B] hover:bg-[#DCECF0]'
                      }`}
                    >
                      {selected ? '✓ ' : ''}{goal}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: GLOBAL COUNTRY (195 COUNTRIES) & GOOGLE MAPS GPS PICKER */}
        {step === 4 && (
          <div className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <CountrySelector
                label={t.reg.countryLabel}
                value={form.country}
                onChange={(countryObj) => {
                  setForm((prev) => ({
                    ...prev,
                    country: countryObj.name,
                    lat: countryObj.lat.toFixed(6),
                    lng: countryObj.lng.toFixed(6),
                    locSource: `${countryObj.name} Google Maps Center`,
                    locConfirmed: false,
                  }));
                }}
              />
              <div>
                <label className="block text-xs font-bold mb-1">{t.reg.regionLabel}</label>
                <input
                  type="text"
                  value={form.region}
                  onChange={(e) => updateField('region', e.target.value)}
                  placeholder="e.g. Kayonza / Kigali / Nairobi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm"
                />
              </div>
            </div>

            <p className="text-xs text-[#173D2B]/75">{t.reg.gpsDesc}</p>

            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={locating}
              className="w-full py-3 px-4 rounded-2xl bg-[#173D2B] text-[#F5F4EC] font-extrabold text-xs tracking-wide hover:bg-[#22563d] transition flex items-center justify-center gap-2"
            >
              <Crosshair className={`w-4 h-4 text-[#E8B44D] ${locating ? 'animate-spin' : ''}`} />
              <span>{locating ? t.reg.locating : t.reg.useGpsBtn}</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold mb-1">{t.reg.latLabel}</label>
                <input
                  type="text"
                  value={form.lat}
                  onChange={(e) => updateField('lat', e.target.value)}
                  placeholder="-1.944100"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#173D2B]/20 text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">{t.reg.lngLabel}</label>
                <input
                  type="text"
                  value={form.lng}
                  onChange={(e) => updateField('lng', e.target.value)}
                  placeholder="30.061900"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#173D2B]/20 text-sm font-mono"
                />
              </div>
            </div>

            {/* Live Google Maps Embed Preview */}
            <GoogleMapViewer
              lat={form.lat}
              lng={form.lng}
              label={`${form.farmName || form.country} (${form.lat}, ${form.lng})`}
              openMapText={t.reg.openGoogleMaps}
            />

            <button
              type="button"
              onClick={handleConfirmManualLocation}
              className="w-full py-2.5 px-4 rounded-xl bg-[#DCECF0] text-[#173D2B] font-extrabold text-xs hover:bg-[#cde3e9] transition flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4 text-[#49A66C]" />
              <span>{t.reg.confirmLocBtn}</span>
            </button>

            {form.locConfirmed && (
              <div className="p-3 rounded-2xl bg-[#49A66C]/15 border border-[#49A66C] text-xs flex items-center justify-between">
                <span className="font-extrabold text-[#173D2B] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#49A66C]" />
                  <span>{t.reg.locConfirmed}</span>
                </span>
                <span className="font-mono text-[#173D2B]">
                  {form.lat}, {form.lng} {form.accuracy ? `(±${form.accuracy}m)` : ''}
                </span>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: REVIEW & CONFIRM */}
        {step === 5 && (
          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-[#F5F4EC] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#173D2B]/70">{t.reg.fullName}:</span>
                <span className="font-bold">{form.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#173D2B]/70">{t.reg.email} / {t.reg.phone}:</span>
                <span className="font-bold">{form.email} · {form.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#173D2B]/70">{t.reg.countryLabel}:</span>
                <span className="font-bold">{form.country} {form.region ? `(${form.region})` : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#173D2B]/70">{t.reg.farmName}:</span>
                <span className="font-bold">{form.farmName} ({form.farmSize} {form.sizeUnit})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#173D2B]/70">{t.reg.selectCrops}:</span>
                <span className="font-bold text-right">{form.crops.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#173D2B]/70">Google Maps GPS:</span>
                <span className="font-mono font-bold text-[#49A66C]">{form.lat}, {form.lng}</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-2.5 rounded-xl bg-red-50 text-red-700 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-6 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => {
                setError('');
                setStep((s) => s - 1);
              }}
              className="px-4 py-2.5 rounded-xl border border-[#173D2B]/20 text-xs font-bold flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{t.reg.backBtn}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate('get-started')}
              className="px-4 py-2.5 rounded-xl border border-[#173D2B]/20 text-xs font-bold"
            >
              {t.reg.backBtn}
            </button>
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-[#173D2B] text-[#F5F4EC] text-xs font-extrabold flex items-center gap-1.5"
            >
              <span>{t.reg.nextBtn}</span>
              <ChevronRight className="w-4 h-4 text-[#E8B44D]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-3 rounded-xl bg-[#49A66C] text-white text-xs font-extrabold shadow-sm hover:bg-[#3e915d] transition"
            >
              {t.reg.submitBtn}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 12. GROUP / COOPERATIVE / ORGANIZATION REGISTRATION (195 COUNTRIES + CROPS)
// ============================================================================
function OrgRegistrationView({ t, role, onComplete, navigate }) {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    category: role === 'group' ? t.orgReg.categories[1] : t.orgReg.categories[2],
    orgName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: 'Rwanda',
    lat: -1.9441,
    lng: 30.0619,
    region: '',
    memberCount: '50',
    crops: ['Maize', 'Beans'],
    password: '',
    confirmPassword: '',
  });

  const toggleCrop = (crop) => {
    setForm((prev) => ({
      ...prev,
      crops: prev.crops.includes(crop)
        ? prev.crops.filter((c) => c !== crop)
        : [...prev.crops, crop],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.orgName.trim() || !form.contactPerson.trim() || !form.email.trim()) {
      setError(t.reg.reqField);
      return;
    }
    if (form.password.length < 8) {
      setError(t.reg.passShort);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError(t.reg.passMismatch);
      return;
    }

    onComplete({
      id: `org-${Date.now()}`,
      role: role || 'organization',
      category: form.category,
      orgName: form.orgName.trim(),
      contactPerson: form.contactPerson.trim(),
      fullName: form.contactPerson.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      country: form.country,
      region: form.region.trim() || form.country,
      memberCount: form.memberCount,
      password: form.password,
      crops: form.crops.length ? form.crops : ['Maize'],
      farmName: `${form.orgName.trim()} Cultivation Zone`,
      farmSize: '120',
      sizeUnit: 'Hectares',
      soilType: 'Loam',
      location: {
        lat: Number(form.lat).toFixed(6),
        lng: Number(form.lng).toFixed(6),
        source: `${form.country} Google Maps Hub`,
      },
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <div className="max-w-xl w-full mx-auto px-4 py-6">
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#173D2B]/10 shadow-sm">
        <h2 className="text-xl font-extrabold text-[#173D2B]" style={{ fontFamily: "'Manrope', sans-serif" }}>
          {t.orgReg.title}
        </h2>
        <p className="text-xs text-[#173D2B]/75 mt-1 mb-4">{t.orgReg.subtitle}</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-bold mb-1">{t.orgReg.categoryLabel}</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm bg-white"
            >
              {t.orgReg.categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold mb-1">{t.orgReg.orgName} *</label>
              <input
                type="text"
                value={form.orgName}
                onChange={(e) => setForm({ ...form, orgName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">{t.orgReg.contactPerson} *</label>
              <input
                type="text"
                value={form.contactPerson}
                onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold mb-1">{t.orgReg.adminEmail} *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">{t.orgReg.phone}</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CountrySelector
              label={t.orgReg.country}
              value={form.country}
              onChange={(c) => setForm({ ...form, country: c.name, lat: c.lat, lng: c.lng })}
            />
            <div>
              <label className="block text-xs font-bold mb-1">{t.orgReg.region}</label>
              <input
                type="text"
                value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })}
                placeholder="e.g. Kayonza"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold mb-1.5">{t.orgReg.primaryCrops}</label>
            <div className="flex flex-wrap gap-1.5">
              {CROP_OPTIONS.slice(0, 9).map((crop) => {
                const selected = form.crops.includes(crop);
                return (
                  <button
                    type="button"
                    key={crop}
                    onClick={() => toggleCrop(crop)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      selected ? 'bg-[#49A66C] text-white' : 'bg-[#F5F4EC] text-[#173D2B]'
                    }`}
                  >
                    {selected ? '✓ ' : '+ '}{crop}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold mb-1">{t.reg.createPass} *</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 pr-9 rounded-xl border border-[#173D2B]/20 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-2.5 top-2.5 text-[#173D2B]/60"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">{t.reg.confirmPass} *</label>
              <input
                type={showPass ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm"
              />
            </div>
          </div>

          {error && (
            <div className="p-2.5 rounded-xl bg-red-50 text-red-700 text-xs font-medium">
              {error}
            </div>
          )}

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => navigate('get-started')}
              className="px-4 py-2.5 rounded-xl border border-[#173D2B]/20 text-xs font-bold"
            >
              {t.reg.backBtn}
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-[#49A66C] text-white font-extrabold text-xs tracking-wide"
            >
              {t.orgReg.submitBtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================================================
// 13. CONFIRMATION EMAIL & ADMIN NOTIFICATION INBOX
// ============================================================================
function AdminInboxView({ t, emails, adminEmail, onUpdateAdminEmail, navigate }) {
  const [adminInput, setAdminInput] = useState(adminEmail);
  const [activeTab, setActiveTab] = useState('farmer');
  const [savedFlag, setSavedFlag] = useState(false);

  const latest = emails[0];

  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-6 space-y-4">
      <div className="bg-white rounded-3xl p-5 border border-[#173D2B]/10 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-[#173D2B]" style={{ fontFamily: "'Manrope', sans-serif" }}>
              {t.inbox.title}
            </h2>
            <p className="text-xs text-[#173D2B]/70 mt-0.5">{t.inbox.subtitle}</p>
          </div>
          <button
            onClick={() => navigate('dashboard')}
            className="px-4 py-2 rounded-xl bg-[#173D2B] text-[#F5F4EC] text-xs font-extrabold shrink-0"
          >
            {t.hero.ctaDash} →
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-[#173D2B]/10 flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="text-xs font-bold text-[#173D2B] shrink-0">
            {t.inbox.adminConfigLabel}
          </label>
          <div className="flex flex-1 gap-2">
            <input
              type="email"
              value={adminInput}
              onChange={(e) => setAdminInput(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-xl border border-[#173D2B]/20 text-xs"
            />
            <button
              onClick={() => {
                onUpdateAdminEmail(adminInput);
                setSavedFlag(true);
                setTimeout(() => setSavedFlag(false), 1500);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-[#49A66C] text-white text-xs font-bold"
            >
              {savedFlag ? '✓' : t.inbox.updateAdminBtn}
            </button>
          </div>
        </div>
      </div>

      {!latest ? (
        <div className="bg-white rounded-3xl p-8 text-center border border-[#173D2B]/10 text-xs text-[#173D2B]/70">
          {t.inbox.empty}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-5 border border-[#173D2B]/10 shadow-sm space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('farmer')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition ${
                activeTab === 'farmer'
                  ? 'bg-[#173D2B] text-white'
                  : 'bg-[#F5F4EC] text-[#173D2B]'
              }`}
            >
              {t.inbox.farmerTab}
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition ${
                activeTab === 'admin'
                  ? 'bg-[#A77A50] text-white'
                  : 'bg-[#F5F4EC] text-[#173D2B]'
              }`}
            >
              {t.inbox.adminTab}
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F4EC] border border-[#173D2B]/10 space-y-2 text-xs">
            <div>
              <span className="font-bold text-[#173D2B]/60">To: </span>
              <span className="font-mono font-bold">
                {activeTab === 'farmer' ? latest.recipientEmail : adminInput}
              </span>
            </div>
            <div>
              <span className="font-bold text-[#173D2B]/60">Subject: </span>
              <span className="font-extrabold">
                {activeTab === 'farmer' ? latest.farmerSubject : latest.adminSubject}
              </span>
            </div>
            <pre className="mt-3 p-3.5 rounded-xl bg-white border border-[#173D2B]/10 whitespace-pre-wrap font-sans text-xs leading-relaxed text-[#173D2B]">
              {activeTab === 'farmer' ? latest.farmerBody : latest.adminBody}
            </pre>

            <div className="pt-2 flex justify-end">
              <a
                href={`mailto:${
                  activeTab === 'farmer' ? latest.recipientEmail : adminInput
                }?subject=${encodeURIComponent(
                  activeTab === 'farmer' ? latest.farmerSubject : latest.adminSubject
                )}&body=${encodeURIComponent(
                  activeTab === 'farmer' ? latest.farmerBody : latest.adminBody
                )}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#49A66C] text-white font-bold text-xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{t.inbox.sendMailto}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 14. CROP INTELLIGENCE PLATFORM DASHBOARD (WITH LIVE GOOGLE MAPS VIEW)
// ============================================================================
function FarmerDashboardView({ t, user, isDemo, navigate }) {
  const [logs, setLogs] = useState([
    { id: 1, date: 'Today · 07:30', text: 'Morning crop canopy inspection completed — vigorous leaf emergence on Maize & Beans.' },
    { id: 2, date: 'Yesterday', text: 'Applied organic compost mulch along upper terrace cultivation rows.' },
  ]);
  const [newLog, setNewLog] = useState('');

  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      text: `Hello ${user.fullName || user.orgName}! For your ${(user.crops || ['Maize']).join(', ')} cultivation in ${user.country || 'Rwanda'} (${user.soilType || 'Loam'} soil), canopy vigor is healthy. How can I assist with your crops today?`,
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!newLog.trim()) return;
    setLogs([{ id: Date.now(), date: 'Just now', text: newLog.trim() }, ...logs]);
    setNewLog('');
  };

  const handleAskAi = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const question = chatInput.trim();
    setChatInput('');

    const qLower = question.toLowerCase();
    let reply = `Crop Cultivation Guidance (${user.country || 'Global'}): For ${(user.crops || ['your crops']).join(' & ')} on ${user.soilType || 'Loam'} soil, maintain clean weed-free rows and monitor lower leaves weekly for early nutrient signals.`;
    if (qLower.includes('water') || qLower.includes('irrigat') || qLower.includes('mazi') || qLower.includes('eau')) {
      reply = `Crop Irrigation Advisory (Demo): Root-zone moisture is ~34%. Early-morning drip or furrow irrigation is recommended within 48 hours if rainfall stays below 5mm.`;
    } else if (qLower.includes('fertil') || qLower.includes('soil') || qLower.includes('fumbire') || qLower.includes('sol')) {
      reply = `Soil & Crop Nutrition Advisory: On ${user.soilType || 'Loam'} soil, split nitrogen top-dressing combined with organic crop residue mulch enhances root uptake.`;
    }

    setChatHistory((prev) => [
      ...prev,
      { sender: 'user', text: question },
      { sender: 'ai', text: reply },
    ]);
  };

  const lat = user.location?.lat || '-1.944100';
  const lng = user.location?.lng || '30.061900';

  return (
    <div className="max-w-5xl w-full mx-auto px-4 py-5 space-y-4">
      <div className="p-3 rounded-2xl bg-[#E8B44D]/25 border border-[#E8B44D] text-xs font-medium text-[#173D2B] flex items-center justify-between gap-2">
        <span>{t.dash.demoBanner}</span>
        {isDemo && (
          <button
            onClick={() => navigate('get-started')}
            className="px-3 py-1 rounded-lg bg-[#173D2B] text-white font-bold text-[11px] shrink-0"
          >
            {t.nav.getStarted}
          </button>
        )}
      </div>

      {/* Cultivation Plot Header */}
      <div className="bg-[#173D2B] text-[#F5F4EC] rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-extrabold tracking-widest uppercase text-[#E8B44D]">
            {t.dash.plotSummary} · {user.country || 'Rwanda'}
          </div>
          <h2 className="text-xl font-extrabold mt-0.5" style={{ fontFamily: "'Manrope', sans-serif" }}>
            {user.farmName || 'Active Cultivation Plot'}
          </h2>
          <div className="text-xs text-[#DCECF0] mt-1 flex flex-wrap items-center gap-3">
            <span>{user.fullName || user.orgName}</span>
            <span>• {user.farmSize || '2.0'} {user.sizeUnit || 'Hectares'}</span>
            <span>• Soil: {user.soilType || 'Loam'}</span>
            <span className="font-mono text-[#E8B44D]">
              GPS: {lat}, {lng}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(user.crops || ['Maize', 'Beans']).map((c) => (
            <span key={c} className="px-2.5 py-1 rounded-full bg-[#49A66C] text-white text-[11px] font-bold">
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* 3 Crop Telemetry Cards (Demo) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-[#173D2B]/10">
          <div className="flex items-center justify-between text-xs font-bold text-[#173D2B]/70">
            <span>{t.dash.weatherCard}</span>
            <Sun className="w-4 h-4 text-[#E8B44D]" />
          </div>
          <div className="text-2xl font-extrabold text-[#173D2B] mt-1">24°C</div>
          <div className="text-xs text-[#49A66C] font-bold mt-0.5">Partly Cloudy · 62% Humidity</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#173D2B]/10">
          <div className="flex items-center justify-between text-xs font-bold text-[#173D2B]/70">
            <span>{t.dash.soilCard}</span>
            <Droplets className="w-4 h-4 text-[#49A66C]" />
          </div>
          <div className="text-2xl font-extrabold text-[#173D2B] mt-1">34%</div>
          <div className="text-xs text-[#A77A50] font-bold mt-0.5">Optimal Root-Zone Moisture</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#173D2B]/10">
          <div className="flex items-center justify-between text-xs font-bold text-[#173D2B]/70">
            <span>{t.dash.ndviCard}</span>
            <Satellite className="w-4 h-4 text-[#173D2B]" />
          </div>
          <div className="text-2xl font-extrabold text-[#49A66C] mt-1">0.74 NDVI</div>
          <div className="text-xs text-[#173D2B]/70 font-bold mt-0.5">+0.04 vs 14-day baseline</div>
        </div>
      </div>

      {/* Embedded Google Map of the Registered Cultivation Field */}
      <GoogleMapViewer
        lat={lat}
        lng={lng}
        label={`${t.dash.mapCardTitle} — ${user.farmName || user.country || 'Field'}`}
        openMapText={t.reg.openGoogleMaps}
      />

      {/* Crop Activity Log & Prototype Crop AI Advisor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-[#173D2B]/10 flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-[#173D2B] flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-[#49A66C]" />
              <span>{t.dash.logTitle}</span>
            </h3>
            <form onSubmit={handleAddLog} className="flex gap-2 mb-3">
              <input
                type="text"
                value={newLog}
                onChange={(e) => setNewLog(e.target.value)}
                placeholder={t.dash.addLogPlaceholder}
                className="flex-1 px-3 py-2 rounded-xl border border-[#173D2B]/20 text-xs"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-[#49A66C] text-white font-bold text-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.dash.addLogBtn}</span>
              </button>
            </form>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {logs.map((l) => (
                <div key={l.id} className="p-2.5 rounded-xl bg-[#F5F4EC] text-xs">
                  <div className="text-[10px] font-bold text-[#A77A50]">{l.date}</div>
                  <div className="text-[#173D2B] mt-0.5">{l.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#173D2B]/10 flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-[#173D2B] flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-[#E8B44D]" />
              <span>{t.dash.aiTitle}</span>
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto mb-3 pr-1">
              {chatHistory.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'ai'
                      ? 'bg-[#DCECF0] text-[#173D2B]'
                      : 'bg-[#173D2B] text-[#F5F4EC] ml-6'
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleAskAi} className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={t.dash.aiPlaceholder}
              className="flex-1 px-3 py-2 rounded-xl border border-[#173D2B]/20 text-xs"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-[#173D2B] text-white font-bold text-xs flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5 text-[#E8B44D]" />
              <span>{t.dash.aiSend}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 15. COMPACT INFORMATION PAGES (ABOUT, MISSION, WHAT WE DO, HOW IT WORKS, SATELLITE)
// ============================================================================
function InfoPageView({ page, t, navigate }) {
  const data = t.pages[page];

  return (
    <div className="max-w-4xl w-full mx-auto px-4 py-6 sm:py-8 space-y-5">
      <div className="bg-white rounded-3xl p-6 border border-[#173D2B]/10 shadow-sm space-y-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173D2B]" style={{ fontFamily: "'Manrope', sans-serif" }}>
          {data.title}
        </h1>
        {data.lead && <p className="text-sm font-bold text-[#49A66C]">{data.lead}</p>}
        {data.subtitle && <p className="text-xs sm:text-sm text-[#173D2B]/75">{data.subtitle}</p>}
        {data.p1 && <p className="text-xs sm:text-sm text-[#173D2B]/80 leading-relaxed">{data.p1}</p>}
        {data.p2 && <p className="text-xs sm:text-sm text-[#173D2B]/80 leading-relaxed">{data.p2}</p>}

        {page === 'mission' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#F5F4EC] border border-[#173D2B]/10">
              <h3 className="font-extrabold text-sm text-[#173D2B] mb-1">{data.missionTitle}</h3>
              <p className="text-xs text-[#173D2B]/80 leading-relaxed">{data.missionText}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#DCECF0]/60 border border-[#173D2B]/10">
              <h3 className="font-extrabold text-sm text-[#173D2B] mb-1">{data.visionTitle}</h3>
              <p className="text-xs text-[#173D2B]/80 leading-relaxed">{data.visionText}</p>
            </div>
          </div>
        )}

        {page === 'whatWeDo' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {data.items.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#F5F4EC] border border-[#173D2B]/10">
                <div className="text-xs font-extrabold text-[#173D2B]">
                  {idx + 1}. {item.title}
                </div>
                <p className="text-xs text-[#173D2B]/75 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        )}

        {page === 'howItWorks' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {data.steps.map((st) => (
              <div key={st.num} className="p-4 rounded-2xl bg-[#F5F4EC] border border-[#173D2B]/10">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#173D2B] text-[#E8B44D] text-[10px] font-extrabold">
                  {st.num}
                </span>
                <h3 className="font-extrabold text-sm text-[#173D2B] mt-2">{st.title}</h3>
                <p className="text-xs text-[#173D2B]/75 mt-1">{st.desc}</p>
              </div>
            ))}
          </div>
        )}

        {page === 'satellite' && (
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {data.cards.map((c, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F5F4EC] border border-[#173D2B]/10">
                  <h3 className="font-extrabold text-xs text-[#173D2B]">{c.title}</h3>
                  <p className="text-xs text-[#173D2B]/75 mt-1.5 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
            <div className="p-3.5 rounded-2xl bg-[#E8B44D]/20 border border-[#E8B44D] text-xs text-[#173D2B] leading-relaxed">
              {data.disclaimer}
            </div>
          </div>
        )}

        <div className="pt-3">
          <button
            onClick={() => navigate('get-started')}
            className="px-5 py-2.5 rounded-xl bg-[#49A66C] text-white font-extrabold text-xs tracking-wide"
          >
            {t.hero.ctaPrimary} →
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 16. CONTACT US VIEW
// ============================================================================
function ContactPageView({ t }) {
  const c = t.pages.contact;
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-xl w-full mx-auto px-4 py-6">
      <div className="bg-white rounded-3xl p-6 border border-[#173D2B]/10 shadow-sm">
        <h1 className="text-2xl font-extrabold text-[#173D2B]" style={{ fontFamily: "'Manrope', sans-serif" }}>
          {c.title}
        </h1>
        <p className="text-xs text-[#173D2B]/75 mt-1 mb-4">{c.subtitle}</p>

        {sent && (
          <div className="mb-4 p-3 rounded-2xl bg-[#49A66C]/15 border border-[#49A66C] text-xs font-bold text-[#173D2B]">
            {c.sentMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder={c.name}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm"
          />
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder={c.email}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm"
          />
          <input
            type="text"
            required
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            placeholder={c.subject}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm"
          />
          <textarea
            rows="3"
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder={c.message}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#173D2B]/20 text-sm"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#173D2B] text-[#F5F4EC] font-extrabold text-xs tracking-wider"
          >
            {c.sendBtn}
          </button>
        </form>
      </div>
    </div>
  );
}