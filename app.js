// Albion Online Refining Calculator - Main JavaScript

class AlbionRefiningCalculator {
    constructor() {
        this.currentResource = 'cloth';
        this.prices = {};
        this.settings = this.loadSettings();
        this.lastUpdateTime = null;
        this.apiServers = {
            europe: 'https://europe.albion-online-data.com',
            west: 'https://west.albion-online-data.com',
            east: 'https://east.albion-online-data.com'
        };
        
        this.resourceData = {
            cloth: {
                name: 'Tkanina',
                icon: '🧵',
                items: {
                    T2: { resource: 'T2_CLOTH', product: 'T2_CLOTH_SET1' },
                    T3: { resource: 'T3_CLOTH', product: 'T3_CLOTH_SET1' },
                    T4: { resource: 'T4_CLOTH', product: 'T4_CLOTH_SET1' },
                    T5: { resource: 'T5_CLOTH', product: 'T5_CLOTH_SET1' },
                    T6: { resource: 'T6_CLOTH', product: 'T6_CLOTH_SET1' },
                    T7: { resource: 'T7_CLOTH', product: 'T7_CLOTH_SET1' },
                    T8: { resource: 'T8_CLOTH', product: 'T8_CLOTH_SET1' }
                },
                requirements: {
                    T3: { T2_CLOTH: 2 },
                    T4: { T3_CLOTH: 2 },
                    T5: { T4_CLOTH: 2 },
                    T6: { T5_CLOTH: 2 },
                    T7: { T6_CLOTH: 2 },
                    T8: { T7_CLOTH: 2 }
                }
            },
            bar: {
                name: 'Sztabka',
                icon: '⚒️',
                items: {
                    T2: { resource: 'T2_METALBAR', product: 'T2_METALBAR_SET1' },
                    T3: { resource: 'T3_METALBAR', product: 'T3_METALBAR_SET1' },
                    T4: { resource: 'T4_METALBAR', product: 'T4_METALBAR_SET1' },
                    T5: { resource: 'T5_METALBAR', product: 'T5_METALBAR_SET1' },
                    T6: { resource: 'T6_METALBAR', product: 'T6_METALBAR_SET1' },
                    T7: { resource: 'T7_METALBAR', product: 'T7_METALBAR_SET1' },
                    T8: { resource: 'T8_METALBAR', product: 'T8_METALBAR_SET1' }
                },
                requirements: {
                    T3: { T2_METALBAR: 2 },
                    T4: { T3_METALBAR: 2 },
                    T5: { T4_METALBAR: 2 },
                    T6: { T5_METALBAR: 2 },
                    T7: { T6_METALBAR: 2 },
                    T8: { T7_METALBAR: 2 }
                }
            },
            leather: {
                name: 'Skóra',
                icon: '🦴',
                items: {
                    T2: { resource: 'T2_LEATHER', product: 'T2_LEATHER_SET1' },
                    T3: { resource: 'T3_LEATHER', product: 'T3_LEATHER_SET1' },
                    T4: { resource: 'T4_LEATHER', product: 'T4_LEATHER_SET1' },
                    T5: { resource: 'T5_LEATHER', product: 'T5_LEATHER_SET1' },
                    T6: { resource: 'T6_LEATHER', product: 'T6_LEATHER_SET1' },
                    T7: { resource: 'T7_LEATHER', product: 'T7_LEATHER_SET1' },
                    T8: { resource: 'T8_LEATHER', product: 'T8_LEATHER_SET1' }
                },
                requirements: {
                    T3: { T2_LEATHER: 2 },
                    T4: { T3_LEATHER: 2 },
                    T5: { T4_LEATHER: 2 },
                    T6: { T5_LEATHER: 2 },
                    T7: { T6_LEATHER: 2 },
                    T8: { T7_LEATHER: 2 }
                }
            },
            plank: {
                name: 'Deska',
                icon: '🪵',
                items: {
                    T2: { resource: 'T2_PLANKS', product: 'T2_PLANKS_SET1' },
                    T3: { resource: 'T3_PLANKS', product: 'T3_PLANKS_SET1' },
                    T4: { resource: 'T4_PLANKS', product: 'T4_PLANKS_SET1' },
                    T5: { resource: 'T5_PLANKS', product: 'T5_PLANKS_SET1' },
                    T6: { resource: 'T6_PLANKS', product: 'T6_PLANKS_SET1' },
                    T7: { resource: 'T7_PLANKS', product: 'T7_PLANKS_SET1' },
                    T8: { resource: 'T8_PLANKS', product: 'T8_PLANKS_SET1' }
                },
                requirements: {
                    T3: { T2_PLANKS: 2 },
                    T4: { T3_PLANKS: 2 },
                    T5: { T4_PLANKS: 2 },
                    T6: { T5_PLANKS: 2 },
                    T7: { T6_PLANKS: 2 },
                    T8: { T7_PLANKS: 2 }
                }
            },
            stone: {
                name: 'Kamień',
                icon: '🪨',
                items: {
                    T2: { resource: 'T2_STONEBLOCK', product: 'T2_STONEBLOCK_SET1' },
                    T3: { resource: 'T3_STONEBLOCK', product: 'T3_STONEBLOCK_SET1' },
                    T4: { resource: 'T4_STONEBLOCK', product: 'T4_STONEBLOCK_SET1' },
                    T5: { resource: 'T5_STONEBLOCK', product: 'T5_STONEBLOCK_SET1' },
                    T6: { resource: 'T6_STONEBLOCK', product: 'T6_STONEBLOCK_SET1' },
                    T7: { resource: 'T7_STONEBLOCK', product: 'T7_STONEBLOCK_SET1' },
                    T8: { resource: 'T8_STONEBLOCK', product: 'T8_STONEBLOCK_SET1' }
                },
                requirements: {
                    T3: { T2_STONEBLOCK: 2 },
                    T4: { T3_STONEBLOCK: 2 },
                    T5: { T4_STONEBLOCK: 2 },
                    T6: { T5_STONEBLOCK: 2 },
                    T7: { T6_STONEBLOCK: 2 },
                    T8: { T7_STONEBLOCK: 2 }
                }
            }
        };
        
        this.cities = ['Caerleon', 'Thetford', 'Fort Sterling', 'Lymhurst', 'Bridgewatch', 'Martlock', 'Brecilien'];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.applySettings();
        this.loadStoredPrices();
        this.updateLastUpdateTime();
    }
    
    setupEventListeners() {
        // Resource selection
        document.querySelectorAll('.resource-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectResource(btn.dataset.resource);
            });
        });
        
        // Settings toggle
        document.getElementById('settingsToggle').addEventListener('click', () => {
            const panel = document.getElementById('settingsPanel');
            panel.classList.toggle('hidden');
            panel.classList.toggle('show');
        });
        
        // Update prices
        document.getElementById('updateAllPrices').addEventListener('click', () => {
            this.updateAllPrices();
        });
        
        // Settings changes
        document.querySelectorAll('#settingsPanel select, #settingsPanel input').forEach(input => {
            input.addEventListener('change', () => {
                this.saveSettings();
                this.calculateProfits();
            });
        });
    }
    
    selectResource(resource) {
        this.currentResource = resource;
        
        // Update UI
        document.querySelectorAll('.resource-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-resource="${resource}"]`).classList.add('active');
        
        this.calculateProfits();
    }
    
    async updateAllPrices() {
        this.showLoading(true);
        
        try {
            const server = this.apiServers[this.settings.server];
            const resourceCity = document.getElementById('resourceCity').value;
            const productCity = document.getElementById('productCity').value;
            
            // Get all items for current resource
            const resourceItems = this.resourceData[this.currentResource].items;
            const allItems = [];
            
            Object.values(resourceItems).forEach(item => {
                allItems.push(item.resource);
                allItems.push(item.product);
            });
            
            // Fetch prices from API
            const apiUrl = `${server}/api/v2/stats/prices/${allItems.join(',')}?locations=${resourceCity},${productCity}&qualities=1`;
            const response = await fetch(apiUrl);
            
            if (!response.ok) throw new Error('API request failed');
            
            const data = await response.json();
            
            // Process price data
            data.forEach(item => {
                const key = `${item.item_id}_${item.location}`;
                this.prices[key] = {
                    sell_price_min: item.sell_price_min || 0,
                    sell_price_min_date: item.sell_price_min_date,
                    buy_price_max: item.buy_price_max || 0,
                    buy_price_max_date: item.buy_price_max_date
                };
            });
            
            this.savePrices();
            this.updateLastUpdateTime();
            this.calculateProfits();
            
        } catch (error) {
            console.error('Error updating prices:', error);
            this.showError('Nie udało się zaktualizować cen. Spróbuj ponownie później.');
        } finally {
            this.showLoading(false);
        }
    }
    
    calculateProfits() {
        const resourceCity = document.getElementById('resourceCity').value;
        const productCity = document.getElementById('productCity').value;
        const resourceItems = this.resourceData[this.currentResource].items;
        
        const results = [];
        
        for (const [tier, items] of Object.entries(resourceItems)) {
            const resourcePrice = this.prices[`${items.resource}_${resourceCity}`]?.sell_price_min || 0;
            const productPrice = this.prices[`${items.product}_${productCity}`]?.sell_price_min || 0;
            
            if (!resourcePrice || !productPrice) continue;
            
            const tierNum = parseInt(tier.substring(1));
            const mastery = this.getMasteryBonus(tierNum);
            const returnRate = parseFloat(this.settings.returnRate) / 100;
            const dailyBonus = parseFloat(this.settings.dailyBonus) / 100;
            const usageFee = parseFloat(this.settings.usageFee);
            const marketTax = parseFloat(this.settings.marketTax) / 100;
            
            // Calculate profit
            const resourceCost = resourcePrice * 2;
            const totalCost = resourceCost + usageFee;
            const totalRevenue = productPrice * (1 + dailyBonus) * (1 - marketTax);
            const profit = totalRevenue - totalCost;
            
            // Calculate with return rate
            const expectedReturns = resourcePrice * 2 * returnRate * (1 + mastery);
            const profitWithReturns = profit + expectedReturns;
            
            // Calculate focus cost
            const focusCost = tierNum * 100;
            const profitPerFocus = profitWithReturns > 0 ? profitWithReturns / focusCost : 0;
            
            results.push({
                tier,
                resourcePrice,
                productPrice,
                profit,
                profitWithReturns,
                profitPercent: (profit / totalCost) * 100,
                profitPercentWithReturns: (profitWithReturns / totalCost) * 100,
                focusCost,
                profitPerFocus,
                resourceCost,
                usageFee,
                marketTax: totalRevenue * marketTax
            });
        }
        
        this.displayResults(results);
        this.updateMaterialRequirements();
        this.updateBestCities();
    }
    
    getMasteryBonus(tier) {
        if (tier < 4) return 0;
        const masteryKey = `masteryT${tier}`;
        const masteryLevel = parseFloat(this.settings[masteryKey] || 0);
        return masteryLevel / 100;
    }
    
    displayResults(results) {
        const container = document.getElementById('resultsContainer');
        
        if (results.length === 0) {
            container.innerHTML = `
                <div class="text-center py-8 text-gray-400">
                    <i class="bi bi-exclamation-triangle text-4xl mb-2"></i>
                    <p>Brak danych cen dla wybranych miast. Zaktualizuj ceny.</p>
                </div>
            `;
            return;
        }
        
        const table = `
            <div class="overflow-x-auto">
                <table class="results-table">
                    <thead>
                        <tr>
                            <th>Poziom</th>
                            <th>Zasób</th>
                            <th>Cena (srebro)</th>
                            <th>Produkt</th>
                            <th>Cena (srebro)</th>
                            <th>Zysk</th>
                            <th>Zysk %</th>
                            <th>Koszt focus</th>
                            <th>Zysk/focus</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${results.map(result => `
                            <tr>
                                <td><span class="tier-badge tier-${result.tier.substring(1)}">${result.tier}</span></td>
                                <td>
                                    <img src="${this.getItemImage(result.tier)}" alt="Resource" class="item-image">
                                    ${this.formatPrice(result.resourcePrice)}
                                </td>
                                <td>${this.formatPrice(result.resourcePrice * 2)}</td>
                                <td>
                                    <img src="${this.getItemImage(result.tier, true)}" alt="Product" class="item-image">
                                    ${this.formatPrice(result.productPrice)}
                                </td>
                                <td>${this.formatPrice(result.productPrice * (1 + parseFloat(this.settings.dailyBonus) / 100))}</td>
                                <td class="${result.profitWithReturns >= 0 ? 'profit-positive' : 'profit-negative'}">
                                    ${this.formatPrice(result.profitWithReturns)}
                                </td>
                                <td class="${result.profitPercentWithReturns >= 0 ? 'profit-positive' : 'profit-negative'}">
                                    ${result.profitPercentWithReturns.toFixed(1)}%
                                </td>
                                <td>${result.focusCost}</td>
                                <td class="${result.profitPerFocus >= 0 ? 'profit-positive' : 'profit-negative'}">
                                    ${result.profitPerFocus.toFixed(1)}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        
        container.innerHTML = table;
    }
    
    updateMaterialRequirements() {
        const container = document.getElementById('materialRequirements');
        const resourceData = this.resourceData[this.currentResource];
        
        const requirements = Object.entries(resourceData.requirements).map(([tier, req]) => {
            const items = Object.entries(req).map(([item, count]) => ({
                item,
                count,
                name: this.getItemName(item)
            }));
            
            return { tier, items };
        });
        
        container.innerHTML = requirements.map(req => `
            <div class="material-card">
                <div class="flex items-center justify-between">
                    <div>
                        <span class="tier-badge tier-${req.tier.substring(1)}">${req.tier}</span>
                        <span class="ml-2 text-sm text-gray-300">Potrzebujesz:</span>
                    </div>
                </div>
                <div class="mt-2">
                    ${req.items.map(item => `
                        <div class="flex items-center text-sm">
                            <img src="${this.getItemImage(item.item)}" alt="${item.name}" class="item-image mr-2">
                            <span>${item.count}x ${item.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
    
    async updateBestCities() {
        const container = document.getElementById('bestCities');
        
        try {
            const server = this.apiServers[this.settings.server];
            const resourceItems = this.resourceData[this.currentResource].items;
            
            // Get all products for comparison
            const products = Object.values(resourceItems).map(item => item.product);
            const apiUrl = `${server}/api/v2/stats/prices/${products.join(',')}?locations=${this.cities.join(',')}&qualities=1`;
            
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('API request failed');
            
            const data = await response.json();
            
            // Process data for best cities
            const cityPrices = {};
            data.forEach(item => {
                if (!cityPrices[item.location]) {
                    cityPrices[item.location] = {};
                }
                cityPrices[item.location][item.item_id] = item.sell_price_min || 0;
            });
            
            // Find best cities for each tier
            const bestCities = [];
            Object.entries(resourceItems).forEach(([tier, items]) => {
                const tierCities = this.cities.map(city => ({
                    city,
                    price: cityPrices[city]?.[items.product] || 0
                })).sort((a, b) => b.price - a.price);
                
                bestCities.push({
                    tier,
                    cities: tierCities.slice(0, 3) // Top 3 cities
                });
            });
            
            container.innerHTML = bestCities.map(tier => `
                <div class="mb-4">
                    <h4 class="font-semibold mb-2">
                        <span class="tier-badge tier-${tier.tier.substring(1)}">${tier.tier}</span>
                    </h4>
                    ${tier.cities.map((city, index) => `
                        <div class="city-rank city-rank-${index + 1}">
                            <div class="city-rank-number">${index + 1}</div>
                            <div class="flex-1">
                                <div class="font-medium">${city.city}</div>
                                <div class="text-sm text-gray-400">${this.formatPrice(city.price)}</div>
                            </div>
                            ${index === 0 ? '<i class="bi bi-trophy text-yellow-400"></i>' : ''}
                        </div>
                    `).join('')}
                </div>
            `).join('');
            
        } catch (error) {
            console.error('Error updating best cities:', error);
            container.innerHTML = '<p class="text-gray-400 text-center">Nie udało się załadować danych o najlepszych miastach</p>';
        }
    }
    
    getItemImage(tier, isProduct = false) {
        const itemCode = isProduct ? 
            `${tier}_CLOTH_SET1` : 
            `${tier}_CLOTH`;
        return `https://render.albiononline.com/v1/item/${itemCode}.png`;
    }
    
    getItemName(itemCode) {
        // Simple item name mapping - could be expanded
        const nameMap = {
            'T2_CLOTH': 'Tkanina T2',
            'T3_CLOTH': 'Tkanina T3',
            'T4_CLOTH': 'Tkanina T4',
            'T5_CLOTH': 'Tkanina T5',
            'T6_CLOTH': 'Tkanina T6',
            'T7_CLOTH': 'Tkanina T7',
            'T8_CLOTH': 'Tkanina T8',
            'T2_METALBAR': 'Sztabka T2',
            'T3_METALBAR': 'Sztabka T3',
            'T4_METALBAR': 'Sztabka T4',
            'T5_METALBAR': 'Sztabka T5',
            'T6_METALBAR': 'Sztabka T6',
            'T7_METALBAR': 'Sztabka T7',
            'T8_METALBAR': 'Sztabka T8',
            'T2_LEATHER': 'Skóra T2',
            'T3_LEATHER': 'Skóra T3',
            'T4_LEATHER': 'Skóra T4',
            'T5_LEATHER': 'Skóra T5',
            'T6_LEATHER': 'Skóra T6',
            'T7_LEATHER': 'Skóra T7',
            'T8_LEATHER': 'Skóra T8',
            'T2_PLANKS': 'Deska T2',
            'T3_PLANKS': 'Deska T3',
            'T4_PLANKS': 'Deska T4',
            'T5_PLANKS': 'Deska T5',
            'T6_PLANKS': 'Deska T6',
            'T7_PLANKS': 'Deska T7',
            'T8_PLANKS': 'Deska T8',
            'T2_STONEBLOCK': 'Kamień T2',
            'T3_STONEBLOCK': 'Kamień T3',
            'T4_STONEBLOCK': 'Kamień T4',
            'T5_STONEBLOCK': 'Kamień T5',
            'T6_STONEBLOCK': 'Kamień T6',
            'T7_STONEBLOCK': 'Kamień T7',
            'T8_STONEBLOCK': 'Kamień T8'
        };
        return nameMap[itemCode] || itemCode;
    }
    
    formatPrice(price) {
        if (price === 0) return 'Brak danych';
        return new Intl.NumberFormat('pl-PL').format(Math.round(price));
    }
    
    showLoading(show) {
        const modal = document.getElementById('loadingModal');
        modal.classList.toggle('hidden', !show);
    }
    
    showError(message) {
        const container = document.getElementById('resultsContainer');
        container.innerHTML = `
            <div class="bg-red-900 bg-opacity-50 border border-red-700 rounded-lg p-4">
                <div class="flex items-center">
                    <i class="bi bi-exclamation-triangle text-red-400 mr-2"></i>
                    <span class="text-red-200">${message}</span>
                </div>
            </div>
        `;
    }
    
    updateLastUpdateTime() {
        const element = document.getElementById('lastUpdate');
        if (this.lastUpdateTime) {
            const date = new Date(this.lastUpdateTime);
            element.textContent = date.toLocaleString('pl-PL');
        } else {
            element.textContent = 'Nigdy';
        }
    }
    
    // Settings management
    loadSettings() {
        const stored = localStorage.getItem('albionRefiningSettings');
        const defaults = {
            server: 'europe',
            marketTax: '6.5',
            returnRate: '15.2',
            usageFee: '0',
            dailyBonus: '0',
            masteryT4: '0',
            masteryT5: '0',
            masteryT6: '0',
            masteryT7: '0',
            masteryT8: '0'
        };
        
        return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
    }
    
    saveSettings() {
        this.settings = {
            server: document.getElementById('serverSelect').value,
            marketTax: document.getElementById('marketTax').value,
            returnRate: document.getElementById('returnRate').value,
            usageFee: document.getElementById('usageFee').value,
            dailyBonus: document.getElementById('dailyBonus').value,
            masteryT4: document.getElementById('masteryT4').value,
            masteryT5: document.getElementById('masteryT5').value,
            masteryT6: document.getElementById('masteryT6').value,
            masteryT7: document.getElementById('masteryT7').value,
            masteryT8: document.getElementById('masteryT8').value
        };
        
        localStorage.setItem('albionRefiningSettings', JSON.stringify(this.settings));
    }
    
    applySettings() {
        document.getElementById('serverSelect').value = this.settings.server;
        document.getElementById('marketTax').value = this.settings.marketTax;
        document.getElementById('returnRate').value = this.settings.returnRate;
        document.getElementById('usageFee').value = this.settings.usageFee;
        document.getElementById('dailyBonus').value = this.settings.dailyBonus;
        document.getElementById('masteryT4').value = this.settings.masteryT4;
        document.getElementById('masteryT5').value = this.settings.masteryT5;
        document.getElementById('masteryT6').value = this.settings.masteryT6;
        document.getElementById('masteryT7').value = this.settings.masteryT7;
        document.getElementById('masteryT8').value = this.settings.masteryT8;
    }
    
    // Price management
    savePrices() {
        localStorage.setItem('albionRefiningPrices', JSON.stringify(this.prices));
        this.lastUpdateTime = new Date().toISOString();
        localStorage.setItem('albionRefiningLastUpdate', this.lastUpdateTime);
    }
    
    loadStoredPrices() {
        const stored = localStorage.getItem('albionRefiningPrices');
        if (stored) {
            this.prices = JSON.parse(stored);
        }
        
        const lastUpdate = localStorage.getItem('albionRefiningLastUpdate');
        if (lastUpdate) {
            this.lastUpdateTime = lastUpdate;
        }
    }
}

// Initialize the calculator
let calculator;
document.addEventListener('DOMContentLoaded', () => {
    calculator = new AlbionRefiningCalculator();
});