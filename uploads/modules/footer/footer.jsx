import React from "react";

import styles from "./footer.scss";

export default function Footer(props) {
  return (
    <div>
      <div className={`${styles["gx-help"]} `}>
        <div className={`${styles.help} container`}>
          <h4>Need help with your application?</h4>
          <div className={styles["help-cards"]}>
            <div className={styles["help-card"]}>
              <img
                className={styles["help-image"]}
                src="images/help-email.svg"
                alt="email"
              />
              <div className={styles["help-text"]}>Email</div>
            </div>
            <div className={styles["help-card"]}>
              <img
                className={styles["help-image"]}
                src="images/help-telephone.svg"
                alt="phone"
              />
              <div className={styles["help-text"]}>0207 658 1234</div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.team}`}>
        <div className={`${styles.members} container`}>
          <h4>Your Cazenove Capital team</h4>
          <div className={styles["team-members"]}>
            <div className={styles["team-member"]}>
              <div className={styles["m-card"]}>
                <img
                  className={styles["m-image"]}
                  src="images/team-peter.jpg"
                  alt="team"
                />
                <div className={styles["m-id"]}>
                  <div className={styles["m-name"]}>Peter Hillier</div>
                  <div className={styles["m-title"]}>Portfolio Manager</div>
                  <div className={styles["m-contact"]}>
                    12 Moorgate, London EC2R 6DA
                  </div>
                  <div className={styles["m-contact"]}>D +44 207 658 1234</div>
                  <div className={styles["m-contact"]}>M +44 7973 456 789</div>
                  <div className={styles["m-contact"]}>
                    <a href="#">peter.hillier@cazenovecapital.com</a>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["team-member"]}>
              <div className={styles["m-card"]}>
                <img
                  className={styles["m-image"]}
                  src="images/team-jennie.jpg"
                  alt="team"
                />
                <div className={styles["m-id"]}>
                  <div className={styles["m-name"]}>Jennie Smithson</div>
                  <div className={styles["m-title"]}>Relationship Manager</div>
                  <div className={styles["m-contact"]}>
                    12 Moorgate, London EC2R 6DA
                  </div>
                  <div className={styles["m-contact"]}>D +44 207 658 1234</div>
                  <div className={styles["m-contact"]}>M +44 7973 456 789</div>
                  <div className={styles["m-contact"]}>
                    <a href="#">jennie.smithson@cazenovecapital.com</a>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["team-member"]}>
              <div className={styles["m-card"]}>
                <img
                  className={styles["m-image"]}
                  src="images/team-mark.jpg"
                  alt="team"
                />
                <div className={styles["m-id"]}>
                  <div className={styles["m-name"]}>Mark Kent</div>
                  <div className={styles["m-title"]}>
                    Customer Service Executive
                  </div>
                  <div className={styles["m-contact"]}>
                    12 Moorgate, London EC2R 6DA
                  </div>
                  <div className={styles["m-contact"]}>D +44 207 658 1234</div>
                  <div className={styles["m-contact"]}>M +44 7973 456 789</div>
                  <div className={styles["m-contact"]}>
                    <a href="#">mark.kent@cazenovecapital.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles["gx-footer"]}`}>
        <div className={`${styles.footer} container`}>
          <p>
            The use of this site is subject to you having read and accepted our
            Important Information, which differ dependent on the website
            jurisdiction.
          </p>
          <p>
            Issued by Cazenove Capital which is part of the Schroders Group and
            a trading name of Schroder &amp; Co. Limited. Registered Office at
            31 Gresham Street, London EC2V 7QA. Registered number 2280926
            England. Authorised by the Prudential Regulation Authority and
            regulated by the Financial Conduct Authority and the Prudential
            Regulation Authority.
          </p>
          <p>
            Financial Services Compensation Scheme: Your eligible deposits with
            Schroder &amp; Co. Limited are protected up to a total of £85,000 by
            the Financial Services Compensation Scheme (“FSCS”), the UK’s
            deposit protection scheme. This limit is applied to the total of any
            deposits you have with the following: Cazenove Capital, Cazenove
            Capital Management, Schroders Wealth Management, Schroders Private
            Banking, Schroders Private Bank, Schroders Charities. Any total
            deposits you hold above the £85,000 limit across all brands are
            unlikely to be covered.
          </p>
          <div className={styles["footer-bar"]}>
            <a href="#">Risk warnings</a>
            <a href="#">Important information</a>
            <a href="#">Privacy statement</a>
            <a href="#">Cookies</a>
            <a href="#">Client security</a>
            <span className={styles.copyright}>
              &copy; Copyright 2018 Schroders plc
            </span>
          </div>
        </div>
      </div>
      <div className={`${styles["gx-disclaimer"]}`}>
        <div className={`${styles.disclaimer} container`}>
          The value of your investments and the income received from them can
          fall as well as rise. You may not get back the amount you invested.
        </div>
      </div>
    </div>
  );
}
