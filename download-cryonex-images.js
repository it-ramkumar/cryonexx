#!/usr/bin/env node
/**
 * Cryonex HVAC images downloader
 *
 * Downloads every Cryonex HVAC product image from your Shopify CDN into
 *     public/images/cryonex/<key>-<n>.webp
 *
 * USAGE:
 *   1) Save this file to your Next.js project root (next to package.json)
 *   2) Open a terminal in that folder
 *   3) Run:   node download-cryonex-images.js
 *   4) Wait ~10 seconds for the green check marks
 *
 * Requires Node 18+ (uses built-in fetch).
 */

const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream/promises');

const OUT_DIR = path.join(process.cwd(), 'public', 'images', 'cryonex');

const FILES = {
  // ───── X700 Rooftop AC ─────
  'ac-x700-1':  'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/7_dbd21b05-2f82-4d44-9920-d7e870318a49.webp?v=1776183481',
  'ac-x700-2':  'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/4_72f1773e-971a-4817-9505-3a687bcab36e.webp?v=1776183807',
  'ac-x700-3':  'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/9_8572ec79-6e92-4de8-8ae6-0846a6d290d7.webp?v=1776183807',
  'ac-x700-4':  'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/Remote_probreeze_fan_orion.png?v=1777490239',
  'ac-x700-5':  'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/3_2fba31af-f490-46be-98eb-49637beaea3c.webp?v=1776183807',
  'ac-x700-6':  'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/8_5fd1d4e9-ad64-4b56-a679-fae2b385f457.webp?v=1776183807',
  'ac-x700-7':  'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/2_d30d0342-57b7-4799-a3a9-6b6e019be414.webp?v=1776183807',
  'ac-x700-8':  'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/10_45f42e78-6187-4d1f-8618-109d53a926d5.webp?v=1776183512',
  'ac-x700-9':  'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/5_74411265-6e24-4ba8-b5b8-b23d92278332.webp?v=1776183480',
  'ac-x700-10': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/6_daac426d-44b8-47d8-83a3-4afdea47da40.webp?v=1776183480',

  // ───── BC83A Compressor Fridge ─────
  'fridge-bc83a-1': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/2_c2354c3b-c67a-4e1a-9c3c-280ef5356ada_1.webp?v=1776289774',
  'fridge-bc83a-2': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/1_e24b8ae5-8b2c-4683-80d0-b9f178434577.webp?v=1776289774',
  'fridge-bc83a-3': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/4_d1dff8ce-334c-4979-a1b5-1ae08ac1f5fb.webp?v=1776289774',
  'fridge-bc83a-4': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/2_2b5ace26-391d-44e3-9d3f-64ac1e0c6050.webp?v=1776289774',
  'fridge-bc83a-5': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/6_3aca378f-890a-45e4-9bba-a0070f12f8e9.webp?v=1776289774',
  'fridge-bc83a-6': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/7_1b96e29b-2d34-4b41-93f2-68a466569cd9.webp?v=1776289774',
  'fridge-bc83a-7': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/8_cedbbf03-b7bd-49de-ace1-287b94e21006.webp?v=1776289774',
  'fridge-bc83a-8': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/9_5281de55-520b-4b6c-af49-98bc2cde69e6.webp?v=1776289774',

  // ───── Roof Ventilation Fan ─────
  'vent-fan-1':  'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/2_1_1_1.webp?v=1776289247',
  'vent-fan-2':  'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/5_3_1_1.webp?v=1776289258',
  'vent-fan-3':  'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/4_3_1_1.webp?v=1776289259',
  'vent-fan-4':  'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/9_1_1_1.webp?v=1776289259',
  'vent-fan-5':  'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/1_1_1.webp?v=1776289259',
  'vent-fan-6':  'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/7_1_1_1.webp?v=1776289259',
  'vent-fan-7':  'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/8_2_1_1.webp?v=1776289259',
  'vent-fan-8':  'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/10_1_1_1.webp?v=1776289259',
  'vent-fan-9':  'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/6_2_1_1.webp?v=1776289259',
  'vent-fan-10': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/3_1_1_1.webp?v=1776289450',
  'vent-fan-11': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/image_picker-14902-0000093C81156515_1_2e5ca3bb-42bd-430f-b3be-a81045d89a3c.webp?v=1776289450',
};

async function download(name, url) {
  // Always save as .webp (most images are already webp; PNGs are converted by browser anyway)
  const file = path.join(OUT_DIR, `${name}.webp`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await pipeline(res.body, fs.createWriteStream(file));
    console.log(`✓  ${name}.webp`);
    return true;
  } catch (err) {
    console.error(`✗  ${name}.webp  —  ${err.message}`);
    return false;
  }
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log(`\nDownloading Cryonex HVAC images to:\n  ${OUT_DIR}\n`);

  const entries = Object.entries(FILES);
  let done = 0;
  let failed = 0;

  // Concurrency cap of 6 so we don't hammer the CDN
  const queue = [...entries];
  const workers = Array.from({ length: 6 }, async () => {
    while (queue.length) {
      const [name, url] = queue.shift();
      const ok = await download(name, url);
      if (ok) done++; else failed++;
    }
  });
  await Promise.all(workers);

  console.log(`\nDone.  ${done} downloaded, ${failed} failed.`);
  if (failed === 0) {
    console.log('\nNext step: refresh your browser at localhost:3000');
  } else {
    console.log('\nSome files failed. Run the script again to retry.');
  }
})();
