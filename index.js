const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());

// --- ZMIENNA ŚRODOWISKOWA (Klucz API będzie w ustawieniach Rendera) ---
const API_KEY = process.env.YOUTUBE_API_KEY;

// --- TWOJA LISTA FILMÓW ---
const VIDEO_IDS = [
    'NypNGrgWGew', 'VRoNZWgFBjQ', 'Jt4Wfayvp6s', 'OrKoVXPoftg', 'JnuQrGT-nqM', '8H00UTAO1Ns', 'iZJ4849UM_8', 'e3mOiNM_qEQ', 'bi7F6Aqjih4', 'orcxr27mWfw', 'i_yftYJVD38', 'GVgQsFdvcNc', 'Ez7azXlSJI8', 'nlwUvZuWWS4', '9XwlUoCoaeA', 'hoKiBGfRNvI', '7RkqQ4VjIqc', 'pfMgcvz7to', 'K-xOPKGkI24', 'WpScWpVkH20', 'eKqEJautpns',
    'Ym9WAYoMdQA', 'jZaL2ZTpwzk', 'PWw0V88ec4o', '8m7eKMiY92A', '9_cDfUp1_iY', 'uloSJJheK64', 'WG5UFA1vCVM', '5DqJBlrbGKM', 'LRF9KPoMCxA', 'sg84AvLYyeo',
    'F397tTvhOGk', 'cWvA7g6wR7k', 'q18QLktQNBU', 'qcPc4sBEDWU', 'r0b0hGP0j9U', 'T0VpmIth5Vo', 'xHLW0AMJrCs', 'EnbvCME54zc', 'FQX_r7nMct8', '3MAlNaNDQJU',
    '7L9leFUo1Ag', 'HJ82pu0MMy4', 'NZ0mhAVuXWs', 'Da4cfCPV9sk', '1_OIBYBAg7Q', 'kiL_C0XjMD4', 'cDxHNz8h9C4', 'B_reaQeSw_o', 'qwL-VpKkDFA', 'f8ENuzy8jXA',
    'p2hTCOrfS3A', 'LYScOs_fOZA', 'THUItebU_28', '0gjeEnj9CCM', 'HQPVgYYJ5PU', 'iGKMjLv8hQk', 'T8hXwiOc_t4', 'qUs_IEeAI3M', '3UsKB7bmbZs', '6AeERuT6eWU',
    'dyNZ2mghi2w', 'ay1RGLo6RLE', 'ZHtqEk7wluc', 'GYerhXtX5rs', 'gyaIw2tUVC4', 'LcCZjpZHhJ0', 'RPkmDXWro8o', 'RaWfxkeR2m0', 'GJDY7FhG3XE', 'lKgEkU3wGxc',
    'X9s_3upvYaY', 'W2FeaOE4y_o', 'lOUeZvipFZs', 'AVdVOYUuqvs', '8km8tJPm6pg', 'dL4I0TcRLfg', 'rWY3J7CAXOg', '5zREaxrb7_0', 'fqnIE74uvCg', 'lWM42N-lHqc',
    'AQvv2c8pXRY', 'exF0bGUf5e8', '_vj4RJteCFE', '0E3vrJV08gU', 'cD9vK_xm-Ig', 'vQ5RKrS1c4g', 'NX0B45otjcI', 'ro8S4idkEyo', 'jhgC3FncHBo', 'AaJ7Yh3U7qA',
    'UwPV-gwcG-g', '7qnEvkdt3i0', 'X9DWGsRzjSA', 'Zzxlpn_J35c', 'N3JzTKQi6xU', 'l9cQYV77cOM', 'dklAc0oye3E', 's4QWXwPzaPg', 'qNqEOYnmWIs', 'ziVF1Eo7o2g',
    '97d1iynNvco', '4C_cDVB8MU8', 'hho75wGOrj0', 'ALTsRfeNxBk', '2kKzTUMTatM', 'laqZEEFNQJA', 'ZhCPP6CrArw', 'ZiJ9XNsuoHA', 'PlKXMiNQ-xo', 'dadgJRL8Fh8',
    'tHuulaZKb18', 'm8rN9tXJxtk', 'l00ECnrb9mo', 'wmdOxo-mNQ0', 'W6VYOD7_7ic', 'bVZ6xUqIeD4', 'Yi_dDTer-VE', '4dqCt-ZT4ws', '0p0HhPKOdTM', 'S5Kqvwu5JY0',
    'tOdzoKMdwoE', 'fcTsUZMaeWs', 'tg0oMlbOJa0', 'zZDyPAYvqI0', 'zQj1XZss-IM', 'L1mSIVG4uSk', 'VFyG_SdYqi0', '5LTadye6jkk', 'fXeCB2ChE94', 'HFRV_IKBsgs',
    'WIpRgltL0VY', 'Tnk1SDy0lRw', 'lSa6N_FkZAo', 'JpG4K6upbtY', 'ySDeoYQsag8', 'XnqtzQDJlKU', 'yd6zDWzM3Fs', 'Unnjla6MF1Y', 'hTut2tED8YM', 'uTwmIbTnbcE',
    'h7avksLJuRg', 'vI8jCew-M28', 'Pk5MFy5nSoo', 'sHm0dxwtSBI', '3MX-IGdRiEQ', 'f35bvlVMMZ0', 'lB9oizxJEAQ', 'WkcsSDUZfNE', 'hcOdAX_GYxs', 'bRMkLJGNu4E',
    'TMCcqfTPueE', 'qFET-CPQPjc', 'u6IWGDJn_CU', '1kaWpM2Ocgg', 'HTDnTBO-Wq4', 'I_NTb5Vu0yA', 'aXMiQ-duwzI'
];

let cachedData = null;
let lastUpdate = 0;

async function fetchFromYouTube() {
  if (cachedData && Date.now() - lastUpdate < 60000) {
    return cachedData;
  }

  const BATCH_SIZE = 50;
  let allItems = [];
  
  try {
    for (let i = 0; i < VIDEO_IDS.length; i += BATCH_SIZE) {
      const chunk = VIDEO_IDS.slice(i, i + BATCH_SIZE).join(",");
      const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${chunk}&key=${API_KEY}`;
      const response = await axios.get(url);
      if (response.data.items) {
        allItems = allItems.concat(response.data.items);
      }
    }
    cachedData = { items: allItems };
    lastUpdate = Date.now();
    console.log("Dane odświeżone z YouTube.");
    return cachedData;
  } catch (error) {
    console.error("Błąd YouTube:", error.message);
    return cachedData || { items: [] };
  }
}

app.get("/stats", async (req, res) => {
  const data = await fetchFromYouTube();
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
