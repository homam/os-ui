import * as React from "react";
import * as styles from "./MSISDNInput.less";
const imgTick = require("../assets/img/tick.svg");

type MSISDNInputClassNames = {
  inputWrapper?: string;
  flag?: string;
  OK?: string;
  NOK?: string;
  feedback?: string;
  numberEntryInput?: string;
};

const merge = (a, b) => `${b} ${a}`;

const MSISDNInput = ({
  disabled,
  isValid,
  maxLength,
  msisdn,
  onChange,
  classNames = {}
}: {
  disabled?: boolean;
  isValid: boolean;
  maxLength: number;
  msisdn: string;
  onChange: (msisdn: string) => void;
  classNames?: MSISDNInputClassNames;
}) => (
  <div
    className={merge(styles.inputWrapper, classNames.inputWrapper)}
    data-x="inputWrapper"
  >
    <span className={merge(styles.flag, classNames.flag)} />
    <span
      className={[
        merge(styles.feedback, classNames.feedback),
        isValid
          ? merge(styles.OK, classNames.OK)
          : merge(styles.NOK, classNames.NOK)
      ].join(" ")}
    >
      <img src={imgTick} />
    </span>
    <input
      type="tel"
      disabled={true === disabled}
      className={merge(styles.numberEntryInput, classNames.numberEntryInput)}
      maxLength={maxLength}
      value={msisdn}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

export default MSISDNInput;
