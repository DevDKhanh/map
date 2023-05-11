export const convertCoin = (coin: number | null) => {
	return coin ? coin.toLocaleString('vi-VN', {maximumFractionDigits: 4}) : 0;
};

export const convertCoinBet = (coin: number) => {
	if (coin >= 1000 && coin < 1000000) {
		return `${coin / 1000}K`;
	}
	if (coin >= 1000000 && coin < 1000000000) {
		return `${coin / 1000000}M`;
	}
	if (coin >= 1000000000) {
		return `${coin / 1000000000}B`;
	}

	return coin;
};
