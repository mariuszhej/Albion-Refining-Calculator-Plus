// Albion Online Refining Calculator - Main JavaScript v0.0.2

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
                t2Icon: 'T2_CLOTH',
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
                t2Icon: 'T2_METALBAR',
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
                t2Icon: 'T2_LEATHER',
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
                t2Icon: 'T2_PLANKS',
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
                t2Icon: 'T2_STONEBLOCK',
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
        this.calculateProfits(); // Calculate on init to show any existing prices
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
        
        // Return rate custom handling
        document.getElementById('returnRate').addEventListener('change', () => {
            const customInput = document.getElementById('customReturnRate');
            if (this.returnRate.value === 'custom') {
                customInput.classList.remove('hidden');
            } else {
                customInput.classList.add('hidden');
            }
        });
        
        // Price type changes
        document.getElementById('priceType').addEventListener('change', () => {
            const timeSection = document.getElementById('timePeriodSection');
            if (this.priceType.value === 'average') {
                timeSection.classList.remove('hidden');
            } else {
                timeSection.classList.add('hidden');
            }
        });
        
        // Server sync between settings and price update
        document.getElementById('serverSelect').addEventListener('change', () => {
            document.getElementById('priceServerSelect').value = this.serverSelect.value;
        });
        
        document.getElementById('priceServerSelect').addEventListener('change', () => {
            document.getElementById('serverSelect').value = this.priceServerSelect.value;
            this.saveSettings();
        });
        
        // Auto-update prices when cities change
        ['resourceCity', 'productCity', 'priceServerSelect', 'priceType', 'timePeriod', 'itemQuality'].forEach(id => {
            document.getElementById(id).addEventListener('change', () => {
                if (this.prices && Object.keys(this.prices).length > 0) {
                    this.calculateProfits();
                }
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
        this.updateResourceImages();
    }
    
    updateResourceImages() {
        // Update resource button icons
        document.querySelectorAll('.resource-btn').forEach(btn => {
            const resource = btn.dataset.resource;
            const img = btn.querySelector('img');
            if (img && this.resourceData[resource]) {
                img.src = this.getItemImage(this.resourceData[resource].t2Icon);
            }
        });
    }
    
    async updateAllPrices() {
        this.showLoading(true);
        
        try {
            const server = this.apiServers[document.getElementById('priceServerSelect').value];
            const resourceCity = document.getElementById('resourceCity').value;
            const productCity = document.getElementById('productCity').value;
            const priceType = document.getElementById('priceType').value;
            const quality = document.getElementById('itemQuality').value;
            
            // Get all items for current resource
            const resourceItems = this.resourceData[this.currentResource].items;
            const allItems = [];
            
            Object.values(resourceItems).forEach(item => {
                allItems.push(item.resource);
                allItems.push(item.product);
            });
            
            let apiUrl;
            if (priceType === 'current') {
                apiUrl = `${server}/api/v2/stats/prices/${allItems.join(',')}?locations=${resourceCity},${productCity}&qualities=${quality}`;
            } else {
                const timeHours = document.getElementById('timePeriod').value;
                const endDate = new Date().toISOString();
                const startDate = new Date(Date.now() - (timeHours * 60 * 60 * 1000)).toISOString();
                apiUrl = `${server}/api/v2/stats/history/${allItems.join(',')}?locations=${resourceCity},${productCity}&qualities=${quality}&time-scale=${timeHours}`;
            }
            
            const response = await fetch(apiUrl);
            
            if (!response.ok) throw new Error('API request failed');
            
            const data = await response.json();
            
            // Process price data
            if (priceType === 'current') {
                data.forEach(item => {
                    const key = `${item.item_id}_${item.location}`;
                    this.prices[key] = {
                        sell_price_min: item.sell_price_min || 0,
                        sell_price_min_date: item.sell_price_min_date,
                        buy_price_max: item.buy_price_max || 0,
                        buy_price_max_date: item.buy_price_max_date
                    };
                });
            } else {
                // For average prices, calculate average from historical data
                const averagedData = {};
                data.forEach(item => {
                    const key = `${item.item_id}_${item.location}`;
                    if (!averagedData[key]) {
                        averagedData[key] = [];
                    }
                    if (item.sell_price_min !== null) {
                        averagedData[key].push(item.sell_price_min);
                    }
                });
                
                Object.keys(averagedData).forEach(key => {
                    const prices = averagedData[key];
                    const avgPrice = prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
                    this.prices[key] = {
                        sell_price_min: Math.round(avgPrice),
                        sell_price_min_date: new Date().toISOString(),
                        buy_price_max: 0,
                        buy_price_max_date: new Date().toISOString()
                    };
                });
            }
            
            this.savePrices();
            this.updateLastUpdateTime();
            this.calculateProfits();
            
        } catch (error) {
            console.error('Error updating prices:', error);
            this.showError(`Nie udało się zaktualizować cen: ${error.message}`);
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
            const returnRate = this.getReturnRate();
            const dailyBonus = parseFloat(this.settings.dailyBonus || document.getElementById('dailyBonus').value) / 100;
            const usageFee = parseFloat(this.settings.usageFee || document.getElementById('usageFee').value);
            const marketTax = parseFloat(this.settings.marketTax || document.getElementById('marketTax').value) / 100;
            const amount = parseFloat(document.getElementById('refiningAmount')?.value || 1);
            
            // Calculate profit
            const resourceCost = resourcePrice * 2 * amount;
            const totalCost = resourceCost + usageFee;
            const totalRevenue = productPrice * amount * (1 + dailyBonus) * (1 - marketTax);
            const profit = totalRevenue - totalCost;
            
            // Calculate with return rate
            const expectedReturns = resourcePrice * 2 * amount * returnRate * (1 + mastery);
            const profitWithReturns = profit + expectedReturns;
            
            // Calculate focus cost
            const focusCost = tierNum * 100 * amount;
            const profitPerFocus = profitWithReturns > 0 ? profitWithReturns / focusCost : 0;
            
            // Calculate profit percentages
            const profitPercent = totalCost > 0 ? (profit / totalCost) * 100 : 0;
            const profitPercentWithReturns = totalCost > 0 ? (profitWithReturns / totalCost) * 100 : 0;
            
            results.push({
                tier,
                resourcePrice,
                productPrice,
                amount,
                profit,
                profitWithReturns,
                profitPercent,
                profitPercentWithReturns,
                focusCost,
                profitPerFocus,
                resourceCost,
                usageFee,
                marketTax: totalRevenue * marketTax,
                resourceAmount: 2 * amount,
                productAmount: amount
            });
        }
        
        this.displayResults(results);
        this.updateMaterialRequirements();
        this.updateBestCities();
    }
    
    getReturnRate() {
        const select = document.getElementById('returnRate');
        if (select.value === 'custom') {
            return parseFloat(document.getElementById('customReturnRate').value) / 100;
        }
        return parseFloat(select.value) / 100;
    }
    
    getMasteryBonus(tier) {
        if (tier < 4) return 0;
        const masteryKey = `masteryT${tier}`;
        const masteryLevel = parseFloat(document.getElementById(masteryKey)?.value || 0);
        return masteryLevel / 100;
    }
    
    displayResults(results) {
        const container = document.getElementById('resultsContainer');
        const hideFocus = document.getElementById('hideFocusColumns')?.checked;
        const showDetails = document.getElementById('showDetailColumns')?.checked;
        const hideUnused = document.getElementById('hideUnusedRows')?.checked;
        
        if (results.length === 0) {
            container.innerHTML = `
                <div class="text-center py-8 text-gray-400">
                    <i class="bi bi-exclamation-triangle text-4xl mb-2"></i>
                    <p>Brak danych cen dla wybranych miast. Zaktualizuj ceny.</p>
                </div>
            `;
            return;
        }
        
        // Filter unused rows if option is selected
        const filteredResults = hideUnused ? results.filter(r => r.profitWithReturns > 0) : results;
        
        let tableHeader = `
            <thead>
                <tr>
                    <th>Poziom</th>
                    <th>Surowiec</th>
                    <th>Cena surowca</th>
                    <th>Produkt</th>
                    <th>Cena produktu</th>
                    <th>Zysk</th>
                    <th>Zysk %</th>
        `;
        
        if (!hideFocus) {
            tableHeader += `
                    <th>Koszt focus</th>
                    <th>Zysk/focus</th>
            `;
        }
        
        if (showDetails) {
            tableHeader += `
                    <th>Koszt surowca</th>
                    <th>Opłata stacji</th>
                    <th>Podatek rynku</th>
                    <th>Ilość</th>
            `;
        }
        
        tableHeader += `</tr></thead>`;
        
        const tableBody = filteredResults.map(result => `
            <tr>
                <td><span class="tier-badge tier-${result.tier.substring(1)}">${result.tier}</span></td>
                <td>
                    <img src="${this.getItemImage(result.tier)}" alt="Resource" class="item-image">
                    ${this.formatPrice(result.resourcePrice)}
                </td>
                <td>${this.formatPrice(result.resourceCost)}</td>
                <td>
                    <img src="${this.getItemImage(result.tier, true)}" alt="Product" class="item-image">
                    ${this.formatPrice(result.productPrice)}
                </td>
                <td>${this.formatPrice(result.productPrice * result.productAmount * (1 + parseFloat(document.getElementById('dailyBonus').value) / 100))}</td>
                <td class="${result.profitWithReturns >= 0 ? 'profit-positive' : 'profit-negative'}">
                    ${this.formatPrice(result.profitWithReturns)}
                </td>
                <td class="${result.profitPercentWithReturns >= 0 ? 'profit-positive' : 'profit-negative'}">
                    ${result.profitPercentWithReturns.toFixed(1)}%
                </td>
        `;
        
        if (!hideFocus) {
            tableBody += `
                <td>${result.focusCost}</td>
                <td class="${result.profitPerFocus >= 0 ? 'profit-positive' : 'profit-negative'}">
                    ${result.profitPerFocus.toFixed(1)}
                </td>
            `;
        }
        
        if (showDetails) {
            tableBody += `
                <td>${this.formatPrice(result.resourceCost)}</td>
                <td>${this.formatPrice(result.usageFee)}</td>
                <td>${this.formatPrice(result.marketTax)}</td>
                <td>${result.productAmount}</td>
            `;
        }
        
        tableBody += `</tr>`;
        
        const table = `
            <div class="overflow-x-auto">
                <table class="results-table">
                    ${tableHeader}
                    <tbody>
                        ${tableBody.join('')}
                    </tbody>
                </table>
            </div>
        `;
        
        container.innerHTML = table;
    }
    
    updateMaterialRequirements() {
        const container = document.getElementById('materialRequirements');
        const resourceData = this.resourceData[this.currentResource];
        const amount = parseFloat(document.getElementById('refiningAmount')?.value || 1);
        
        const requirements = Object.entries(resourceData.requirements).map(([tier, req]) => {
            const items = Object.entries(req).map(([item, count]) => ({
                item,
                count: count * amount,
                name: this.getItemName(item)
            }));
            
            return { tier, items };
        });
        
        container.innerHTML = requirements.map(req => `
            <div class="material-card">
                <div class="flex items-center justify-between">
                    <div>
                        <span class="tier-badge tier-${req.tier.substring(1)}">${req.tier}</span>
                        <span class="ml-2 text-sm text-gray-300">Potrzebujesz na ${amount} sztuk:</span>
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
            const server = this.apiServers[document.getElementById('priceServerSelect').value];
            const resourceItems = this.resourceData[this.currentResource].items;
            const quality = document.getElementById('itemQuality').value;
            
            // Get all products for comparison
            const products = Object.values(resourceItems).map(item => item.product);
            const apiUrl = `${server}/api/v2/stats/prices/${products.join(',')}?locations=${this.cities.join(',')}&qualities=${quality}`;
            
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
                })).filter(c => c.price > 0).sort((a, b) => b.price - a.price);
                
                if (tierCities.length > 0) {
                    bestCities.push({
                        tier,
                        cities: tierCities.slice(0, 3) // Top 3 cities
                    });
                }
            });
            
            if (bestCities.length === 0) {
                container.innerHTML = '<p class="text-gray-400 text-center">Brak danych o najlepszych miastach</p>';
                return;
            }
            
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
    
    getItemImage(itemCode, isProduct = false) {
        if (isProduct) {
            // Convert resource to product
            if (itemCode.includes('_CLOTH')) return `https://render.albiononline.com/v1/item/${itemCode}_SET1.png`;
            if (itemCode.includes('_METALBAR')) return `https://render.albiononline.com/v1/item/${itemCode}_SET1.png`;
            if (itemCode.includes('_LEATHER')) return `https://render.albiononline.com/v1/item/${itemCode}_SET1.png`;
            if (itemCode.includes('_PLANKS')) return `https://render.albiononline.com/v1/item/${itemCode}_SET1.png`;
            if (itemCode.includes('_STONEBLOCK')) return `https://render.albiononline.com/v1/item/${itemCode}_SET1.png`;
        }
        return `https://render.albiononline.com/v1/item/${itemCode}.png`;
    }
    
    getItemName(itemCode) {
        const nameMap = {
            'T2_CLOTH': 'Tkanina T2', 'T3_CLOTH': 'Tkanina T3', 'T4_CLOTH': 'Tkanina T4',
            'T5_CLOTH': 'Tkanina T5', 'T6_CLOTH': 'Tkanina T6', 'T7_CLOTH': 'Tkanina T7', 'T8_CLOTH': 'Tkanina T8',
            'T2_METALBAR': 'Sztabka T2', 'T3_METALBAR': 'Sztabka T3', 'T4_METALBAR': 'Sztabka T4',
            'T5_METALBAR': 'Sztabka T5', 'T6_METALBAR': 'Sztabka T6', 'T7_METALBAR': 'Sztabka T7', 'T8_METALBAR': 'Sztabka T8',
            'T2_LEATHER': 'Skóra T2', 'T3_LEATHER': 'Skóra T3', 'T4_LEATHER': 'Skóra T4',
            'T5_LEATHER': 'Skóra T5', 'T6_LEATHER': 'Skóra T6', 'T7_LEATHER': 'Skóra T7', 'T8_LEATHER': 'Skóra T8',
            'T2_PLANKS': 'Deska T2', 'T3_PLANKS': 'Deska T3', 'T4_PLANKS': 'Deska T4',
            'T5_PLANKS': 'Deska T5', 'T6_PLANKS': 'Deska T6', 'T7_PLANKS': 'Deska T7', 'T8_PLANKS': 'Deska T8',
            'T2_STONEBLOCK': 'Kamień T2', 'T3_STONEBLOCK': 'Kamień T3', 'T4_STONEBLOCK': 'Kamień T4',
            'T5_STONEBLOCK': 'Kamień T5', 'T6_STONEBLOCK': 'Kamień T6', 'T7_STONEBLOCK': 'Kamień T7', 'T8_STONEBLOCK': 'Kamień T8'
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
            refiningAmount: '1',
            masteryT4: '0',
            masteryT5: '0',
            masteryT6: '0',
            masteryT7: '0',
            masteryT8: '0',
            hideFocusColumns: false,
            showDetailColumns: false,
            hideUnusedRows: false,
            stackProfits: false
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
            refiningAmount: document.getElementById('refiningAmount').value,
            masteryT4: document.getElementById('masteryT4').value,
            masteryT5: document.getElementById('masteryT5').value,
            masteryT6: document.getElementById('masteryT6').value,
            masteryT7: document.getElementById('masteryT7').value,
            masteryT8: document.getElementById('masteryT8').value,
            hideFocusColumns: document.getElementById('hideFocusColumns')?.checked || false,
            showDetailColumns: document.getElementById('showDetailColumns')?.checked || false,
            hideUnusedRows: document.getElementById('hideUnusedRows')?.checked || false,
            stackProfits: document.getElementById('stackProfits')?.checked || false
        };
        
        localStorage.setItem('albionRefiningSettings', JSON.stringify(this.settings));
    }
    
    applySettings() {
        const elements = [
            'serverSelect', 'marketTax', 'returnRate', 'usageFee', 'dailyBonus',
            'masteryT4', 'masteryT5', 'masteryT6', 'masteryT7', 'masteryT8'
        ];
        
        elements.forEach(id => {
            const element = document.getElementById(id);
            if (element && this.settings[id]) {
                element.value = this.settings[id];
            }
        });
        
        // Apply checkbox settings
        ['hideFocusColumns', 'showDetailColumns', 'hideUnusedRows', 'stackProfits'].forEach(id => {
            const element = document.getElementById(id);
            if (element && this.settings[id] !== undefined) {
                element.checked = this.settings[id];
            }
        });
        
        // Apply refining amount
        const amountElement = document.getElementById('refiningAmount');
        if (amountElement && this.settings.refiningAmount) {
            amountElement.value = this.settings.refiningAmount;
        }
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

// Initialize calculator
let calculator;
document.addEventListener('DOMContentLoaded', () => {
    calculator = new AlbionRefiningCalculator();
});