// src/constants.js
export const DESK_TYPES = {
    INDIVIDUAL: 'individual',
    TEAM: 'team'
  };
  
  export const MEMBERSHIP_TIERS = {
    BASIC: { id: 'basic', name: 'Basic', hourlyRate: 10 },
    PREMIUM: { id: 'premium', name: 'Premium', hourlyRate: 15 },
    EXECUTIVE: { id: 'executive', name: 'Executive', hourlyRate: 20 }
  };
  
  export const TEAM_DESK_HOURLY_RATE = 25;
  export const DISCOUNT_HOURS_THRESHOLD = 3;
  export const DISCOUNT_PERCENTAGE = 10;