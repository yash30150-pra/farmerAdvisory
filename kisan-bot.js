  
    const els = {
      apiKey: document.getElementById('apiKey'),
      saveKey: document.getElementById('saveKey'),
      clearKey: document.getElementById('clearKey'),
      keyNotice: document.getElementById('keyNotice'),
      resetChat: document.getElementById('resetChat'),
      suggestions: document.getElementById('suggestions'),
      messages: document.getElementById('messages'),
      userInput: document.getElementById('userInput'),
      sendBtn: document.getElementById('sendBtn')
    };

    const STORAGE_KEY = 'kisan_mitra_gemini_key_v1';

    function loadApiKey() {
      const key = localStorage.getItem(STORAGE_KEY) || '';
      els.apiKey.value = key ? '••••-saved-••••' : '';
      els.keyNotice.textContent = key ? 'API key saved locally in this browser.' : 'API key is required and stored only in your browser (localStorage).';
    }

    function saveApiKey() {
      const val = els.apiKey.value.trim();
      if (!val) return;
      localStorage.setItem(STORAGE_KEY, val);
      loadApiKey();
    }

    function clearApiKey() {
      localStorage.removeItem(STORAGE_KEY);
      els.apiKey.value = '';
      els.keyNotice.textContent = 'API key cleared. Paste a valid key to use the bot.';
    }

    function getApiKey() {
        // TODO: USE ENV variables or local storage
        return "AIzaSyCEkdYvgWO-4_-RHIegO5WmOmAAKNM4IhA";
      const current = els.apiKey.value.trim();
      if (current && current !== '••••-saved-••••') return current;
      return localStorage.getItem(STORAGE_KEY) || '';
    }

    function addMessage(role, text) {
      const wrap = document.createElement('div');
      wrap.className = `msg ${role === 'user' ? 'user' : 'assistant'}`;

      const avatar = document.createElement('div');
      avatar.className = 'avatar';
      avatar.textContent = role === 'user' ? 'U' : 'KM';

      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.textContent = text;

      wrap.appendChild(avatar);
      wrap.appendChild(bubble);
      els.messages.appendChild(wrap);
      els.messages.scrollTop = els.messages.scrollHeight;
    }

    function setLoading(isLoading) {
      els.sendBtn.disabled = isLoading;
      els.sendBtn.textContent = isLoading ? 'Sending…' : 'Send';
    }

    function isFarmingRelated(text) {
      const t = (text || '').toLowerCase();
      const keywords = [
        // English
        'farm','farmer','farming','agriculture','agri','crop','harvest','yield','irrigation','drip','sprinkler','fertilizer','fertiliser','manure','compost','vermicompost','pesticide','herbicide','insecticide','fungicide','seed','sowing','planting','transplanting','nursery','greenhouse','green house','tractor','combine','harvester','storage','cold storage','post-harvest','market','mandi','mandi rate','market price','msp','kcc','kisan credit card','loan','subsidy','scheme','government scheme','fpo','farmer producer','organic','ipm','integrated pest management','soil test','ph','nitrogen','phosphorus','potassium','npk','micronutrient','micro nutrient','crop rotation','cover crop','mulch','green manure','irrigate','irrigation system','watering','water management','irrigation','pest','disease','blight','rust','aphid','locust','weed','weed control','spray','chemical','biofertilizer','yield improvement','postharvest','storage','cold room','silo','grading','packing','market access','mandi rates',
        // Hindi / Hinglish (Devanagari + Romanized common forms)
        'किसान','कृषि','खेती','फसल','फसाल','बीज','बिजन','बीज','बुवाई','बिजाई','काटाई','कटाई','फसल कटाई','मिट्टी','मिट्टी की जाँच','मिट्टी की जाँच','मिट्टी की जाँच','खाद','उर्वरक','खाद्य','जैविक','जैविक खेती','कम्पोस्ट','वर्मीकम्पोस्ट','कीटनाशक','कीट नाशक','फफूंदी','रोग','पेस्ट','बीमारी','सिंचाई','सिंचन','सिंचाई प्रबंधन','पानी','पानी की कमी','नल','ड्रिप','ड्रिप इरिगेशन','स्प्रिंकलर','ट्रैक्टर','हार्वेस्टर','खेत','किराना','मंडी','मंडी भाव','मंडी दर','मंडियाँ','सरकारी योजना','योजना','अनुदान','सब्सिडी','किसान क्रेडिट कार्ड','किसान संगठन','एफपीओ','खरिप','खरीफ','रबी','जायद','नर्सरी','जारिया','कटाई','कितना उत्पादन','उत्पादन','उत्पादन बढ़ाना','पानी प्रबंधन','सूखा','बदलाव','कीट','रोग निवारण','बीज प्रमाण','मंजूरी','कपास','चावल','गेहूँ','गन्ना','सोयाबीन','चना','चना','प्याज़','प्याज','टमाटर','आलू','मिर्च',
        // Hinglish / Romanized Hindi common spellings
        'kisan','krishi','kheti','fasal','beej','beej','miti','mitti','soil','paani','pani','sinchai','sinchayi','sinchayi','irrigation','urvarak','urvarak','fertilizer','fertiliser','keetanashak','keetanashak','keetanashak','keet','keetnashak','pesticide','pest','disease','crop','sowing','buwai','buwai','buwai','buraai','kharif','rabi','zaid','tractor','harvester','drip','sprinkler','compost','vermi','mulching','mulch','organic','biopesticide','npk','soil test','ph','micro nutrient','micronutrient','mandi','bazaar','mandi rate','msp','kcc','fpo','kisan credit','subsidy','yojana','scheme'
      ];
      return keywords.some(k => t.includes(k));
    }

    function refusalMessage() {
      return 'Maaf kijiye, main sirf farming se jude sawaalon ka jawab de sakta hoon. Kripya kheti-badi, fasal, mitti, paani, keet niyantran, bazaar, ya sarkari yojana se related prashna poochiye.';
    }

    async function askGemini(question, lang = 'en') {
      const apiKey = getApiKey();
      if (!apiKey) {
        throw new Error('API key missing');
      }

      const langMap = { en: 'English', hi: 'Hindi (Devanagari)', ml: 'Malayalam' };
      const langInstruction = langMap[lang] || 'English';

      const systemInstructions = [
        'You are Kisan Mitra, a helpful farming assistant for Indian farmers.',
        'Answer ONLY agriculture/farming related queries (crops, soil, water/irrigation, pests/diseases, fertilizers, organic practices, agri-machinery, weather, mandi/bazaar rates, government schemes).',
        'If a query is not related to farming, briefly refuse: "Main sirf farming se jude sawaalon ka jawab de sakta hoon." and ask for a farming topic.',
        'Style: Hinglish (mix simple Hindi + English), clear, friendly, practical. Use short steps or bullet points when useful.',
        'Prefer metric units. Add safety cautions for chemicals. Ask 1 clarifying question if location/variety is crucial.'
      ].join('\n');

      const payloadText = `${systemInstructions}\n\nUser question: ${question}\n\nRespond in: ${langInstruction}. Use simple local words where appropriate.`;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
      const body = {
        contents: [
          { role: 'user', parts: [{ text: payloadText }] }
        ]
      };

      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!resp.ok) {
        const text = await resp.text().catch(() => '');
        throw new Error(`Gemini error: ${resp.status} ${text}`);
      }

      const data = await resp.json();
      const out = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      return out.trim() || 'Mujhe sahi jawaab nahi mila. Kripya sawaal ko thoda aur saaf tarike se likhiye.';
    }

    async function handleSend() {
      const q = els.userInput.value.trim();
      if (!q) return;
      addMessage('user', q);
      els.userInput.value = '';
      setLoading(true);

      try {
        // Read language selection from page if available
        const selEl = document.getElementById && document.getElementById('langSelect');
        const lang = (selEl && selEl.value) || (localStorage.getItem('AQFAS_LANG') || 'en');

        if (!isFarmingRelated(q)) {
          addMessage('assistant', refusalMessage());
          return;
        }
        const answer = await askGemini(q, lang);
        addMessage('assistant', answer);
      } catch (e) {
        const msg = (e && e.message) ? e.message : String(e);
        addMessage('assistant', `Error: ${msg}\n\nTips:\n- API key sahi dalein (Google Gemini v1beta).\n- Thodi der baad try karein.`);
      } finally {
        setLoading(false);
      }
    }

    function resetChat() {
      els.messages.innerHTML = '';
      addMessage('assistant', 'Namaste! Main Kisan Mitra hoon. Aap apne farming se jude sawaal puchh sakte hain – jaise fasal ka beej, mitti ki taiyari, keet/disease control, irrigation, ya mandi/bazaar ke baare me. Main Hinglish me seedhe-se jawaab dunga.');
    }

    function wireEvents() {
      els.saveKey.addEventListener('click', saveApiKey);
      els.clearKey.addEventListener('click', clearApiKey);
      els.sendBtn.addEventListener('click', handleSend);
      els.userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      });
      els.resetChat.addEventListener('click', resetChat);
      els.suggestions.addEventListener('click', (e) => {
        const t = e.target;
        if (t && t.classList.contains('chip')) {
          els.userInput.value = t.textContent.trim();
          handleSend();
        }
      });
    }

    // loadApiKey();
    // wireEvents();
    // resetChat();
  