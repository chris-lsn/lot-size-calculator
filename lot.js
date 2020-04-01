const app = new Vue({
    el: '#app',
    data: {
        take_profit: 210,
        type: 'buy',
        lots: [1, 1.4, 1, 1.4],
        swap: 10,
        entry_price: 0
    },
    computed: {
        middle_distance() {
            return this.take_profit / 3;
        },
    },
    methods: {
        formatFloat(num, pos) {
            var size = Math.pow(10, pos);
            return Math.ceil(num * size) / size;
        },
        calculate() {
            this.lots = [1, 1.4, 1, 1.4];
            for (let count = 0; count < 20; count++) {
                // Assume it is a Buy order
                // Calculate lose
                let profit = 0;
                let cal_string = '';
                if (this.lots.length % 2 == 0) {
                    cal_string += 'Buy order: ';
                    for (let i = 0; i < this.lots.length; i++) {
                        if (i % 2 == 0) {
                            profit += this.lots[i] * this.take_profit - this.lots[i] * this.swap;
                            cal_string += '+' + (this.lots[i] * this.take_profit - this.lots[i] * this.swap);
                        } else {
                            profit -= this.lots[i] * (this.take_profit + this.middle_distance);
                            cal_string += '-' + this.lots[i] * (this.take_profit + this.middle_distance);
                        }
                    }
                    cal_string += '= $' + profit;
                } else {
                    cal_string += 'Sell order: ';
                    for (let i = 0; i < this.lots.length; i++) {
                        if (i % 2 != 0) {
                            profit += this.lots[i] * this.take_profit - this.lots[i] * this.swap;
                            cal_string += '+' + (this.lots[i] * this.take_profit - this.lots[i] * this.swap);
                        } else {
                            profit -= this.lots[i] * (this.take_profit + this.middle_distance);
                            cal_string += '-' + this.lots[i] * (this.take_profit + this.middle_distance);
                        }
                    }
                    cal_string += ' = $' + profit;
                }

                if (profit < 0) {
                    const lot = this.formatFloat(Math.abs(profit) / (this.take_profit - this.swap), 1);
                    this.lots.push(lot)
                    cal_string += ', Lot = ' + lot + ', Win: $' + (lot * this.take_profit + profit - lot * this.swap)
                }
                console.log(cal_string)
            }
        }
    },
    created() {
        this.calculate();
    }
})