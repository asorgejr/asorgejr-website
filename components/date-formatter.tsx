import React from "react";
import {DateTime} from "luxon";
// import { parseISO, format } from 'date-fns'



type Props = {
  isoDate: string
}

export default function DateFormatter({ isoDate }: Props) {
  const [localDate, setLocalDate] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    const dateTime = DateTime.fromISO(isoDate);
    setLocalDate(dateTime.isValid ? dateTime.toLocaleString() : null);
  }, [isoDate]);
  
  return localDate
    ? <time dateTime={isoDate}>{localDate}</time>
    : <></>;
}
