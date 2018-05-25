import React from "react";
import choiceData from "./choices-data";
import styles from "./portfolio.scss";
import GradientBar from "../../common/gradient-bar";

const Choice = ({ choiceIndex }) => {
  const choice = choiceData[choiceIndex];

  if (!choice) return <div />;

  return (
    <div>
      <h2>
        Recommended Portfolio: <span>{choice.portfolio}</span>
      </h2>

      <h4>Portfolio investments</h4>
      <div className={styles.percentages}>
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>

      {Object.keys(choice.bars).map((k, i) => {
        return (
          <GradientBar
            key={`${choice.bars[k].heading}${i + 1}`}
            heading={k}
            innerText={choice.bars[k].value}
            gradient={choice.bars[k].gradient}
          />
        );
      })}

      <h4>Illustrative range of historic returns</h4>
      <img src={`images/${choice.svg}.svg`} alt={choice.svg} />

      <h4>{choice.heading}</h4>
      <h4>{choice.description}</h4>

      {choice.paragraphs.map((p, i) => {
        return <p key={`p${i}`}> {p}</p>;
      })}

      <div className={styles.footer}>
        <p>
          These descriptions apply to the Portfolio and its contents. When
          describing the asset allocation ranges, this relates to the underlying
          holdings and, in the case of some multi-asset pooled vehicles, would
          include the underlying breakdown of the holdings within these
          vehicles.
        </p>
        <p>
          {" "}
          The above illustration of the range of historic returns uses a
          constant equity weighting of 30% and a cash weighting of 70%, based on
          30-year historical data.
        </p>
        <p> Source: Datastream. Indices: MSCI UK & UK Treasury Bill 3 month.</p>
        <p className={styles.bolder}> Past performance is not a guide to future performance.</p>
        <span>
          Details of the underlying assumptions are available on request.
        </span>
      </div>
    </div>
  );
};

export default Choice;
