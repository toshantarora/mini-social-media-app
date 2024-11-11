import React from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";
type AlertNotificationProps = {
  errorMessage: string;
};
const AlertNotification = ({ errorMessage }: AlertNotificationProps) => {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="shrink-0">
          <XCircleIcon aria-hidden="true" className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{errorMessage}</h3>
        </div>
      </div>
    </div>
  );
};

export default AlertNotification;
