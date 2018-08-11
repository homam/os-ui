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
  msisdn: String;
  maxLength: Number;
}) => (
  <div>
    <FormattedMessage
      id="msisdn.number_is_invalid"
      defaultMessage={`
                        It seems {msisdn} is invalid
                    `}
      values={{
        msisdn: <b>{msisdn}</b>
      }}
    />
    <input />
  </div>
);
