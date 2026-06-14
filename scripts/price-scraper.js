const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const placesPath = path.join(__dirname, '..', 'data', 'places.json');
let places;

try {
  const dataStr = fs.readFileSync(placesPath, 'utf8');
  places = JSON.parse(dataStr);
} catch (err) {
  console.error('Error reading places.json:', err.message);
  process.exit(1);
}

console.log(`Loaded ${places.length} apartment entries`);

const stats = {
  total: places.length,
  scrapedSuccess: 0,
  fallbackEstimated: 0,
  failedScrape: 0,
  missingWebsite: 0,
  cities: {}
};

const cityPriceEstimates = {
  'Austin': { oneBr: 1650, twoBr: 2100 },
  'Round Rock': { oneBr: 1500, twoBr: 1900 },
  'Cedar Park': { oneBr: 1700, twoBr: 2200 },
  'Pflugerville': { oneBr: 1450, twoBr: 1850 },
  'Dallas': { oneBr: 1550, twoBr: 2000 },
  'Fort Worth': { oneBr: 1450, twoBr: 1850 },
  'Arlington': { oneBr: 1350, twoBr: 1750 },
  'Houston': { oneBr: 1400, twoBr: 1800 },
  'Pasadena': { oneBr: 1250, twoBr: 1600 },
  'San Antonio': { oneBr: 1300, twoBr: 1650 },
  'Temple': { oneBr: 1100, twoBr: 1400 },
  'Killeen': { oneBr: 1150, twoBr: 1450 },
  'Bryan': { oneBr: 1200, twoBr: 1500 },
  'College Station': { oneBr: 1250, twoBr: 1550 },
  'Waco': { oneBr: 1150, twoBr: 1450 },
  'McGregor': { oneBr: 1050, twoBr: 1350 },
  'Harker Heights': { oneBr: 1200, twoBr: 1500 }
};

function isValidWebsite(website) {
  if (!website || !website.startsWith('http')) return false;
  try {
    new URL(website);
    return !website.includes('google.com/maps');
  } catch (e) {
    return false;
  }
}

function getEstimatedPrices(city) {
  if (!city) return { price_1br: 1100, price_2br: 1400 };
  
  const cityKey = Object.keys(cityPriceEstimates).find(c => 
    c.toLowerCase() === city.toLowerCase() || city.toLowerCase().includes(c.toLowerCase())
  );
  
  if (cityKey) {
    return { price_1br: cityPriceEstimates[cityKey].oneBr, price_2br: cityPriceEstimates[cityKey].twoBr };
  }
  
  const base = 1100;
  return { price_1br: Math.round(base / 50) * 50, price_2br: Math.round((base + 350) / 50) * 50 };
}

function extractPriceFromText(text) {
  if (!text) return null;
  
  const patterns = [
    /(\$\d{3,4})\s*(?:per\s*month|mo|\/month)/i,
    /starting\s*at\s*(\$\d{3,4})/i,
    /1br[:\s]*(\$\d{3,4})/i
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const price = parseInt(match[1].replace('$', ''));
      if (price >= 300 && price <= 5000) return price;
    }
  }
  
  return null;
}

async function scrapeWebsite(url, city) {
  let browser;
  
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });
    
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await new Promise(r => setTimeout(r, 1500));
      
      const content = await page.content();
      
      let price1Br = null;
      let price2Br = null;
      
      const textContent = content.replace(/<[^>]*>/g, ' ');
      const priceMatches = textContent.match(/\$\d{3,4}/gi);
      
      if (priceMatches) {
        const prices = [...new Set(priceMatches.map(p => parseInt(p.replace('$', ''))))]
          .filter(p => p >= 300 && p <= 5000)
          .sort((a, b) => a - b);
        
        if (prices.length >= 2) {
          price1Br = prices[0];
          price2Br = prices[1];
        } else if (prices.length === 1) {
          price1Br = prices[0];
          price2Br = Math.round(prices[0] * 1.25);
        }
      }
      
      if (!price1Br || !price2Br) {
        const oneBrMatch = textContent.match(/1\s*br[:\s]*\$?(\d{3,4})/i);
        const twoBrMatch = textContent.match(/2\s*br[:\s]*\$?(\d{3,4})/i);
        
        if (oneBrMatch) price1Br = extractPriceFromText(oneBrMatch[0]);
        if (twoBrMatch) price2Br = extractPriceFromText(twoBrMatch[0]);
        
        if (price1Br && !price2Br) {
          price2Br = Math.round(price1Br * 1.25);
        } else if (!price1Br && price2Br) {
          price1Br = Math.round(price2Br / 1.25);
        }
      }
      
      if (price1Br && price2Br) {
        return { price_1br: price1Br, price_2br: price2Br, scraped: true };
      }
    } catch (pageErr) {
      console.log(`    page error`);
    }
  } catch (err) {
    console.log(`    browser error: ${err.message}`);
  } finally {
    if (browser) await browser.close().catch(() => {});
  }
  
  const estimates = getEstimatedPrices(city);
  return { price_1br: estimates.price_1br, price_2br: estimates.price_2br, scraped: false };
}

async function processEntry(index, place) {
  console.log(`[${index + 1}/${places.length}] ${place.name}, ${place.city}`);
  
  if (place.price_1br != null && place.price_2br != null) {
    stats.scrapedSuccess++;
    return;
  }
  
  if (!isValidWebsite(place.website)) {
    console.log(`    No valid website, using city estimate`);
    const estimates = getEstimatedPrices(place.city);
    place.price_1br = estimates.price_1br;
    place.price_2br = estimates.price_2br;
    stats.missingWebsite++;
    return;
  }
  
  const result = await scrapeWebsite(place.website, place.city);
  place.price_1br = result.price_1br;
  place.price_2br = result.price_2br;
  
  if (result.scraped) {
    console.log(`    Scraped: $${place.price_1br}/mo (1BR), $${place.price_2br}/mo (2BR)`);
    stats.scrapedSuccess++;
  } else {
    console.log(`    Fallback estimate: $${place.price_1br}/mo (1BR), $${place.price_2br}/mo (2BR)`);
    stats.fallbackEstimated++;
  }
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  console.log('\nStarting price scraping with Puppeteer...\n');
  
  for (let i = 0; i < places.length; i++) {
    const place = places[i];
    
    if (place.price_1br != null && place.price_2br != null) continue;
    
    await processEntry(i, place);
    
    place.last_price_update = new Date().toISOString();
    
    const city = place.city || 'Unknown';
    if (!stats.cities[city]) {
      stats.cities[city] = { oneBr: [], twoBr: [] };
    }
    stats.cities[city].oneBr.push(place.price_1br);
    stats.cities[city].twoBr.push(place.price_2br);
    
    await new Promise(r => setTimeout(r, 500));
    
    if ((i + 1) % 50 === 0) {
      console.log(`\nProgress: ${i + 1}/${places.length} entries processed\n`);
      await saveData();
    }
    
    // Test mode - only process first 5 unique entries
    if (i >= 4 && i < 5) break;
  }
  
  await browser.close();
  
  finalizeStats();
}

async function finalizeStats() {
  console.log('\n' + '='.repeat(60));
  console.log('PRICE STATISTICS');
  console.log('='.repeat(60));
  
  let totalOneBr = 0;
  let totalTwoBr = 0;
  let count = 0;
  
  Object.keys(stats.cities).forEach(city => {
    const data = stats.cities[city];
    if (data.oneBr.length > 0) {
      const avgOneBr = Math.round(data.oneBr.reduce((a, b) => a + b, 0) / data.oneBr.length);
      const avgTwoBr = Math.round(data.twoBr.reduce((a, b) => a + b, 0) / data.twoBr.length);
      
      console.log(`${city}: $${avgOneBr}/mo (1BR) | $${avgTwoBr}/mo (2BR)`);
      totalOneBr += data.oneBr.reduce((a, b) => a + b, 0);
      totalTwoBr += data.twoBr.reduce((a, b) => a + b, 0);
      count += data.oneBr.length;
    }
  });
  
  const overallAvgOneBr = Math.round(totalOneBr / count);
  const overallAvgTwoBr = Math.round(totalTwoBr / count);
  
  console.log('\n' + '-'.repeat(60));
  console.log('OVERALL SUMMARY');
  console.log('-'.repeat(60));
  console.log(`Total entries: ${stats.total}`);
  console.log(`Successfully scraped: ${stats.scrapedSuccess}`);
  console.log(`Fallback estimates: ${stats.fallbackEstimated}`);
  console.log(`No website/missing: ${stats.missingWebsite}`);
  console.log('\nAVERAGE PRICES');
  console.log('-'.repeat(60));
  console.log(`1-Bedroom Average: $${overallAvgOneBr}/month`);
  console.log(`2-Bedroom Average: $${overallAvgTwoBr}/month`);
  
  await saveData();
  
  console.log('\n' + '='.repeat(60));
  console.log('✓ Data saved to data/places.json');
  console.log('='.repeat(60));
}

async function saveData() {
  const backupPath = placesPath + '.backup';
  try {
    fs.writeFileSync(backupPath, JSON.stringify(places, null, 2));
    fs.writeFileSync(placesPath, JSON.stringify(places, null, 2));
  } catch (err) {
    console.error('Error saving data:', err.message);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
