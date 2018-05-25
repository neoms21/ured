const choices = {
  "1": {
    portfolio: "Balanced",
    heading: "Cash and Cash Equivalents portfolio objective",
    description:
      "Security of capital with income reflecting the interest rate environment.",
    paragraphs: [
      "For clients who wish to preserve the value of their cash with very limited risk to the capital value. Deposits will be with Schroder & Co. Limited or with third party banks and building societies*.",

      "Investments will only be made in cash and cash equivalent assets, such as liquidity funds, and government - issued or government backed bonds.",

      "While there is very limited market risk associated with the above investments, in the longer term it is likely that the real value of the Portfolio will be eroded over time by inflation."
    ],
    svg: "cash",
    bars: {
      Cash: {
        gradient: "left, rgba(45,85,178,1) 0%, rgba(255,255,255,1) 100%",
        value: "0% - 100%"
      },
      "Fixed Income": {
        gradient: "left, rgba(45,85,178,1) 0%, rgba(255,255,255,1) 50%",
        value: "0% - 50%"
      },
      Equities: {
        gradient: undefined,
        value: "0%"
      },
      "Alternative investments": {
        gradient: undefined,
        value: "0%"
      }
    }
  },
  "2": {
    portfolio: "Cautious",
    heading: "Cautious portfolio objective",
    description:
      "Limited capital growth and income with a combined return in excess of cash and short dated government bonds.",
    paragraphs: [
      "For clients who wish to preserve capital and to outperform cash and short-term government bonds while only subject to a limited amount of equity-type risk.",

      "The Portfolio may contain a small proportion of higher risk investments such as equities and some exposure to non-base currency markets. Cash, fixed income investments and other lower volatility investments are likely to form a significant part of the Portfolio. Less liquid assets are considered part of the investable universe but they will be kept to a minimum.",

      "The risk of capital loss may be limited in the longer term but there is a risk that the real value of the Portfolio will be eroded over time by inflation."
    ],
    svg: "cautious",
    bars: {
      Cash: {
        gradient: "left, rgba(45,85,178,1) 0%, rgba(255,255,255,1) 30%",
        value: "0% - 30%"
      },
      "Fixed Income": {
        gradient:
          "left, rgba(45,85,178,1) 0%, rgba(45,85,178,1) 30%, rgba(255,255,255,1) 60%, rgba(255,255,255,1) 100%",
        value: "30% - 60%"
      },
      Equities: {
        gradient: "left, rgba(45,85,178,1) 0%, rgba(255,255,255,1) 40%",
        value: "0% - 40%"
      },
      "Alternative investments": {
        gradient: "left, rgba(45,85,178,1) 0%, rgba(255,255,255,1) 40%",
        value: "0% - 40%"
      }
    }
  },
  "3": {
    portfolio: "Balanced",
    heading: "Balanced portfolio objective",
    description:
      "Modest capital growth and income with a combined return modestly above inflation in the longer term.",
    paragraphs: [
      "For clients who wish to achieve investment returns in excess of cash and government bonds, can tolerate moderate equity-like investment risk and accept there is a risk of capital loss as capital markets fluctuate.",

      "The Portfolio will use a broad range of assets on both a long term and an opportunistic basis in order to pursue its objective including an allocation to equity, or equity - like investments and non - base currency investments.",

      "There is always likely to be a material allocation to cash, bonds and other defensive assets.Whilst the majority of the Portfolio is invested in readily tradable assets, less liquid assets are considered part of the investable universe.",
      "The aim of the Portfolio is that, in the longer term, the value of the assets should be protected against the impact of inflation."
    ],
    svg: "balanced",
    bars: {
      Cash: {
        gradient: "left, rgba(45,85,178,1) 0%, rgba(255,255,255,1) 20%",
        value: "0% - 20%"
      },
      "Fixed Income": {
        gradient:
          "left, rgba(45,85,178,1) 0%, rgba(45,85,178,1) 20%, rgba(255,255,255,1) 50%",
        value: "20% - 50%"
      },
      Equities: {
        gradient:
          "left, rgba(45,85,178,1) 0%, rgba(45,85,178,1) 25%, rgba(255,255,255,1) 60%",
        value: "25% - 60%"
      },
      "Alternative investments": {
        gradient: "left, rgba(45,85,178,1) 0%, rgba(255,255,255,1) 35%",
        value: "0% - 35%"
      }
    }
  },
  "4": {
    portfolio: "Growth",
    heading: "Growth portfolio objective",
    description:
      "Capital growth and income with a combined return in excess of inflation in the longer term.",
    paragraphs: [
      "For clients who wish to maximise long term investment returns, can tolerate a level of risk approaching that of global equity markets. There is a risk of capital loss as capital markets fluctuate.",

      "The Portfolio will use a broad range of investments on both a long term and an opportunistic basis and may allocate a high proportion of its assets to equity, or equity - like investments including non - base currencies in pursuing its aims.",

      "Whilst the majority of the Portfolio is invested in readily tradable assets, illiquid assets are considered part of the investable universe and the Portfolio may have some exposure.Cash, fixed income and other defensive assets will normally account for only a small part of the Portfolio.",

      "The aim of the Portfolio is, in the longer term, to grow the value of the assets in excess of inflation."
    ],
    svg: "growth",
    bars: {
      Cash: {
        gradient: "left, rgba(45,85,178,1) 0%, rgba(255,255,255,1) 20%",
        value: "0% - 20%"
      },
      "Fixed Income": {
        gradient: "left, rgba(45,85,178,1) 0%, rgba(255,255,255,1) 30%",
        value: "0% - 30%"
      },
      Equities: {
        gradient:
          "left, rgba(45,85,178,1) 0%, rgba(45,85,178,1) 50%, rgba(255,255,255,1) 80%",
        value: "50% - 80%"
      },
      "Alternative investments": {
        gradient: "left, rgba(45,85,178,1) 0%, rgba(255,255,255,1) 30%",
        value: "0% - 30%"
      }
    }
  },
  "5": {
    portfolio: "Agressive",
    heading: "Aggressive portfolio objective",
    description:
      "Capital growth and income with a combined return significantly in excess of inflation in the longer term.",
    paragraphs: [
      "For clients who wish to maximise investment returns, can tolerate risk similar to, and possibly greater than, global equities.",

      "The Portfolio uses a broad range of assets on both a long term and an opportunistic basis in order to pursue its objective, and may have exposure to non - base currencies.Holdings in fixed income, cash and other defensive assets are likely to be minimal.",

      "The Portfolio will be volatile and there might be significant risk of capital loss as capital markets fluctuate in order to achieve the longer term objective.Whilst the majority of the Portfolio will be invested in readily tradable holdings, illiquid investments are considered part of the investable universe and the Portfolio may have some exposure.",

      "The aim of the Portfolio is that, in the longer term, the value of the assets should grow significantly in excess of inflation."
    ],
    svg: "aggressive",
    bars: {
      Cash: {
        gradient: "left, rgba(45,85,178,1) 0%, rgba(255,255,255,1) 10%",
        value: "0% - 10%"
      },
      "Fixed Income": {
        gradient: "left, rgba(45,85,178,1) 0%, rgba(255,255,255,1) 40%",
        value: "0% - 40%"
      },
      Equities: {
        gradient:
          "left, rgba(45,85,178,1) 0%, rgba(45,85,178,1) 60%, rgba(255,255,255,1) 100%",
        value: "60% - 100%"
      },
      "Alternative investments": {
        gradient: "left, rgba(45,85,178,1) 0%, rgba(255,255,255,1) 40%",
        value: "0% - 40%"
      }
    }
  }
};

export default choices;
