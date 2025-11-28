/**
 * Firebase Integration for AQ-FAS
 * Integrates market prices and government schemes into the UI
 * Include this after firebase-config.js and firebase-db.js
 */

/**
 * Load and display market prices in the market section
 */
function loadMarketPricesUI() {
  const marketTable = document.querySelector('table tbody');
  if (!marketTable) return;
  
  getMarketPrices((prices) => {
    // Clear existing rows
    marketTable.innerHTML = '';
    
    // Populate table with latest prices from Firebase
    Object.values(prices).forEach((priceData) => {
      const row = document.createElement('tr');
      const trendEmoji = priceData.trend === 'up' ? '📈' : (priceData.trend === 'down' ? '📉' : '➡️');
      const trendPercent = priceData.trend === 'up' ? '+2.3%' : (priceData.trend === 'down' ? '-1.2%' : '0.0%');
      
      row.innerHTML = `
        <td>${priceData.crop}</td>
        <td>${priceData.market}</td>
        <td>₹${priceData.price}</td>
        <td>${trendEmoji} ${trendPercent}</td>
      `;
      marketTable.appendChild(row);
    });
    
    console.log('✅ Market prices loaded into UI');
  });
}

/**
 * Load and display government schemes in the schemes section
 */
function loadGovernmentSchemesUI() {
  const schemesContainer = document.querySelector('#schemes ~ .container [style*="display:grid"]');
  if (!schemesContainer) {
    console.warn('⚠️ Schemes container not found. Trying alternative selector...');
    // Fallback: try to find by section structure
    const section = document.querySelector('[aria-labelledby="schemesTitle"]');
    if (!section) return;
    const div = section.querySelector('[style*="display:grid"]');
    if (!div) return;
    schemesContainer = div;
  }
  
  getGovernmentSchemes((schemes) => {
    // Clear existing schemes
    schemesContainer.innerHTML = '';
    
    // Populate with schemes from Firebase
    Object.values(schemes).forEach((schemeData) => {
      const card = document.createElement('div');
      card.className = 'scheme-card';
      card.innerHTML = `
        <h4>${schemeData.name}</h4>
        <p>${schemeData.description}</p>
        <p><strong>Eligibility:</strong> ${Array.isArray(schemeData.eligibility) ? schemeData.eligibility.join(', ') : schemeData.eligibility}</p>
        <p><strong>Benefits:</strong> ${Array.isArray(schemeData.benefits) ? schemeData.benefits.join(', ') : schemeData.benefits}</p>
        ${schemeData.applicationURL ? `<a href="${schemeData.applicationURL}" target="_blank" style="color: #2ecc71;">Apply Now →</a>` : ''}
      `;
      schemesContainer.appendChild(card);
    });
    
    console.log('✅ Government schemes loaded into UI');
  });
}

/**
 * Initialize Firebase UI components on page load
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('Loading Firebase data...');
  
  // Load market prices after a short delay to ensure DOM is ready
  setTimeout(() => {
    loadMarketPricesUI();
  }, 500);
  
  // Load government schemes after a short delay
  setTimeout(() => {
    loadGovernmentSchemesUI();
  }, 500);
});

/**
 * Optional: Refresh market prices every 5 minutes (for live updates)
 */
setInterval(() => {
  console.log('🔄 Refreshing market prices...');
  loadMarketPricesUI();
}, 5 * 60 * 1000); // 5 minutes

console.log('✅ Firebase UI integration ready');
