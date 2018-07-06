import React from "react";
import PropTypes from "prop-types";
import {
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";
import styles from "./styles.scss";
import { Section } from "../section/";

const Group = ({ group, onSubSectionClick }) => {
  return (
    <AccordionItem
      key={group.key}
      expanded={group.expanded}
      className={styles.group}
    >
      <AccordionItemTitle className={styles["group-title"]}>
        <div className={styles["group-title-indicator"]}>
          <div>
            <span>{group.label}</span>
            {group.complete && <div className={styles["group-checkmark"]} />}
          </div>
          <div className={styles["accordion__arrow"]} role="presentation" />
        </div>
      </AccordionItemTitle>
      <AccordionItemBody>
        {group.sections.map(s => (
          <Section key={s.key} section={s} onItemClick={onSubSectionClick} />
        ))}
      </AccordionItemBody>
    </AccordionItem>
  );
};

Group.propTypes = {};

export default Group;
