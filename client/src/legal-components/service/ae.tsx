import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

export const ServiceComponent = ({
  className,
  intl
}: { className: string } & InjectedIntlProps) => (
  <div className={`${className || ""}`}>
   Mobifun
  </div>
);

export const Services = injectIntl(ServiceComponent);
