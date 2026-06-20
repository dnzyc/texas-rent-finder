const {createClient}=require("@supabase/supabase-js");
const fs=require("fs");
require("dotenv").config({path:".env.local"});
const su=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY);

async function main(){
  let suspects = [];
  let offset = 0;
  
  while (true) {
    let {data} = await su.from("places").select("id,name,city,rating,phone").range(offset, offset+999);
    if (!data || data.length===0) break;
    
    for (let r of data) {
      let name = (r.name||"").toLowerCase();
      let isSuspect = false;
      let reason = "";
      
      if (name.match(/apt\.?\s*#?\d+/i)) { isSuspect = true; reason = "apt numarasi"; }
      else if (name.match(/\bunit\s+#?\d+/i)) { isSuspect = true; reason = "unit numarasi"; }
      else if (name.match(/#\d{3,4}\b/) && !name.match(/apartment|complex|village|homes|lofts|flats/i)) { isSuspect = true; reason = "oda numarasi"; }
      else if (name.match(/^\d+\s+\w+\s+(parkway|drive|lane|street|rd|blvd|ave|circle|ct|pl|way|trail)/i) && !name.match(/apartments|complex|village|place/i)) {
        isSuspect = true; reason = "adres formatli";
      }
      else if (name.split(",").length >= 2 && name.length > 40 && name.match(/tx|texas/i)) {
        isSuspect = true; reason = "tam adres";
      }
      else if (name.match(/apartment\s+#/i)) { isSuspect = true; reason = "apartment numarali"; }
      
      if (isSuspect) suspects.push({...r, reason});
    }
    offset += 1000;
  }

  console.log("Supheli isimler:", suspects.length);
  suspects.slice(0,40).forEach(s => console.log(`  id=${s.id} [${s.reason}] "${s.name}" | ${s.city}`));
  
  if (suspects.length > 0) {
    let ids = suspects.map(s => s.id);
    await su.from("places").delete().in("id", ids);
    console.log("\nSilindi:", ids.length);
  }
  
  let {count:t} = await su.from("places").select("*",{count:"exact",head:true});
  console.log("Kalan:", t);
}
main();
