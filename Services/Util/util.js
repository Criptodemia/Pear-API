function funds (funds){
    let fundUSDT = 0;
    let fundBTC = 0;
    let idFundUSDT =0;
    let idFundBTC =0;
  if(funds !== 0)
    for (let fund of funds) {
        if (fund.Asset === "USDT") {fundUSDT = fund.Amount, idFundUSDT= fund.ID}
        else if (fund.Asset === "BTC") {fundBTC = fund.Amount, idFundBTC= fund.ID};
      }

      return {fundUSDT, fundBTC, idFundUSDT, idFundBTC};
}

function withdrawalsValiddation(withdrawals){
    let withdrawalsAmount= 0;
    if(withdrawals !== 0)
        for (let amount of withdrawals) {
          withdrawalsAmount= withdrawalsAmount + amount.Amount;
        }
    return withdrawalsAmount;
}

module.exports ={funds, withdrawalsValiddation}