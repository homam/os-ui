import * as React from "react";
import {
  FormattedMessage,
  FormattedNumber,
  FormattedRelative
} from "react-intl";

export default ({
  msisdn,
  maxLength
}: {
  msisdn: Number;
  maxLength: Number;
}) => (
  <div>
    <FormattedMessage
      id="msisdn.number_is_invalid"
      defaultMessage={`
                        It seems {msisdn, number} is invalid
                    `}
      values={{
        msisdn: msisdn
      }}
    />
    <input />
  </div>
);
