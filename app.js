// Albion Online Refining Calculator - Main JavaScript v0.0.6
// Author: mariuszhej
// GitHub: https://github.com/mariuszhej/Albion-Refining-Calculator-Plus

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
        console.log('Initializing Albion Refining Calculator...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.afterDOMReady();
            });
        } else {
            this.afterDOMReady();
        }
    }
    
    afterDOMReady() {
        console.log('DOM ready, setting up calculator...');
        
        // Check critical elements first
        const resourceButtons = document.querySelectorAll('.resource-btn');
        console.log('Found resource buttons:', resourceButtons.length);
        
        resourceButtons.forEach((btn, index) => {
            console.log(`Button ${index}:`, btn);
            console.log(`Data resource: ${btn.dataset.resource}`);
        });
        
        this.setupEventListeners();
        this.applySettings();
        this.loadStoredPrices();
        this.updateLastUpdateTime();
        this.calculateProfits(); // Calculate on init to show any existing prices
        
        console.log('Calculator initialized successfully');
        console.log('Current resource:', this.currentResource);
        console.log('Available resource buttons:', resourceButtons.length);
        
        // Test button click programmatically
        this.testButtonFunctionality();
    }
    
    testButtonFunctionality() {
        console.log('Testing button functionality...');
        const firstBtn = document.querySelector('[data-resource="cloth"]');
        if (firstBtn) {
            console.log('Testing first button click...');
            setTimeout(() => {
                firstBtn.click();
            }, 1000);
        }
    }
    
    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Resource selection - Multiple approaches for maximum compatibility
        this.setupResourceListeners();
        
        // Options dropdown toggle
        this.setupOptionsDropdown();
        
        // Settings toggle
        const settingsToggle = document.getElementById('settingsToggle');
        if (settingsToggle) {
            settingsToggle.addEventListener('click', (e) => {
                e.preventDefault();
                const panel = document.getElementById('settingsPanel');
                if (panel) {
                    panel.classList.toggle('hidden');
                }
            });
        }
        
        // Update prices
        const updateBtn = document.getElementById('updateAllPrices');
        if (updateBtn) {
            updateBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Update button clicked');
                this.updateAllPrices();
            });
        }
        
        // Other listeners (existing logic)
        this.setupOtherListeners();
        
        console.log('Event listeners setup complete');
    }
    
    setupResourceListeners() {
        const resourceButtons = document.querySelectorAll('.resource-btn');
        console.log('Setting up listeners for', resourceButtons.length, 'resource buttons');
        
        // Method 1: Direct event listeners
        resourceButtons.forEach((btn, index) => {
            console.log(`Setting up listener for button ${index}:`, btn);
            
            // Try multiple event types for compatibility
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('CLICK - Resource button clicked:', btn.dataset.resource);
                this.selectResource(btn.dataset.resource);
            });
            
            btn.addEventListener('mousedown', (e) => {
                e.preventDefault();
                console.log('MOUSEDOWN - Resource button clicked:', btn.dataset.resource);
            });
            
            // Touch support
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                console.log('TOUCH - Resource button clicked:', btn.dataset.resource);
            });
            
            // Make sure button is clickable
            btn.style.cursor = 'pointer';
            btn.style.pointerEvents = 'auto';
        });
        
        // Method 2: Event delegation (backup)
        document.addEventListener('click', (e) => {
            const target = e.target.closest('.resource-btn');
            if (target) {
                e.preventDefault();
                console.log('DELEGATION - Resource button clicked:', target.dataset.resource);
                this.selectResource(target.dataset.resource);
            }
        });
        
        // Method 3: Direct inline onclick (last resort)
        resourceButtons.forEach((btn) => {
            btn.onclick = (e) => {
                e.preventDefault();
                console.log('INLINE - Resource button clicked:', btn.dataset.resource);
                this.selectResource(btn.dataset.resource);
                return false;
            };
        });
    }
    
    setupOptionsDropdown() {
        const optionsToggle = document.getElementById('optionsToggle');
        const optionsDropdown = document.getElementById('optionsDropdown');
        
        if (optionsToggle && optionsDropdown) {
            console.log('Setting up options dropdown');
            
            optionsToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                optionsDropdown.classList.toggle('hidden');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (optionsToggle && optionsDropdown && 
                    !optionsToggle.contains(e.target) && 
                    !optionsDropdown.contains(e.target)) {
                    optionsDropdown.classList.add('hidden');
                }
            });
            
            // Header checkbox listeners
            ['hideFocusColumnsHeader', 'showDetailColumnsHeader', 'hideUnusedRowsHeader', 'compactModeHeader', 'showTooltipsHeader'].forEach(id => {
                const checkbox = document.getElementById(id);
                if (checkbox) {
                    checkbox.addEventListener('change', () => {
                        const settingId = id.replace('Header', '');
                        const mainCheckbox = document.getElementById(settingId);
                        if (mainCheckbox) {
                            mainCheckbox.checked = checkbox.checked;
                            mainCheckbox.dispatchEvent(new Event('change'));
                        }
                    });
                }
            });
            
            // Reset settings button
            const resetBtn = document.getElementById('resetSettingsHeader');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    this.resetAllSettings();
                });
            }
        }
    }
    
    setupOtherListeners() {
        // Settings changes
        const settingsElements = document.querySelectorAll('#settingsPanel select, #settingsPanel input');
        settingsElements.forEach(input => {
            input.addEventListener('change', () => {
                this.saveSettings();
                this.calculateProfits();
            });
        });
        
        // Return rate custom handling
        const returnRateSelect = document.getElementById('returnRate');
        if (returnRateSelect) {
            returnRateSelect.addEventListener('change', () => {
                const customInput = document.getElementById('customReturnRate');
                if (customInput) {
                    if (returnRateSelect.value === 'custom') {
                        customInput.classList.remove('hidden');
                    } else {
                        customInput.classList.add('hidden');
                    }
                }
            });
        }
        
        // Price type changes
        const priceTypeSelect = document.getElementById('priceType');
        if (priceTypeSelect) {
            priceTypeSelect.addEventListener('change', () => {
                const timeSection = document.getElementById('timePeriodSection');
                if (timeSection) {
                    if (priceTypeSelect.value === 'average') {
                        timeSection.classList.remove('hidden');
                    } else {
                        timeSection.classList.add('hidden');
                    }
                }
            });
        }
        
        // Server sync between settings and price update
        const serverSelect = document.getElementById('serverSelect');
        const priceServerSelect = document.getElementById('priceServerSelect');
        
        if (serverSelect && priceServerSelect) {
            serverSelect.addEventListener('change', () => {
                priceServerSelect.value = serverSelect.value;
            });
            
            priceServerSelect.addEventListener('change', () => {
                serverSelect.value = priceServerSelect.value;
                this.saveSettings();
            });
        }
        
        // Auto-update prices when cities change
        ['resourceCity', 'productCity', 'priceServerSelect', 'priceType', 'timePeriod', 'itemQuality'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', () => {
                    if (this.prices && Object.keys(this.prices).length > 0) {
                        this.calculateProfits();
                    }
                });
            }
        });
    }
    
    resetAllSettings() {
        console.log('Resetting all settings...');
        localStorage.removeItem('albionRefiningSettings');
        localStorage.removeItem('albionRefiningPrices');
        localStorage.removeItem('albionRefiningLastUpdate');
        
        // Reset to defaults
        this.settings = this.loadSettings();
        this.prices = {};
        this.lastUpdateTime = null;
        
        // Re-apply settings
        this.applySettings();
        this.updateLastUpdateTime();
        this.calculateProfits();
        
        // Close dropdown
        document.getElementById('optionsDropdown').classList.add('hidden');
        
        // Show confirmation
        this.showNotification('Ustawienia zostały zresetowane');
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    selectResource(resource) {
        console.log('=== SELECTING RESOURCE ===');
        console.log('Resource parameter:', resource);
        console.log('Type of resource:', typeof resource);
        
        this.currentResource = resource;
        
        // Update UI with multiple attempts
        console.log('Updating UI...');
        
        // Method 1: Standard querySelector
        const targetBtn = document.querySelector(`[data-resource="${resource}"]`);
        console.log('Target button found:', !!targetBtn);
        
        if (targetBtn) {
            console.log('Target button details:', targetBtn);
            console.log('Target button data-resource:', targetBtn.dataset.resource);
        }
        
        // Remove active from all buttons
        const allButtons = document.querySelectorAll('.resource-btn');
        console.log('All buttons found:', allButtons.length);
        
        allButtons.forEach((btn, index) => {
            console.log(`Processing button ${index}:`, btn.dataset.resource);
            btn.classList.remove('active');
        });
        
        // Add active to target button
        if (targetBtn) {
            targetBtn.classList.add('active');
            console.log('SUCCESS: Resource button activated:', resource);
            
            // Force visual update
            targetBtn.style.backgroundColor = '#2563eb';
            setTimeout(() => {
                targetBtn.style.backgroundColor = '';
            }, 200);
        } else {
            console.error('ERROR: Resource button not found for resource:', resource);
            console.log('Available buttons:', Array.from(allButtons).map(b => b.dataset.resource));
        }
        
        this.calculateProfits();
        this.updateResourceImages();
        
        console.log('=== RESOURCE SELECTION COMPLETE ===');
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
        
        const tableBody = filteredResults.map(result => {
            let row = `
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
                row += `
                    <td>${result.focusCost}</td>
                    <td class="${result.profitPerFocus >= 0 ? 'profit-positive' : 'profit-negative'}">
                        ${result.profitPerFocus.toFixed(1)}
                    </td>
                `;
            }
            
            if (showDetails) {
                row += `
                    <td>${this.formatPrice(result.resourceCost)}</td>
                    <td>${this.formatPrice(result.usageFee)}</td>
                    <td>${this.formatPrice(result.marketTax)}</td>
                    <td>${result.productAmount}</td>
                `;
            }
            
            row += `</tr>`;
            return row;
        });
        
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
        // Use local WebP images for better performance
        const baseUrl = './images/resources/';
        
        if (isProduct) {
            // Convert resource to product
            if (itemCode.includes('_CLOTH')) return `${baseUrl}cloth/${itemCode.replace('_CLOTH', 'T4_CLOTH')}_SET1.webp`;
            if (itemCode.includes('_METALBAR')) return `${baseUrl}bar/${itemCode.replace('_METALBAR', 'T4_METALBAR')}_SET1.webp`;
            if (itemCode.includes('_LEATHER')) return `${baseUrl}leather/${itemCode.replace('_LEATHER', 'T4_LEATHER')}_SET1.webp`;
            if (itemCode.includes('_PLANKS')) return `${baseUrl}planks/${itemCode.replace('_PLANKS', 'T4_PLANKS')}_SET1.webp`;
            if (itemCode.includes('_STONEBLOCK')) return `${baseUrl}stoneblock/${itemCode.replace('_STONEBLOCK', 'T4_STONEBLOCK')}_SET1.webp`;
        }
        
        // For resources and buttons
        if (itemCode.includes('_CLOTH')) return `${baseUrl}cloth/T2_CLOTH.webp`;
        if (itemCode.includes('_METALBAR')) return `${baseUrl}bar/T2_METALBAR.webp`;
        if (itemCode.includes('_LEATHER')) return `${baseUrl}leather/T2_LEATHER.webp`;
        if (itemCode.includes('_PLANKS')) return `${baseUrl}planks/T2_PLANKS.webp`;
        if (itemCode.includes('_STONEBLOCK')) return `${baseUrl}stoneblock/T2_STONEBLOCK.webp`;
        
        // Fallback to render API
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

// Try to initialize immediately
try {
    calculator = new AlbionRefiningCalculator();
} catch (error) {
    console.error('Error initializing calculator:', error);
    // Fallback to DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
        try {
            calculator = new AlbionRefiningCalculator();
        } catch (fallbackError) {
            console.error('Fallback initialization failed:', fallbackError);
        }
    });
}