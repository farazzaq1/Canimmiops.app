export interface HistoricalRecord {
  year: number;
  quarter: "Q1" | "Q2" | "Q3" | "Q4";
  provinceId: string;
  pnpTargets: number;
  expressEntry: number;
  studyPermits: number;
  workPermits: number;
  borderCrossings: number; // Border crossing volume (in thousands)
}

export const HISTORICAL_DATA: HistoricalRecord[] = [
  // Ontario (ON)
  { year: 2024, quarter: "Q1", provinceId: "ON", pnpTargets: 5200, expressEntry: 2800, studyPermits: 35000, workPermits: 18000, borderCrossings: 1250 },
  { year: 2024, quarter: "Q2", provinceId: "ON", pnpTargets: 5300, expressEntry: 2900, studyPermits: 38000, workPermits: 19500, borderCrossings: 1450 },
  { year: 2024, quarter: "Q3", provinceId: "ON", pnpTargets: 5400, expressEntry: 3100, studyPermits: 42000, workPermits: 21000, borderCrossings: 1600 },
  { year: 2024, quarter: "Q4", provinceId: "ON", pnpTargets: 5600, expressEntry: 3200, studyPermits: 30000, workPermits: 17500, borderCrossings: 1300 },
  { year: 2025, quarter: "Q1", provinceId: "ON", pnpTargets: 5800, expressEntry: 3300, studyPermits: 28000, workPermits: 16000, borderCrossings: 1300 },
  { year: 2025, quarter: "Q2", provinceId: "ON", pnpTargets: 5900, expressEntry: 3400, studyPermits: 31000, workPermits: 17000, borderCrossings: 1500 },
  { year: 2025, quarter: "Q3", provinceId: "ON", pnpTargets: 6100, expressEntry: 3600, studyPermits: 34000, workPermits: 18500, borderCrossings: 1700 },
  { year: 2025, quarter: "Q4", provinceId: "ON", pnpTargets: 6200, expressEntry: 3700, studyPermits: 24000, workPermits: 15000, borderCrossings: 1350 },
  { year: 2026, quarter: "Q1", provinceId: "ON", pnpTargets: 6400, expressEntry: 3850, studyPermits: 22000, workPermits: 14000, borderCrossings: 1350 },
  { year: 2026, quarter: "Q2", provinceId: "ON", pnpTargets: 6500, expressEntry: 4000, studyPermits: 24500, workPermits: 14800, borderCrossings: 1550 },
  { year: 2026, quarter: "Q3", provinceId: "ON", pnpTargets: 6700, expressEntry: 4150, studyPermits: 26000, workPermits: 15500, borderCrossings: 1750 },
  { year: 2026, quarter: "Q4", provinceId: "ON", pnpTargets: 6900, expressEntry: 4300, studyPermits: 19500, workPermits: 13200, borderCrossings: 1400 },

  // British Columbia (BC)
  { year: 2024, quarter: "Q1", provinceId: "BC", pnpTargets: 2400, expressEntry: 1300, studyPermits: 15000, workPermits: 9000, borderCrossings: 450 },
  { year: 2024, quarter: "Q2", provinceId: "BC", pnpTargets: 2500, expressEntry: 1400, studyPermits: 17000, workPermits: 9800, borderCrossings: 520 },
  { year: 2024, quarter: "Q3", provinceId: "BC", pnpTargets: 2600, expressEntry: 1600, studyPermits: 19000, workPermits: 10500, borderCrossings: 580 },
  { year: 2024, quarter: "Q4", provinceId: "BC", pnpTargets: 2700, expressEntry: 1700, studyPermits: 12000, workPermits: 8500, borderCrossings: 470 },
  { year: 2025, quarter: "Q1", provinceId: "BC", pnpTargets: 2800, expressEntry: 1750, studyPermits: 11000, workPermits: 7500, borderCrossings: 460 },
  { year: 2025, quarter: "Q2", provinceId: "BC", pnpTargets: 2900, expressEntry: 1800, studyPermits: 12500, workPermits: 8100, borderCrossings: 530 },
  { year: 2025, quarter: "Q3", provinceId: "BC", pnpTargets: 3100, expressEntry: 1950, studyPermits: 14000, workPermits: 8800, borderCrossings: 600 },
  { year: 2025, quarter: "Q4", provinceId: "BC", pnpTargets: 3200, expressEntry: 2000, studyPermits: 9500, workPermits: 7200, borderCrossings: 485 },
  { year: 2026, quarter: "Q1", provinceId: "BC", pnpTargets: 3300, expressEntry: 2050, studyPermits: 9000, workPermits: 6800, borderCrossings: 470 },
  { year: 2026, quarter: "Q2", provinceId: "BC", pnpTargets: 3400, expressEntry: 2100, studyPermits: 10000, workPermits: 7200, borderCrossings: 550 },
  { year: 2026, quarter: "Q3", provinceId: "BC", pnpTargets: 3600, expressEntry: 2250, studyPermits: 11000, workPermits: 7600, borderCrossings: 610 },
  { year: 2026, quarter: "Q4", provinceId: "BC", pnpTargets: 3700, expressEntry: 2350, studyPermits: 8000, workPermits: 6100, borderCrossings: 500 },

  // Alberta (AB)
  { year: 2024, quarter: "Q1", provinceId: "AB", pnpTargets: 2200, expressEntry: 1000, studyPermits: 10000, workPermits: 6500, borderCrossings: 80 },
  { year: 2024, quarter: "Q2", provinceId: "AB", pnpTargets: 2300, expressEntry: 1100, studyPermits: 11500, workPermits: 7200, borderCrossings: 95 },
  { year: 2024, quarter: "Q3", provinceId: "AB", pnpTargets: 2400, expressEntry: 1200, studyPermits: 12500, workPermits: 7600, borderCrossings: 110 },
  { year: 2024, quarter: "Q4", provinceId: "AB", pnpTargets: 2500, expressEntry: 1200, studyPermits: 8500, workPermits: 6100, borderCrossings: 85 },
  { year: 2025, quarter: "Q1", provinceId: "AB", pnpTargets: 2550, expressEntry: 1250, studyPermits: 8000, workPermits: 5800, borderCrossings: 82 },
  { year: 2025, quarter: "Q2", provinceId: "AB", pnpTargets: 2600, expressEntry: 1300, studyPermits: 9000, workPermits: 6200, borderCrossings: 98 },
  { year: 2025, quarter: "Q3", provinceId: "AB", pnpTargets: 2750, expressEntry: 1400, studyPermits: 10000, workPermits: 6700, borderCrossings: 115 },
  { year: 2025, quarter: "Q4", provinceId: "AB", pnpTargets: 2850, expressEntry: 1450, studyPermits: 7000, workPermits: 5400, borderCrossings: 88 },
  { year: 2026, quarter: "Q1", provinceId: "AB", pnpTargets: 2900, expressEntry: 1500, studyPermits: 7200, workPermits: 5200, borderCrossings: 85 },
  { year: 2026, quarter: "Q2", provinceId: "AB", pnpTargets: 3000, expressEntry: 1550, studyPermits: 8100, workPermits: 5600, borderCrossings: 102 },
  { year: 2026, quarter: "Q3", provinceId: "AB", pnpTargets: 3100, expressEntry: 1650, studyPermits: 9000, workPermits: 6100, borderCrossings: 118 },
  { year: 2026, quarter: "Q4", provinceId: "AB", pnpTargets: 3250, expressEntry: 1700, studyPermits: 6200, workPermits: 4800, borderCrossings: 90 },

  // Saskatchewan (SK)
  { year: 2024, quarter: "Q1", provinceId: "SK", pnpTargets: 1900, expressEntry: 600, studyPermits: 3000, workPermits: 2800, borderCrossings: 65 },
  { year: 2024, quarter: "Q2", provinceId: "SK", pnpTargets: 2000, expressEntry: 650, studyPermits: 3500, workPermits: 3100, borderCrossings: 78 },
  { year: 2024, quarter: "Q3", provinceId: "SK", pnpTargets: 2100, expressEntry: 700, studyPermits: 4000, workPermits: 3400, borderCrossings: 85 },
  { year: 2024, quarter: "Q4", provinceId: "SK", pnpTargets: 2200, expressEntry: 750, studyPermits: 2500, workPermits: 2500, borderCrossings: 68 },
  { year: 2025, quarter: "Q1", provinceId: "SK", pnpTargets: 2250, expressEntry: 750, studyPermits: 2400, workPermits: 2400, borderCrossings: 64 },
  { year: 2025, quarter: "Q2", provinceId: "SK", pnpTargets: 2300, expressEntry: 800, studyPermits: 2800, workPermits: 2700, borderCrossings: 76 },
  { year: 2025, quarter: "Q3", provinceId: "SK", pnpTargets: 2400, expressEntry: 850, studyPermits: 3100, workPermits: 3000, borderCrossings: 88 },
  { year: 2025, quarter: "Q4", provinceId: "SK", pnpTargets: 2450, expressEntry: 900, studyPermits: 2100, workPermits: 2200, borderCrossings: 70 },
  { year: 2026, quarter: "Q1", provinceId: "SK", pnpTargets: 2500, expressEntry: 950, studyPermits: 2200, workPermits: 2100, borderCrossings: 65 },
  { year: 2026, quarter: "Q2", provinceId: "SK", pnpTargets: 2600, expressEntry: 1000, studyPermits: 2500, workPermits: 2350, borderCrossings: 80 },
  { year: 2026, quarter: "Q3", provinceId: "SK", pnpTargets: 2700, expressEntry: 1050, studyPermits: 2850, workPermits: 2500, borderCrossings: 90 },
  { year: 2026, quarter: "Q4", provinceId: "SK", pnpTargets: 2800, expressEntry: 1100, studyPermits: 1900, workPermits: 1950, borderCrossings: 72 },

  // Manitoba (MB)
  { year: 2024, quarter: "Q1", provinceId: "MB", pnpTargets: 2100, expressEntry: 500, studyPermits: 4000, workPermits: 2900, borderCrossings: 120 },
  { year: 2024, quarter: "Q2", provinceId: "MB", pnpTargets: 2200, expressEntry: 550, studyPermits: 4500, workPermits: 3200, borderCrossings: 140 },
  { year: 2024, quarter: "Q3", provinceId: "MB", pnpTargets: 2300, expressEntry: 600, studyPermits: 5000, workPermits: 3500, borderCrossings: 155 },
  { year: 2024, quarter: "Q4", provinceId: "MB", pnpTargets: 2400, expressEntry: 650, studyPermits: 3200, workPermits: 2600, borderCrossings: 125 },
  { year: 2025, quarter: "Q1", provinceId: "MB", pnpTargets: 2450, expressEntry: 700, studyPermits: 3100, workPermits: 2500, borderCrossings: 122 },
  { year: 2025, quarter: "Q2", provinceId: "MB", pnpTargets: 2500, expressEntry: 750, studyPermits: 3500, workPermits: 2800, borderCrossings: 138 },
  { year: 2025, quarter: "Q3", provinceId: "MB", pnpTargets: 2650, expressEntry: 800, studyPermits: 3900, workPermits: 3100, borderCrossings: 150 },
  { year: 2025, quarter: "Q4", provinceId: "MB", pnpTargets: 2700, expressEntry: 850, studyPermits: 2700, workPermits: 2300, borderCrossings: 128 },
  { year: 2026, quarter: "Q1", provinceId: "MB", pnpTargets: 2800, expressEntry: 900, studyPermits: 2900, workPermits: 2200, borderCrossings: 125 },
  { year: 2026, quarter: "Q2", provinceId: "MB", pnpTargets: 2900, expressEntry: 950, studyPermits: 3200, workPermits: 2500, borderCrossings: 142 },
  { year: 2026, quarter: "Q3", provinceId: "MB", pnpTargets: 3100, expressEntry: 1000, studyPermits: 3600, workPermits: 2750, borderCrossings: 158 },
  { year: 2026, quarter: "Q4", provinceId: "MB", pnpTargets: 3200, expressEntry: 1050, studyPermits: 2400, workPermits: 2000, borderCrossings: 130 },

  // Quebec (QC)
  { year: 2024, quarter: "Q1", provinceId: "QC", pnpTargets: 12000, expressEntry: 0, studyPermits: 22000, workPermits: 25000, borderCrossings: 320 },
  { year: 2024, quarter: "Q2", provinceId: "QC", pnpTargets: 12200, expressEntry: 0, studyPermits: 24000, workPermits: 27000, borderCrossings: 380 },
  { year: 2024, quarter: "Q3", provinceId: "QC", pnpTargets: 12500, expressEntry: 0, studyPermits: 28000, workPermits: 29000, borderCrossings: 430 },
  { year: 2024, quarter: "Q4", provinceId: "QC", pnpTargets: 12800, expressEntry: 0, studyPermits: 18000, workPermits: 23000, borderCrossings: 340 },
  { year: 2025, quarter: "Q1", provinceId: "QC", pnpTargets: 12900, expressEntry: 0, studyPermits: 17000, workPermits: 21000, borderCrossings: 315 },
  { year: 2025, quarter: "Q2", provinceId: "QC", pnpTargets: 13100, expressEntry: 0, studyPermits: 19000, workPermits: 23000, borderCrossings: 375 },
  { year: 2025, quarter: "Q3", provinceId: "QC", pnpTargets: 13400, expressEntry: 0, studyPermits: 22000, workPermits: 24500, borderCrossings: 425 },
  { year: 2025, quarter: "Q4", provinceId: "QC", pnpTargets: 13600, expressEntry: 0, studyPermits: 14000, workPermits: 19000, borderCrossings: 330 },
  { year: 2026, quarter: "Q1", provinceId: "QC", pnpTargets: 13800, expressEntry: 0, studyPermits: 15500, workPermits: 18500, borderCrossings: 320 },
  { year: 2026, quarter: "Q2", provinceId: "QC", pnpTargets: 14100, expressEntry: 0, studyPermits: 17000, workPermits: 20000, borderCrossings: 390 },
  { year: 2026, quarter: "Q3", provinceId: "QC", pnpTargets: 14400, expressEntry: 0, studyPermits: 20000, workPermits: 21500, borderCrossings: 440 },
  { year: 2026, quarter: "Q4", provinceId: "QC", pnpTargets: 14700, expressEntry: 0, studyPermits: 12500, workPermits: 16800, borderCrossings: 350 },

  // New Brunswick (NB)
  { year: 2024, quarter: "Q1", provinceId: "NB", pnpTargets: 1200, expressEntry: 400, studyPermits: 1200, workPermits: 2100, borderCrossings: 240 },
  { year: 2024, quarter: "Q2", provinceId: "NB", pnpTargets: 1300, expressEntry: 450, studyPermits: 1500, workPermits: 2300, borderCrossings: 280 },
  { year: 2024, quarter: "Q3", provinceId: "NB", pnpTargets: 1400, expressEntry: 500, studyPermits: 1800, workPermits: 2500, borderCrossings: 310 },
  { year: 2024, quarter: "Q4", provinceId: "NB", pnpTargets: 1400, expressEntry: 500, studyPermits: 1100, workPermits: 1900, borderCrossings: 250 },
  { year: 2025, quarter: "Q1", provinceId: "NB", pnpTargets: 1450, expressEntry: 500, studyPermits: 1000, workPermits: 1800, borderCrossings: 238 },
  { year: 2025, quarter: "Q2", provinceId: "NB", pnpTargets: 1500, expressEntry: 550, studyPermits: 1200, workPermits: 2000, borderCrossings: 275 },
  { year: 2025, quarter: "Q3", provinceId: "NB", pnpTargets: 1600, expressEntry: 600, studyPermits: 1400, workPermits: 2200, borderCrossings: 305 },
  { year: 2025, quarter: "Q4", provinceId: "NB", pnpTargets: 1650, expressEntry: 650, studyPermits: 900, workPermits: 1600, borderCrossings: 242 },
  { year: 2026, quarter: "Q1", provinceId: "NB", pnpTargets: 1700, expressEntry: 700, studyPermits: 1000, workPermits: 1650, borderCrossings: 240 },
  { year: 2026, quarter: "Q2", provinceId: "NB", pnpTargets: 1800, expressEntry: 750, studyPermits: 1200, workPermits: 1850, borderCrossings: 280 },
  { year: 2026, quarter: "Q3", provinceId: "NB", pnpTargets: 1900, expressEntry: 800, studyPermits: 1400, workPermits: 2000, borderCrossings: 315 },
  { year: 2026, quarter: "Q4", provinceId: "NB", pnpTargets: 2000, expressEntry: 850, studyPermits: 850, workPermits: 1450, borderCrossings: 255 },

  // Nova Scotia (NS)
  { year: 2024, quarter: "Q1", provinceId: "NS", pnpTargets: 1300, expressEntry: 500, studyPermits: 2500, workPermits: 1800, borderCrossings: 5 },
  { year: 2024, quarter: "Q2", provinceId: "NS", pnpTargets: 1400, expressEntry: 550, studyPermits: 3000, workPermits: 2000, borderCrossings: 8 },
  { year: 2024, quarter: "Q3", provinceId: "NS", pnpTargets: 1550, expressEntry: 600, studyPermits: 3500, workPermits: 2200, borderCrossings: 12 },
  { year: 2024, quarter: "Q4", provinceId: "NS", pnpTargets: 1600, expressEntry: 600, studyPermits: 2000, workPermits: 1600, borderCrossings: 6 },
  { year: 2025, quarter: "Q1", provinceId: "NS", pnpTargets: 1650, expressEntry: 650, studyPermits: 1800, workPermits: 1500, borderCrossings: 5 },
  { year: 2025, quarter: "Q2", provinceId: "NS", pnpTargets: 1700, expressEntry: 700, studyPermits: 2200, workPermits: 1700, borderCrossings: 7 },
  { year: 2025, quarter: "Q3", provinceId: "NS", pnpTargets: 1800, expressEntry: 750, studyPermits: 2600, workPermits: 1900, borderCrossings: 10 },
  { year: 2025, quarter: "Q4", provinceId: "NS", pnpTargets: 1850, expressEntry: 800, studyPermits: 1600, workPermits: 1400, borderCrossings: 6 },
  { year: 2026, quarter: "Q1", provinceId: "NS", pnpTargets: 1900, expressEntry: 850, studyPermits: 1800, workPermits: 1400, borderCrossings: 5 },
  { year: 2026, quarter: "Q2", provinceId: "NS", pnpTargets: 2000, expressEntry: 900, studyPermits: 2100, workPermits: 1600, borderCrossings: 8 },
  { year: 2026, quarter: "Q3", provinceId: "NS", pnpTargets: 2150, expressEntry: 950, studyPermits: 2500, workPermits: 1800, borderCrossings: 11 },
  { year: 2026, quarter: "Q4", provinceId: "NS", pnpTargets: 2250, expressEntry: 1000, studyPermits: 1500, workPermits: 1200, borderCrossings: 6 },

  // Prince Edward Island (PE)
  { year: 2024, quarter: "Q1", provinceId: "PE", pnpTargets: 450, expressEntry: 180, studyPermits: 600, workPermits: 450, borderCrossings: 2 },
  { year: 2024, quarter: "Q2", provinceId: "PE", pnpTargets: 500, expressEntry: 200, studyPermits: 750, workPermits: 520, borderCrossings: 4 },
  { year: 2024, quarter: "Q3", provinceId: "PE", pnpTargets: 550, expressEntry: 220, studyPermits: 900, workPermits: 580, borderCrossings: 6 },
  { year: 2024, quarter: "Q4", provinceId: "PE", pnpTargets: 500, expressEntry: 200, studyPermits: 550, workPermits: 410, borderCrossings: 3 },
  { year: 2025, quarter: "Q1", provinceId: "PE", pnpTargets: 520, expressEntry: 210, studyPermits: 500, workPermits: 400, borderCrossings: 2 },
  { year: 2025, quarter: "Q2", provinceId: "PE", pnpTargets: 550, expressEntry: 220, studyPermits: 620, workPermits: 460, borderCrossings: 3 },
  { year: 2025, quarter: "Q3", provinceId: "PE", pnpTargets: 580, expressEntry: 230, studyPermits: 750, workPermits: 510, borderCrossings: 5 },
  { year: 2025, quarter: "Q4", provinceId: "PE", pnpTargets: 550, expressEntry: 220, studyPermits: 480, workPermits: 380, borderCrossings: 2 },
  { year: 2026, quarter: "Q1", provinceId: "PE", pnpTargets: 580, expressEntry: 240, studyPermits: 480, workPermits: 380, borderCrossings: 2 },
  { year: 2026, quarter: "Q2", provinceId: "PE", pnpTargets: 600, expressEntry: 250, studyPermits: 580, workPermits: 420, borderCrossings: 4 },
  { year: 2026, quarter: "Q3", provinceId: "PE", pnpTargets: 650, expressEntry: 270, studyPermits: 680, workPermits: 480, borderCrossings: 5 },
  { year: 2026, quarter: "Q4", provinceId: "PE", pnpTargets: 620, expressEntry: 260, studyPermits: 420, workPermits: 350, borderCrossings: 3 },

  // Newfoundland & Labrador (NL)
  { year: 2024, quarter: "Q1", provinceId: "NL", pnpTargets: 650, expressEntry: 200, studyPermits: 800, workPermits: 650, borderCrossings: 1 },
  { year: 2024, quarter: "Q2", provinceId: "NL", pnpTargets: 700, expressEntry: 220, studyPermits: 950, workPermits: 720, borderCrossings: 2 },
  { year: 2024, quarter: "Q3", provinceId: "NL", pnpTargets: 750, expressEntry: 240, studyPermits: 1100, workPermits: 780, borderCrossings: 3 },
  { year: 2024, quarter: "Q4", provinceId: "NL", pnpTargets: 800, expressEntry: 240, studyPermits: 750, workPermits: 600, borderCrossings: 1 },
  { year: 2025, quarter: "Q1", provinceId: "NL", pnpTargets: 820, expressEntry: 250, studyPermits: 700, workPermits: 580, borderCrossings: 1 },
  { year: 2025, quarter: "Q2", provinceId: "NL", pnpTargets: 850, expressEntry: 260, studyPermits: 820, workPermits: 640, borderCrossings: 2 },
  { year: 2025, quarter: "Q3", provinceId: "NL", pnpTargets: 900, expressEntry: 280, studyPermits: 950, workPermits: 700, borderCrossings: 3 },
  { year: 2025, quarter: "Q4", provinceId: "NL", pnpTargets: 880, expressEntry: 270, studyPermits: 680, workPermits: 550, borderCrossings: 1 },
  { year: 2026, quarter: "Q1", provinceId: "NL", pnpTargets: 920, expressEntry: 290, studyPermits: 650, workPermits: 550, borderCrossings: 1 },
  { year: 2026, quarter: "Q2", provinceId: "NL", pnpTargets: 950, expressEntry: 300, studyPermits: 780, workPermits: 600, borderCrossings: 2 },
  { year: 2026, quarter: "Q3", provinceId: "NL", pnpTargets: 1000, expressEntry: 320, studyPermits: 880, workPermits: 650, borderCrossings: 3 },
  { year: 2026, quarter: "Q4", provinceId: "NL", pnpTargets: 980, expressEntry: 310, studyPermits: 600, workPermits: 500, borderCrossings: 1 },

  // Yukon (YT)
  { year: 2024, quarter: "Q1", provinceId: "YT", pnpTargets: 130, expressEntry: 50, studyPermits: 100, workPermits: 150, borderCrossings: 15 },
  { year: 2024, quarter: "Q2", provinceId: "YT", pnpTargets: 140, expressEntry: 60, studyPermits: 120, workPermits: 180, borderCrossings: 28 },
  { year: 2024, quarter: "Q3", provinceId: "YT", pnpTargets: 150, expressEntry: 70, studyPermits: 140, workPermits: 200, borderCrossings: 35 },
  { year: 2024, quarter: "Q4", provinceId: "YT", pnpTargets: 160, expressEntry: 70, studyPermits: 90, workPermits: 130, borderCrossings: 12 },
  { year: 2025, quarter: "Q1", provinceId: "YT", pnpTargets: 165, expressEntry: 75, studyPermits: 80, workPermits: 120, borderCrossings: 14 },
  { year: 2025, quarter: "Q2", provinceId: "YT", pnpTargets: 170, expressEntry: 80, studyPermits: 100, workPermits: 150, borderCrossings: 25 },
  { year: 2025, quarter: "Q3", provinceId: "YT", pnpTargets: 180, expressEntry: 85, studyPermits: 110, workPermits: 170, borderCrossings: 32 },
  { year: 2025, quarter: "Q4", provinceId: "YT", pnpTargets: 175, expressEntry: 80, studyPermits: 75, workPermits: 110, borderCrossings: 10 },
  { year: 2026, quarter: "Q1", provinceId: "YT", pnpTargets: 180, expressEntry: 85, studyPermits: 80, workPermits: 115, borderCrossings: 14 },
  { year: 2026, quarter: "Q2", provinceId: "YT", pnpTargets: 190, expressEntry: 90, studyPermits: 95, workPermits: 135, borderCrossings: 26 },
  { year: 2026, quarter: "Q3", provinceId: "YT", pnpTargets: 200, expressEntry: 100, studyPermits: 110, workPermits: 150, borderCrossings: 34 },
  { year: 2026, quarter: "Q4", provinceId: "YT", pnpTargets: 195, expressEntry: 95, studyPermits: 70, workPermits: 100, borderCrossings: 11 },

  // Northwest Territories (NT)
  { year: 2024, quarter: "Q1", provinceId: "NT", pnpTargets: 80, expressEntry: 20, studyPermits: 40, workPermits: 120, borderCrossings: 1 },
  { year: 2024, quarter: "Q2", provinceId: "NT", pnpTargets: 95, expressEntry: 25, studyPermits: 50, workPermits: 140, borderCrossings: 2 },
  { year: 2024, quarter: "Q3", provinceId: "NT", pnpTargets: 110, expressEntry: 30, studyPermits: 60, workPermits: 160, borderCrossings: 3 },
  { year: 2024, quarter: "Q4", provinceId: "NT", pnpTargets: 100, expressEntry: 25, studyPermits: 40, workPermits: 100, borderCrossings: 1 },
  { year: 2025, quarter: "Q1", provinceId: "NT", pnpTargets: 105, expressEntry: 25, studyPermits: 35, workPermits: 100, borderCrossings: 1 },
  { year: 2025, quarter: "Q2", provinceId: "NT", pnpTargets: 110, expressEntry: 30, studyPermits: 45, workPermits: 120, borderCrossings: 2 },
  { year: 2025, quarter: "Q3", provinceId: "NT", pnpTargets: 125, expressEntry: 35, studyPermits: 55, workPermits: 140, borderCrossings: 3 },
  { year: 2025, quarter: "Q4", provinceId: "NT", pnpTargets: 120, expressEntry: 30, studyPermits: 35, workPermits: 90, borderCrossings: 1 },
  { year: 2026, quarter: "Q1", provinceId: "NT", pnpTargets: 125, expressEntry: 35, studyPermits: 35, workPermits: 95, borderCrossings: 1 },
  { year: 2026, quarter: "Q2", provinceId: "NT", pnpTargets: 130, expressEntry: 40, studyPermits: 45, workPermits: 115, borderCrossings: 2 },
  { year: 2026, quarter: "Q3", provinceId: "NT", pnpTargets: 145, expressEntry: 45, studyPermits: 55, workPermits: 130, borderCrossings: 3 },
  { year: 2026, quarter: "Q4", provinceId: "NT", pnpTargets: 140, expressEntry: 40, studyPermits: 30, workPermits: 80, borderCrossings: 1 },

  // Nunavut (NU)
  { year: 2024, quarter: "Q1", provinceId: "NU", pnpTargets: 20, expressEntry: 0, studyPermits: 10, workPermits: 50, borderCrossings: 0 },
  { year: 2024, quarter: "Q2", provinceId: "NU", pnpTargets: 25, expressEntry: 0, studyPermits: 12, workPermits: 60, borderCrossings: 0 },
  { year: 2024, quarter: "Q3", provinceId: "NU", pnpTargets: 30, expressEntry: 0, studyPermits: 15, workPermits: 70, borderCrossings: 0 },
  { year: 2024, quarter: "Q4", provinceId: "NU", pnpTargets: 25, expressEntry: 0, studyPermits: 8, workPermits: 40, borderCrossings: 0 },
  { year: 2025, quarter: "Q1", provinceId: "NU", pnpTargets: 25, expressEntry: 0, studyPermits: 8, workPermits: 40, borderCrossings: 0 },
  { year: 2025, quarter: "Q2", provinceId: "NU", pnpTargets: 30, expressEntry: 0, studyPermits: 10, workPermits: 50, borderCrossings: 0 },
  { year: 2025, quarter: "Q3", provinceId: "NU", pnpTargets: 35, expressEntry: 0, studyPermits: 12, workPermits: 55, borderCrossings: 0 },
  { year: 2025, quarter: "Q4", provinceId: "NU", pnpTargets: 30, expressEntry: 0, studyPermits: 8, workPermits: 35, borderCrossings: 0 },
  { year: 2026, quarter: "Q1", provinceId: "NU", pnpTargets: 30, expressEntry: 0, studyPermits: 8, workPermits: 35, borderCrossings: 0 },
  { year: 2026, quarter: "Q2", provinceId: "NU", pnpTargets: 35, expressEntry: 0, studyPermits: 10, workPermits: 45, borderCrossings: 0 },
  { year: 2026, quarter: "Q3", provinceId: "NU", pnpTargets: 40, expressEntry: 0, studyPermits: 12, workPermits: 50, borderCrossings: 0 },
  { year: 2026, quarter: "Q4", provinceId: "NU", pnpTargets: 35, expressEntry: 0, studyPermits: 8, workPermits: 30, borderCrossings: 0 }
];
