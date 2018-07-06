import React from "react";

import PropTypes from "prop-types";

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";
import styles from "./styles.scss";
import Icon from "../../../components/font-awesome/Icon";
import SectionBody from "../section-body";

const Section = ({ section, onItemClick }) => {

  return (
    <Accordion key={section.key} className={styles.section}>
      <AccordionItem
        expanded={section.expanded}
        className={styles["section-item"]}
      >
        <AccordionItemTitle className={styles["section-title"]}>
          <div className={styles["title-indicator"]}>
            <Icon iconName="circle" classNames={styles.indicator} />
            {section.complete && <div className={styles.checkMark} />}

            <span>{section.label}</span>
            <div className={styles["section__arrow"]} role="presentation" />
          </div>
        </AccordionItemTitle>

        <AccordionItemBody>
          <SectionBody
            subSections={section.subsections}
            onItemClick={onItemClick}
          />
        </AccordionItemBody>
      </AccordionItem>
    </Accordion>
  );
};

Section.propTypes = {};

export default Section;
